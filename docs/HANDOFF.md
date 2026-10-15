# Endix coverage system: full handoff

This document explains everything built for the Endix coverage report, so that a new Claude session (or a person) can maintain it, or use it as the blueprint for a new scraping/coverage tool.

> **To a new Claude session:** read this file first, then `README.md`, `collector/EndixCollector.gs`, `tools/build_data.py` and `tools/build_page.py`. Everything you need is in this repo, the Google Sheet and the scheduled task described below. Previous chat sessions are not available to you.

---

## 1. What it is

Endix (endix.live / endix-expo.com) is a virtual gaming expo held twice a year, distributed on Steam and the Epic Games Store. It has a Spring edition in May and a Winter (also called "Fall") edition in November. Danne (CRO) wanted a **public coverage report** for each edition, showing every piece of coverage the event got:

- YouTube, TikTok, Instagram, X, Twitch, Facebook, press
- Steam numbers, exhibitors, quotes and partners

Two rules apply to all of it:

- **Content from Endix's own accounts never counts.** These are YouTube @endixexpo, TikTok @endix_expo, Instagram @endix_expo and X @Endix_Expo.
- **Each edition is its own block**, defined by a date window. Spring data must never leak into Winter, and adding a new edition must be trivial.

Live result:

- **Site:** https://planethappenings.github.io/endix-coverage/
  - Clean edition URLs: `/spring2026/` and `/winter2026/`. Old `#spring2026` hash links redirect.
- **Embed:** the site is embedded on endix-expo.com through Lovable. When it is framed, it hides its own header logo; the `embedded` class is set in the template.
- **Possible future custom domain:** `coverage.endix-expo.com` would need a CNAME record pointing to `planethappenings.github.io`. Add a `CNAME` file to the repo only **after** that DNS record exists. This is not done yet.

---

## 2. Architecture (the blueprint)

```
            ┌──────────────────────────── Google Sheet = the database ────────────────────────────┐
            │ "Endix X-statistik (@Endix_Expo)"  id 1Sk97t56KJcBACxyPRATpDeC4Qk1fzZZMfXH6dqjHFCg     │
            │                                                                                        │
 Grok Bot ──┼─► Grok's tabs (X data, Swedish): Översikt, Endix Spring 2026, Endix Fall 2026,          │
 (X/Twitter)│   Snapshots, Inlägg, Trender, Månader 2026, Omnämnanden, Press, Eventjämförelse,       │
            │   Webb_* (incl. Webb_Kommentarer_Publik)          ← NEVER write to these               │
            │                                                                                        │
 Apps Script┼─► Collector tabs: Editions, Own accounts, YT_Videos, Press_Feed, TikTok, Instagram,     │
 collector  │   Links_Manual, Press_Manual, Exhibitors, Twitch_Snapshots, Collector_Log              │
 (in sheet) │                                                                                        │
 Danne ─────┼─► Manual tabs: Links_Manual, Press_Manual, Exhibitors, YT_Channels (column H)           │
            └────────────────────────────────────────────┬───────────────────────────────────────────┘
                                                         │ read once a day (Google Sheets connector)
                                                         ▼
            Claude scheduled task (07:07 Stockholm) → tools/build_data.py → data/report_data.json
                                                    → tools/build_page.py → index.html (+ /<slug>/index.html)
                                                    → git push → GitHub Pages → embedded on endix-expo.com
```

### Why it was built this way

- **Google Sheet as the hub.** It's free, Danne can read and edit it, Grok was already writing X data there, and Apps Script can run on a schedule with no server.
- **Apps Script for collecting.** It runs inside Google, so there is no hosting and no blocked IPs. Keys are kept in Script properties, and time triggers are built in.
- **Claude as judge and filter, not as scraper.** Claude's workspace can't reach YouTube/TikTok etc. directly (its network is allowlisted). So collection happens in Apps Script and Apify. Once a day Claude reads the sheet, decides what is real coverage versus noise, builds the page and pushes it.
- **GitHub Pages for hosting.** Lovable was tried first and dropped ("I don't like working in it"). The page is one static HTML file with its data embedded.
- **Not used:**
  - Danne's own browser or accounts for scraping (he considers it a risk).
  - Paid tools before they're proven: Apify was used on the free tier first.
  - Fragile GitHub scrapers, which get blocked on datacenter IPs.
  - Gemini: it was tried in the Lovable era, then removed. YouTube API search plus Claude's judgement replaced it.

---

## 3. Data sources, in detail

| Source | How | Cost | Cadence |
|---|---|---|---|
| **X / Twitter** | Grok Bot (Danne's own process) writes mentions, views, top-10 posts and curated comments into Grok's tabs. Claude only **reads** them. | Grok subscription | Grok updates daily |
| **YouTube** | Apps Script advanced service `YouTube` (Data API v3): `Search.list` for each edition keyword inside the edition window, then `Videos.list` for stats. Incremental searching via the `yt_last_<slug>` property. Duration ≤180 s counts as a short; a video with live details counts as `live`. | Free (quota ≈ 100 units per search) | Daily, weekly once an edition is finished |
| **Press** | Google News RSS: one date-bounded search per edition, across 31 country/language editions (`GOOGLE_NEWS_FEEDS`). Plus the GDELT doc API (last 3 months) and Bing News RSS for 5 markets. Deduplicated on normalised headline plus outlet. Grok's `Press` tab (press found via X) and `Press_Manual` are merged in `build_data.py`. | Free | Daily |
| **TikTok** | Apify actor `clockworks~tiktok-scraper`: search query `endix`, hashtags `endix` and `endixexpo`, plus `postURLs` to refresh stats of known posts | ≈ $1.70 per 1,000 results | See throttling below |
| **Instagram** | Apify `apify~instagram-hashtag-scraper` for discovery and `apify~instagram-scraper` (directUrls) to refresh stats | Apify credits | See throttling below |
| **Twitch** | Helix API with client credentials. Polls `streams?game_id=<Endix category>` every 15 minutes, but **only** from 1 day before an event until 3 days after it. Saved to Twitch_Snapshots. Spring 2026 numbers came from SullyGnome and are hard-coded in CONFIG. | Free | 15 min around events |
| **Steam** | Impressions and reads for each Steam event, from Steamworks/the old Lovable page. Hard-coded in CONFIG (`steam.events`). Exhibitor names and capsule images come from the public `store.steampowered.com/api/appdetails` (no key needed). | Free | Manual or daily |
| **Steam reviews** | Public endpoint `store.steampowered.com/appreviews/4356840?json=1` (no key), 100 reviews per request, newest first. Saved to `Steam_Reviews`; edition by review date. Column K *Show* is Danne's choice (TRUE/FALSE); empty = auto-pick English, recommended, 40–400 characters, most helpful first (max 12 per edition). Shown under "What people are saying" with a *Steam reviews* filter. | Free | Daily |
| **Facebook / other** | Manual only: Danne pastes the link and types the views into `Links_Manual`. | Free | Manual |
| **Manual links** | Any TikTok, Instagram or YouTube link pasted into `Links_Manual` is tracked automatically, even if it doesn't mention "Endix". This is how old Spring posts were seeded, since TikTok search favours new videos. | – | – |

### Apify throttling (collector v2.5)

- **Search for new posts:**
  - every 2 days during the hot period: from **14 days before** an event (`HOT_DAYS_BEFORE_EVENT`, which covers the paid TikTok creator push) until 7 days after it
  - weekly otherwise
  - only while some edition window is open
- **Caps:**
  - TikTok: `resultsPerPage 40`, `maxItems 120`
  - Instagram: `resultsLimit 40`, `maxItems 80`
  - every run has `maxTotalChargeUsd=1`
- **Refreshing stats of known posts:** every 2 days when hot, weekly otherwise.
  - Rows with status `own` or `rejected` are never refreshed.
  - Editions whose window ended more than 30 days ago are refreshed **weekly** (`FINISHED_REFRESH_DAYS = 7`), on every platform.
- **Runs are asynchronous:** `startSocial()` starts them and stores the run IDs in the `apify_runs` property. `finishApifyRuns()` (hourly) collects the results, so no run blocks the 6-minute Apps Script limit.
- **Budget:** the Apify free plan gives $5/month. It was advised to move to the Starter plan with a monthly spend cap of about $25 before 23 Oct 2026, ahead of the Winter marketing push. Check the Apify billing page to see whether that happened.

---

## 4. The Apps Script collector (`collector/EndixCollector.gs`, v2.5)

It lives in the sheet under **Tillägg → Apps Script** (the sheet is in Swedish). The copy in this repo is the reference version. If the copy in Apps Script differs, the one in Apps Script is what actually runs.

- **Script properties** (Project settings → Script properties). Keys go here only, never in code, never in chat:
  - `APIFY_TOKEN`
  - `TWITCH_CLIENT_ID`
  - `TWITCH_CLIENT_SECRET`
  - optional `TWITCH_GAME_NAME`, default "Endix"
- **Advanced service:** YouTube Data API v3 must be enabled under Services.
- **Setup order:**
  1. `setup()` creates the tabs.
  2. `testKeys()` writes OK or error lines to Collector_Log.
  3. `installTriggers()` creates these triggers:
     - `collectAll`: daily around 06:00. It runs YouTube, press, startSocial and fillExhibitors.
     - `finishApifyRuns`: hourly.
     - `twitchPoll`: every 15 minutes. It returns immediately outside event days.
- **Sheet menu "Endix collector":** has an item to run each collector by hand, a press backfill, key checks, setup and the trigger installer. Danne should **not** need to run `startSocial` by hand; the schedule handles it.
- **Statuses on rows:**
  - `new` (mentions Endix)
  - `no keyword`
  - `own`
  - `manual` (from Links_Manual)
  - `rejected` (set by hand to hide a row)
- **Keyword matching** on TikTok/Instagram: "Endix" must appear as a whole word (`endix`, `#endixexpo`, `#endix2026`, `@endix_expo`), never inside words like *appendix* or *bendix*.

### Tabs the collector owns

| Tab | Columns |
|---|---|
| Editions | Edition, Slug, Event start, Event end, Window start, Window end, Keywords, Active |
| Own accounts | Platform, Handle, Channel ID (filled automatically) |
| YT_Videos | Video ID, Edition, URL, Title, Channel, Channel ID, Published, Views, Likes, Comments, Duration (s), Type, Mentions Endix, Status, First seen, Last updated |
| Press_Feed | Key, Edition, Published, Outlet, Outlet domain, Headline, URL, Feed, Status, First seen |
| TikTok / Instagram | Post ID, Edition, URL, Creator, Creator name, Followers, Published, Views, Likes, Comments, Shares, Caption, Mentions Endix, Status, Source, First seen, Last updated |
| Links_Manual | URL, Platform, Edition (optional), Creator, Views (only for Facebook/other), Note |
| Press_Manual | URL, Edition, Published, Outlet, Country, Headline, Monthly visitors, Note |
| Exhibitors | Edition, Store URL, Game / Capsule image / Developer (filled automatically), Note |
| Twitch_Snapshots | Time, Edition, Stream ID, Login, Streamer, Language, Viewers, Title, Started |
| Collector_Log | Time, Collector, Message (newest first) |

There is also **YT_Channels**, which the daily Claude task maintains. Its columns are: Channel, Channel link, Videos, Views, Editions, Most viewed title, G = Claude's suggested category, H = **Danne's choice** (`creator` / `media` / `exclude`). Column H is never overwritten.

Current editions:

| Edition | Slug | Event | Window |
|---|---|---|---|
| Endix Spring 2026 | spring2026 | 22–24 May 2026 | 1 Mar – 31 Aug 2026 |
| Endix Winter 2026 | winter2026 | 6–8 Nov 2026 | 1 Sep – 31 Dec 2026 |

Grok's X tab for Winter is called **"Endix Fall 2026"**, not "Winter".

---

## 5. The report builder (this repo)

### `tools/build_data.py`

Reads `data/sheet_dump.json` (gitignored) and writes `data/report_data.json`.

- **`CONFIG` holds everything that changes per event or is hand-curated:**
  - Block lists:
    - `yt_block_channels`: name-alikes such as music artists and people called Endix
    - `press_block_domains`
    - `social_block_handles`
    - `x_hide_authors` and `x_hide_ids`
  - `press_channels`: YouTube channels that count as media.
  - Per-edition static data:
    - aftermovie, Grok `x_tab` name, downloads
    - Twitch (SullyGnome numbers plus a timeline and languages)
    - Steam (totals, growth, per-event impressions/reads and sale page URLs)
    - partner (IGN, official streaming partner)
    - `featured` videos (IGN exclusive trailer `gOELy1UZLF8`, Insider Gaming interview `VfefYFlIGXE`)
    - `spotlight` (David Jaffe stream `BaREDgq-9OY`)
    - `characters` (Playable Avatars: Chimera CUSTOM XG, Alpha Nomos, Dave the Diver; Winter has the first two)
    - sponsor (Alienware)
    - partner `testimonials` (THQ Nordic, Frozen District, Alienware)
    - press `quotes`
- **Merge logic:**
  - Press: Grok `Press` + `Press_Feed` + `Press_Manual`, deduplicated by domain plus the first 25 characters of the normalised headline, or by canonical URL.
  - IGN "Official Trailer | Endix Showcase" pages are split out as `trailer_pages`.
  - Country comes from a known-domain map, then IGN subdomains, then the top-level domain. Language comes from the script or the country.
  - YouTube category: `YT_Channels` column H wins, then column G, then rules (press channels or official trailers → media, otherwise creator).
  - X: parses Grok's Swedish summary tab (Omnämnanden, Unika konton, Visningar, Engagemang, Virala inlägg, Topp 10). Swedish notes are converted to English-only text.
  - Comments and pull quotes come from `Webb_Kommentarer_Publik`, which Grok curates. Rows whose id starts with `press:` are press pull quotes.

### `tools/report_template.html` and `tools/build_page.py`

- **Injecting data:** the template has `/*DATA*/` and `/*HOSTED*/false` placeholders. `build_page.py` injects the JSON, adds a `<base>` script so the same page works at `/`, `/spring2026/` and under `/endix-coverage/`, adds favicons, and writes `index.html` plus `<slug>/index.html`.
- **Design:**
  - Fonts: Orbitron for headings and numbers, Rajdhani for body text.
  - Grey/dark theme with Endix brand colour only on hover. Pink #ff3fa4, violet #9c7dff, cyan #55e3f0.
  - Edition tabs on the left, "Coverage report" on the right.
- **Page sections, top to bottom:**
  1. Hero with the aftermovie and partner badge.
  2. KPI strip.
  3. Top moments: one per platform.
  4. **By platform:** one swipeable deck per channel, with highlights, embeds and a "View breakdown" slide-in table. The decks are YouTube, TikTok, Instagram, X, Twitch (KPI tiles, weekend viewer chart, language donut), Steam (totals, growth, smooth line charts per event, sale page cards) and Press (country bars, outlet logos).
  5. Meet the exhibitors: Steam capsules.
  6. Partner testimonials.
  7. "What people are saying": a quote wall with Press/X filters and sideways swipe.
  8. Playable Avatars.
  9. Download Endix card (Steam + Epic Store buttons).
  10. Footer logo.
- **Design decisions Danne made:**
  - Line charts, not bars.
  - The Steam widget was tried and removed; the custom game card stays.
  - Insider Gaming sits in the YouTube deck, not next to IGN, because they are competitors.
  - The X tag shows the logo only.
  - No downloads tile in the Steam deck, because downloads cover both Steam and Epic.

### Daily update: the Claude scheduled task

The scheduled task is **"Endix coverage report – daily update"**. It runs at 07:07 Europe/Stockholm with auto-approval and push notifications. It:

1. Clones this repo with push access.
2. Dumps the sheet via the Google Sheets connector (`get_spreadsheet`, includeGridData, the tab list in README).
3. Appends new YouTube channels to `YT_Channels` with a suggested category. It never touches column H.
4. Runs `build_data.py` and reviews new items, adding noise to the CONFIG block lists. It may add a **verbatim** pull quote under 25 words from a clearly positive English article. Quotes are never invented or paraphrased.
5. Runs `build_page.py`, then commits only `tools/`, `data/report_data.json`, `index.html` and the slug pages. The message format is "Daily update YYYY-MM-DD: +N YouTube, +N press".
6. Ends with 2–3 lines in Swedish, including any `ERROR` lines from Collector_Log.

### New edition checklist

1. Add a row to the **Editions** tab: name, slug, event dates, window dates, keywords, Active = TRUE.
2. Add an entry under `CONFIG['editions'][<slug>]` in `build_data.py`, using the Grok `x_tab` name. Fill aftermovie, Twitch, Steam, characters and the rest when known.
3. Paste exhibitor store links into **Exhibitors**.
4. Nothing else changes. Windows decide which edition a post belongs to.

---

## 6. Rules and preferences

- **Keys:**
  - API keys live only in Apps Script **Script properties**. Never paste them into chat, code or the repo.
  - The repo is **public**, so nothing secret or internal goes in it.
- **Grok's tabs are read-only** for us. Don't change Danne's X/Grok process.
- **Endix's own accounts are never counted or shown.**
- **Quotes** must be verbatim, with a link to the source. Never invent them.
- **Free first.** Only pay once a solution is proven.
- **Ask before using Danne's own browser.** Don't use his personal accounts for scraping.
- **Danne's Google tools are in Swedish.** Give click-by-click guides using the Swedish menu names (e.g. *Tillägg → Apps Script*, *Arkiv → Inställningar → Tidszon*).
- **Danne should not have to run things by hand** (e.g. `startSocial`). Everything is on triggers.
- **Never change** `YT_Channels` column H or the `visa` column in `Webb_Kommentarer` unless Danne asks.
- **Language:** Danne writes Swedish or English. The public page is English only.

---

## 7. Lessons and gotchas (worth reusing)

- **Edition dates shifted a day.** The script and sheet time zones differed. Set the sheet's time zone (*Arkiv → Inställningar → Tidszon*) to match the script (Europe/Berlin = Stockholm time).
- **Some Bing News markets return HTML, not RSS.** The markets en-US, ja-JP, es-ES and pt-BR do this. `rss_()` now skips any response that isn't RSS.
- **Google News returns only about 100 hits per query.** So each edition gets its own date-bounded query (`after:` / `before:`), across many country editions.
- **The first Apify version burned credits.** It searched daily for up to 600 results. Now it is throttled, capped, and has a $1 charge limit per run.
- **URL dedupe must keep YouTube's `v=` parameter.** Otherwise every YouTube link collapses into one.
- **Apps Script has a 6-minute limit per run.** Never wait for Apify runs; start them and collect the results later.
- **The sheet dump is too large to read inline.** The connector saves it to a tool-results file, which gets copied to `data/sheet_dump.json`.
- **Grok writes title rows above its headers.** `table(..., header_hint=...)` finds the real header row.
- **Grok's notes are in Swedish.** `x_text()` keeps quoted English text and drops Swedish notes.
- **An "Endix" keyword match catches noise:** music artists, people named Endix, and words like appendix/bendix. Use whole-word regex plus block lists plus the YT_Channels categories.
- **GitHub Pages and clean URLs:** write the same HTML to `<slug>/index.html` and set `<base>` at runtime.

---

## 8. Reusing this for a new scraping tool

The pattern that worked:

1. **Google Sheet as the database.** One tab per source, one config tab (like Editions) that defines time windows or segments, and manual tabs for links that automation misses.
2. **An Apps Script collector inside the sheet.** Keys go in Script properties, timing in time triggers, and every run writes to a log tab. For each platform:
   - YouTube Data API: free, via the advanced service.
   - Google News RSS + GDELT + Bing RSS: free press monitoring.
   - Apify: TikTok/Instagram, run asynchronously, with caps and throttling.
   - Twitch Helix: free, polled only around key dates.
   - Grok Bot: X, written into its own tabs.
3. **Claude as a daily scheduled task.** It reads the sheet through the Google Sheets connector, judges and filters, builds static JSON and HTML with Python, and pushes to GitHub.
4. **GitHub Pages** for hosting, embedded wherever it's needed.

To start a new tool from this: copy `collector/EndixCollector.gs`, then change `TABS`, `SOCIAL_SEARCH`, the keyword regex, `GOOGLE_NEWS_FEEDS` and the Editions rows. Then copy `tools/` and adapt `CONFIG` and the template sections. Create a new scheduled task modelled on the one in section 5.

---

## 9. Other work done in the same session (not part of this repo)

These were done in the same chat. Their files lived only in that session's temporary workspace; the finished videos are in Danne's `Downloads\SoMe` folder.

- **Badges and Steam capsules:**
  - Badge PNGs: "Exclusive trailer", "Exclusive OST release", "Release date reveal".
  - A 920×430 / 460×215 Steam capsule: "Game Announcement in Endix".
- **Video clips made with Tesseract** (the Mirage CLI, `tsrct`), vertical 9:16 for TikTok/Instagram/LinkedIn:
  - Layout: gameplay on top, facecam below.
  - Captions: white Orbitron with a black stroke.
  - A subtle creator tag (e.g. `@DavidJaffeGames`, `@dansgaming`).
  - A "Wishlist on Steam" end card.
  - Delivered:
    - "Endix x DansGaming - Its Dave"
    - "Endix x Jaffe 01–06"
    - "Endix x Jaffe - They should hire me (LinkedIn v2)": hook → E3 vs Endix → Future of expos, with crossfades, 78 s.
  - Speech-to-text: Whisper via sherpa-onnx, from GitHub releases. Hugging Face and OpenAI downloads are blocked in the workspace.
  - Tesseract notes:
    - Path masks are used for the split screen.
    - `input.start` must equal `inputRange.start`.
    - Keyframes on layers that start later use a local clock.
    - Mask and layer IDs must be unique.
    - Long exports must run in the background.
