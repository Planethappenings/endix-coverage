/**
 * Endix coverage collector v2.7 — Google Apps Script for the "Endix X-statistik" sheet.
 * Adds its own tabs and never touches Grok's tabs.
 *
 * Sources: YouTube (YouTube API), press (Google News per edition + GDELT + Bing RSS), TikTok + Instagram (Apify),
 * Twitch (Twitch API, polled every 15 min during each event), manual links (any platform),
 * Steam user reviews of Endix (public Steam store endpoint, no key needed).
 *
 * Keys live in Project settings → Script properties (never in this file):
 *   APIFY_TOKEN, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET   (optional: TWITCH_GAME_NAME, default "Endix")
 *
 * After pasting: run setup(), then testKeys(), then installTriggers().
 * New event: add one row to the Editions tab. Nothing else changes.
 */

const TABS = {
  editions: 'Editions',
  own: 'Own accounts',
  yt: 'YT_Videos',
  press: 'Press_Feed',
  tiktok: 'TikTok',
  ig: 'Instagram',
  links: 'Links_Manual',
  pressManual: 'Press_Manual',
  exhibitors: 'Exhibitors',
  twitch: 'Twitch_Snapshots',
  reviews: 'Steam_Reviews',
  log: 'Collector_Log',
};
const SOCIAL_HEADERS = ['Post ID', 'Edition', 'URL', 'Creator', 'Creator name', 'Followers', 'Published', 'Views', 'Likes',
  'Comments', 'Shares', 'Caption', 'Mentions Endix', 'Status', 'Source', 'First seen', 'Last updated'];
const LINK_HEADERS = ['URL', 'Platform', 'Edition (optional)', 'Creator', 'Views (only for Facebook/other)', 'Note'];
const TWITCH_HEADERS = ['Time', 'Edition', 'Stream ID', 'Login', 'Streamer', 'Language', 'Viewers', 'Title', 'Started'];
const ACTORS = {
  tiktok: 'clockworks~tiktok-scraper',
  igHashtag: 'apify~instagram-hashtag-scraper',
  igPosts: 'apify~instagram-scraper',
};
const STEAM_APP_ID = '4356840';  // Endix on Steam
const REVIEW_HEADERS = ['Review ID', 'Edition', 'Posted', 'Language', 'Recommended', 'Hours played', 'Helpful votes', 'Review', 'Link', 'Suggested', 'Show (TRUE/FALSE, your choice)', 'First seen'];
const SOCIAL_SEARCH = { tiktokQueries: ['endix', 'endixexpo', 'endix expo'], hashtags: ['endix', 'endixexpo'] };

const EDITION_HEADERS = ['Edition', 'Slug', 'Event start', 'Event end', 'Window start', 'Window end', 'Keywords', 'Active'];
const OWN_HEADERS = ['Platform', 'Handle', 'Channel ID (filled automatically)'];
const YT_HEADERS = ['Video ID', 'Edition', 'URL', 'Title', 'Channel', 'Channel ID', 'Published', 'Views', 'Likes', 'Comments',
  'Duration (s)', 'Type', 'Mentions Endix', 'Status', 'First seen', 'Last updated'];
const PRESS_HEADERS = ['Key', 'Edition', 'Published', 'Outlet', 'Outlet domain', 'Headline', 'URL', 'Feed', 'Status', 'First seen'];

const GOOGLE_NEWS_FEEDS = [
  ['US', 'en', 'US:en'], ['GB', 'en', 'GB:en'], ['JP', 'ja', 'JP:ja'], ['KR', 'ko', 'KR:ko'],
  ['TW', 'zh-TW', 'TW:zh-Hant'], ['DE', 'de', 'DE:de'], ['FR', 'fr', 'FR:fr'], ['ES', 'es', 'ES:es'],
  ['BR', 'pt-BR', 'BR:pt-419'], ['IT', 'it', 'IT:it'], ['SE', 'sv', 'SE:sv'], ['PL', 'pl', 'PL:pl'],
];
// More Google News editions. Bing en-US / ja-JP / es-ES / pt-BR do not serve RSS, so they are gone; Google covers those countries.
GOOGLE_NEWS_FEEDS.push(
  ['MX', 'es-419', 'MX:es-419'], ['AR', 'es-419', 'AR:es-419'], ['PT', 'pt-PT', 'PT:pt-150'], ['NL', 'nl', 'NL:nl'],
  ['TR', 'tr', 'TR:tr'], ['GR', 'el', 'GR:el'], ['RO', 'ro', 'RO:ro'], ['CZ', 'cs', 'CZ:cs'], ['IN', 'en-IN', 'IN:en'],
  ['AU', 'en-AU', 'AU:en'], ['CA', 'en-CA', 'CA:en'], ['SA', 'ar', 'SA:ar'], ['AE', 'ar', 'AE:ar'], ['ID', 'id', 'ID:id'],
  ['TH', 'th', 'TH:th'], ['VN', 'vi', 'VN:vi'], ['HK', 'zh-HK', 'HK:zh-Hant'], ['PH', 'en-PH', 'PH:en'], ['SG', 'en-SG', 'SG:en']);
const BING_MARKETS = ['en-GB', 'ko-KR', 'zh-TW', 'de-DE', 'fr-FR'];
const EXHIBITOR_HEADERS = ['Edition', 'Store URL (Steam or other)', 'Game (filled automatically)', 'Capsule image (filled automatically)', 'Developer (filled automatically)', 'Note'];
const PRESS_MANUAL_HEADERS = ['URL', 'Edition', 'Published', 'Outlet', 'Country', 'Headline', 'Monthly visitors', 'Note'];
const REFRESH_DAYS_AFTER_WINDOW = 30;
// Editions whose window ended more than REFRESH_DAYS_AFTER_WINDOW days ago are refreshed once a week
// (YouTube views, press, TikTok/Instagram stats) instead of every day.
const FINISHED_REFRESH_DAYS = 7;
// "Hot" period for TikTok/Instagram: search daily + refresh every 2 days from this many days before an event
// until 7 days after it (weekly otherwise). 14 days covers the paid creator push before the event.
const HOT_DAYS_BEFORE_EVENT = 14;

/* ---------------- menu ---------------- */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Endix collector')
    .addItem('Run all collectors now', 'collectAll')
    .addItem('YouTube only', 'collectYouTube')
    .addItem('Press only', 'collectPress')
    .addItem('Press: search back through all editions', 'backfillPress')
    .addItem('TikTok + Instagram: start', 'startSocial')
    .addItem('TikTok + Instagram: fetch finished results', 'finishApifyRuns')
    .addItem('Exhibitors: fetch names and images from Steam', 'fillExhibitors')
    .addItem('Steam reviews only', 'collectSteamReviews')
    .addItem('Check API keys', 'testKeys')
    .addSeparator()
    .addItem('Set up tabs', 'setup')
    .addItem('Install daily schedule', 'installTriggers')
    .addToUi();
}

/* ---------------- setup ---------------- */
function setup() {
  const ed = sheet_(TABS.editions, EDITION_HEADERS);
  if (ed.getLastRow() < 2) {
    ed.getRange(2, 1, 2, EDITION_HEADERS.length).setValues([
      ['Endix Spring 2026', 'spring2026', d_('2026-05-22'), d_('2026-05-24'), d_('2026-03-01'), d_('2026-08-31'), 'Endix, Endix Expo, Endix Showcase', true],
      ['Endix Winter 2026', 'winter2026', d_('2026-11-06'), d_('2026-11-08'), d_('2026-09-01'), d_('2026-12-31'), 'Endix, Endix Expo, Endix Showcase', true],
    ]);
    ed.getRange('C:F').setNumberFormat('yyyy-mm-dd');
  }
  const own = sheet_(TABS.own, OWN_HEADERS);
  if (own.getLastRow() < 2) {
    own.getRange(2, 1, 3, 3).setValues([
      ['youtube', '@endixexpo', ''], ['tiktok', '@endix_expo', ''], ['instagram', '@endix_expo', ''],
    ]);
  }
  sheet_(TABS.yt, YT_HEADERS);
  sheet_(TABS.press, PRESS_HEADERS);
  sheet_(TABS.tiktok, SOCIAL_HEADERS);
  sheet_(TABS.ig, SOCIAL_HEADERS);
  sheet_(TABS.links, LINK_HEADERS);
  sheet_(TABS.pressManual, PRESS_MANUAL_HEADERS);
  sheet_(TABS.exhibitors, EXHIBITOR_HEADERS);
  sheet_(TABS.twitch, TWITCH_HEADERS);
  sheet_(TABS.reviews, REVIEW_HEADERS);
  sheet_(TABS.log, ['Time', 'Collector', 'Message']);
  log_('setup', 'Tabs ready');
}

function installTriggers() {
  const mine = ['collectAll', 'finishApifyRuns', 'twitchPoll'];
  ScriptApp.getProjectTriggers().forEach(t => { if (mine.includes(t.getHandlerFunction())) ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('collectAll').timeBased().everyDays(1).atHour(6).create();
  ScriptApp.newTrigger('finishApifyRuns').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('twitchPoll').timeBased().everyMinutes(15).create();
  log_('setup', 'Triggers installed: daily collect ~06:00, Apify results hourly, Twitch every 15 min (only active around events)');
}

function collectAll() {
  const weekly = editions_().filter(e => e.active && weeklyDue_(e));
  try { collectYouTube(); } catch (e) { log_('youtube', 'ERROR ' + e.message); }
  try { collectPress(); } catch (e) { log_('press', 'ERROR ' + e.message); }
  try { startSocial(); } catch (e) { log_('apify', 'ERROR ' + e.message); }
  try { fillExhibitors(); } catch (e) { log_('exhibitors', 'ERROR ' + e.message); }
  try { collectSteamReviews(); } catch (e) { log_('steam reviews', 'ERROR ' + e.message); }
  const props = PropertiesService.getScriptProperties();
  weekly.forEach(e => props.setProperty('weekly_' + e.slug, String(Date.now())));
  if (weekly.length) log_('weekly', 'Weekly refresh done for ' + weekly.map(e => e.slug).join(', '));
}

/* ---------------- Exhibitors ----------------
 * Paste one Steam store link per row (column B) and the edition slug (column A).
 * Game name, capsule image and developer are filled from Steam's public store API (no key needed).
 * Not on Steam? Fill Game and Capsule image yourself; the link can go anywhere (Epic, website). */
function fillExhibitors() {
  const sh = sheet_(TABS.exhibitors, EXHIBITOR_HEADERS);
  if (sh.getLastRow() < 2) return;
  const rng = sh.getRange(2, 1, sh.getLastRow() - 1, EXHIBITOR_HEADERS.length);
  const rows = rng.getValues();
  let filled = 0, failed = 0;
  rows.forEach(r => {
    const m = String(r[1] || '').match(/store\.steampowered\.com\/app\/(\d+)/);
    if (!m || (r[2] && r[3])) return;
    try {
      const res = UrlFetchApp.fetch('https://store.steampowered.com/api/appdetails?appids=' + m[1] + '&l=english&filters=basic', { muteHttpExceptions: true });
      const j = JSON.parse(res.getContentText() || '{}')[m[1]];
      if (!j || !j.success) { failed++; return; }
      r[2] = r[2] || j.data.name;
      r[3] = r[3] || j.data.header_image;
      r[4] = r[4] || (j.data.developers || []).join(', ');
      filled++;
      Utilities.sleep(400);
    } catch (e) { failed++; }
  });
  rng.setValues(rows);
  if (filled || failed) log_('exhibitors', `filled ${filled} games from Steam` + (failed ? `, ${failed} not found (check the link)` : ''));
}

function testKeys() {
  const p = PropertiesService.getScriptProperties();
  const apify = p.getProperty('APIFY_TOKEN');
  if (!apify) log_('keys', 'APIFY_TOKEN missing');
  else {
    const r = UrlFetchApp.fetch('https://api.apify.com/v2/users/me?token=' + apify, { muteHttpExceptions: true });
    log_('keys', r.getResponseCode() === 200 ? 'Apify OK: ' + JSON.parse(r.getContentText()).data.username : 'Apify key rejected (' + r.getResponseCode() + ')');
  }
  if (!p.getProperty('TWITCH_CLIENT_ID') || !p.getProperty('TWITCH_CLIENT_SECRET')) log_('keys', 'Twitch keys missing');
  else {
    try {
      const gid = twitchGameId_();
      log_('keys', gid ? 'Twitch OK, category "' + twitchGameName_() + '" id ' + gid : 'Twitch OK, but no category named "' + twitchGameName_() + '" found');
    } catch (e) { log_('keys', 'Twitch error: ' + e.message); }
  }
}

/* ---------------- editions ---------------- */
function editions_() {
  const sh = sheet_(TABS.editions, EDITION_HEADERS);
  if (sh.getLastRow() < 2) return [];
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, EDITION_HEADERS.length).getValues();
  return rows.filter(r => r[1] && r[4] && r[5]).map(r => ({
    name: r[0], slug: String(r[1]).trim(), eventStart: new Date(r[2]), eventEnd: new Date(r[3]),
    from: new Date(r[4]), to: endOfDay_(new Date(r[5])),
    keywords: String(r[6] || 'Endix').split(',').map(s => s.trim()).filter(Boolean),
    active: r[7] === true || String(r[7]).toUpperCase() === 'TRUE',
  }));
}
function editionFor_(eds, date) {
  const t = date.getTime();
  const e = eds.find(x => t >= x.from.getTime() && t <= x.to.getTime());
  return e ? e.slug : '';
}
function finished_(ed) {
  return Date.now() > ed.to.getTime() + REFRESH_DAYS_AFTER_WINDOW * 864e5;
}
function weeklyDue_(ed) {
  if (!finished_(ed)) return false;
  const last = Number(PropertiesService.getScriptProperties().getProperty('weekly_' + ed.slug) || 0);
  return Date.now() - last >= (FINISHED_REFRESH_DAYS - 0.1) * 864e5;
}
function stillRefreshing_(ed) {
  return !finished_(ed) || weeklyDue_(ed);
}

/* ---------------- YouTube ---------------- */
function collectYouTube() {
  const eds = editions_().filter(e => e.active);
  const props = PropertiesService.getScriptProperties();
  const ownIds = ownYouTubeIds_();
  const sh = sheet_(TABS.yt, YT_HEADERS);
  const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, YT_HEADERS.length).getValues() : [];
  const index = {};
  data.forEach((r, i) => { index[r[0]] = i; });

  // 1. search (incremental after the first full backfill of each edition)
  const found = new Set();
  let searches = 0;
  eds.forEach(ed => {
    if (Date.now() < ed.from.getTime()) return;
    const last = props.getProperty('yt_last_' + ed.slug);
    const after = last ? new Date(Math.max(ed.from.getTime(), Number(last) - 2 * 864e5)) : ed.from;
    if (after.getTime() > ed.to.getTime()) return;
    const before = new Date(Math.min(ed.to.getTime(), Date.now()));
    ed.keywords.forEach(kw => {
      let token = '', pages = 0;
      do {
        const res = YouTube.Search.list('id', {
          q: '"' + kw + '"', type: 'video', maxResults: 50, order: 'date',
          publishedAfter: after.toISOString(), publishedBefore: before.toISOString(), pageToken: token,
        });
        searches++;
        (res.items || []).forEach(it => it.id && it.id.videoId && found.add(it.id.videoId));
        token = res.nextPageToken || '';
        pages++;
      } while (token && pages < (last ? 2 : 6));
    });
    props.setProperty('yt_last_' + ed.slug, String(Date.now()));
  });

  // 1b. YouTube links pasted into Links_Manual are always tracked, even without "Endix" in the title
  const manualYt = {};
  Object.entries(manualLinks_()).forEach(([id, m]) => { if (m.platform === 'youtube') { manualYt[id] = m; found.add(id); } });

  // 2. fetch details for new IDs + refresh known ones still in their refresh period
  const refreshIds = data.filter(r => {
    const ed = eds.find(e => e.slug === r[1]);
    return ed && stillRefreshing_(ed) && r[13] !== 'rejected';
  }).map(r => r[0]);
  const newIds = [...found].filter(id => !(id in index));
  const all = [...new Set(newIds.concat(refreshIds))];
  const now = new Date();
  let added = 0, refreshed = 0;
  for (let i = 0; i < all.length; i += 50) {
    const res = YouTube.Videos.list('snippet,statistics,contentDetails,liveStreamingDetails', { id: all.slice(i, i + 50).join(',') });
    (res.items || []).forEach(v => {
      const s = v.snippet, st = v.statistics || {};
      const published = new Date(s.publishedAt);
      const text = [s.title, s.description, (s.tags || []).join(' ')].join(' ');
      const mentions = /(?<![a-z0-9])endix(?:expo|partner|showcase|_expo|20\d\d)?(?![a-z0-9])/i.test(text);  // also #endixexpo, #endix2026
      const dur = isoDur_(v.contentDetails && v.contentDetails.duration);
      const type = v.liveStreamingDetails ? 'live' : (dur > 0 && dur <= 180 ? 'short' : 'video');
      if (v.id in index) {
        const r = data[index[v.id]];
        r[7] = num_(st.viewCount); r[8] = num_(st.likeCount); r[9] = num_(st.commentCount); r[15] = now;
        refreshed++;
      } else {
        const mlink = manualYt[v.id];
        const edition = (mlink && mlink.edition) || editionFor_(eds, published);
        if (!edition) return;
        const status = ownIds.includes(s.channelId) ? 'own' : mlink ? 'manual' : (mentions ? 'new' : 'no keyword');
        data.push([v.id, edition, 'https://www.youtube.com/watch?v=' + v.id, s.title, s.channelTitle, s.channelId, published,
          num_(st.viewCount), num_(st.likeCount), num_(st.commentCount), dur, type, mentions, status, now, now]);
        index[v.id] = data.length - 1;
        added++;
      }
    });
  }
  if (data.length) {
    sh.getRange(2, 1, data.length, YT_HEADERS.length).setValues(data);
    sh.getRange(2, 7, data.length, 1).setNumberFormat('yyyy-mm-dd');
  }
  log_('youtube', `searches ${searches} (≈${searches * 100} quota units), found ${found.size}, added ${added}, refreshed ${refreshed}`);
}

function ownYouTubeIds_() {
  const sh = sheet_(TABS.own, OWN_HEADERS);
  const rows = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues() : [];
  const ids = [];
  rows.forEach((r, i) => {
    if (String(r[0]).toLowerCase() !== 'youtube') return;
    let id = r[2];
    if (!id && r[1]) {
      try {
        const res = YouTube.Channels.list('id', { forHandle: String(r[1]).replace(/^@/, '') });
        id = res.items && res.items[0] && res.items[0].id;
        if (id) sh.getRange(i + 2, 3).setValue(id);
      } catch (e) { log_('youtube', 'Could not resolve ' + r[1] + ': ' + e.message); }
    }
    if (id) ids.push(id);
  });
  return ids;
}

/* ---------------- Press ---------------- */
function backfillPress() { collectPress(true); }

function collectPress(all) {
  all = all === true;
  const eds = editionsAll_();
  const sh = sheet_(TABS.press, PRESS_HEADERS);
  const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, PRESS_HEADERS.length).getValues() : [];
  const keys = new Set(data.map(r => r[0]));
  const now = new Date();
  const out = [];
  let found = 0;

  const add = (item, feed) => {
    found++;
    if (!item.pub || isNaN(item.pub)) return;
    const edition = editionFor_(eds, item.pub);
    if (!edition) return;
    const key = norm_(item.headline) + '|' + norm_(item.outlet);
    if (keys.has(key)) return;
    keys.add(key);
    out.push([key, edition, item.pub, item.outlet, item.domain, item.headline, item.url, feed, 'new', now]);
  };

  // Google News only returns the newest ~100 hits, so each edition gets its own date-bounded search.
  const fmt = d => Utilities.formatDate(d, 'UTC', 'yyyy-MM-dd');
  const nowMs = Date.now();
  const ranges = eds.filter(e => all || (nowMs >= e.from.getTime() && (nowMs <= e.to.getTime() + 30 * 864e5 || (e.active && weeklyDue_(e)))))
    .map(e => ` after:${fmt(e.from)} before:${fmt(new Date(e.to.getTime() + 864e5))}`);
  const queries = ranges.length ? ranges : [''];
  queries.forEach(range => GOOGLE_NEWS_FEEDS.forEach(([gl, hl, ceid]) => {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent('"Endix"' + range)}&hl=${hl}&gl=${gl}&ceid=${encodeURIComponent(ceid)}`;
    rss_(url).forEach(it => {
      const src = it.getChild('source');
      const outlet = src ? src.getText() : '';
      const domain = src && src.getAttribute('url') ? host_(src.getAttribute('url').getValue()) : '';
      let headline = text_(it, 'title');
      if (outlet && headline.endsWith(' - ' + outlet)) headline = headline.slice(0, -(outlet.length + 3));
      add({ headline, outlet, domain, url: text_(it, 'link'), pub: new Date(text_(it, 'pubDate')) }, 'google-news-' + gl);
    });
    Utilities.sleep(600);
  }));

  // GDELT: free worldwide news index (last ~3 months), with the outlet's country.
  try {
    const res = UrlFetchApp.fetch('https://api.gdeltproject.org/api/v2/doc/doc?query=endix&mode=artlist&format=json&maxrecords=250&timespan=3months&sort=datedesc',
      { muteHttpExceptions: true });
    const body = res.getContentText();
    if (res.getResponseCode() === 200 && body.trim().startsWith('{')) {
      (JSON.parse(body).articles || []).forEach(a => {
        const m = String(a.seendate || '').match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
        const pub = m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5])) : null;
        add({ headline: a.title || '', outlet: a.domain || '', domain: a.domain || '', url: a.url, pub }, 'gdelt:' + (a.sourcecountry || ''));
      });
    }
  } catch (e) { log_('press', 'GDELT skipped: ' + e.message); }

  BING_MARKETS.forEach(mkt => {
    const url = `https://www.bing.com/news/search?q=%22Endix%22&format=rss&setmkt=${mkt}`;
    rss_(url).forEach(it => {
      let link = text_(it, 'link');
      const m = link.match(/[?&]url=([^&]+)/);
      if (m) link = decodeURIComponent(m[1]);
      const domain = host_(link);
      add({ headline: text_(it, 'title'), outlet: domain, domain, url: link, pub: new Date(text_(it, 'pubDate')) }, 'bing-' + mkt);
    });
    Utilities.sleep(500);
  });

  if (out.length) {
    sh.getRange(sh.getLastRow() + 1, 1, out.length, PRESS_HEADERS.length).setValues(out);
    sh.getRange(2, 3, sh.getLastRow() - 1, 1).setNumberFormat('yyyy-mm-dd');
  }
  log_('press', `items seen ${found}, new articles ${out.length}`);
}

function editionsAll_() { return editions_(); }

function rss_(url) {
  try {
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
    const body = res.getContentText();
    if (res.getResponseCode() !== 200 || !/<rss[\s>]/i.test(body.slice(0, 2000))) return []; // blocked or not a feed: skip quietly
    const doc = XmlService.parse(body);
    const channel = doc.getRootElement().getChild('channel');
    return channel ? channel.getChildren('item') : [];
  } catch (e) { log_('press', 'Feed error ' + url + ': ' + e.message); return []; }
}

/* ---------------- TikTok + Instagram via Apify ---------------- */
// Runs are started here and collected later by finishApifyRuns() (hourly), so no run blocks the script.
function startSocial() {
  const token = PropertiesService.getScriptProperties().getProperty('APIFY_TOKEN');
  if (!token) { log_('apify', 'Skipped: APIFY_TOKEN not set in Script properties'); return; }
  const props = PropertiesService.getScriptProperties();
  const eds = editions_().filter(e => e.active);
  const now = Date.now();
  // Search weekly, daily in the hot period around an event (see HOT_DAYS_BEFORE_EVENT).
  const inWindow = eds.some(e => now >= e.from.getTime() && now <= e.to.getTime());
  const hot = eds.some(e => now >= e.eventStart.getTime() - HOT_DAYS_BEFORE_EVENT * 864e5 && now <= e.eventEnd.getTime() + 7 * 864e5);
  const lastSearch = Number(props.getProperty('social_search_last') || 0);
  const doSearch = inWindow && now - lastSearch >= (hot ? 0.9 : 6.9) * 864e5;
  const started = [];

  if (doSearch) {
    started.push(startRun_(token, ACTORS.tiktok, {
      searchQueries: SOCIAL_SEARCH.tiktokQueries, hashtags: SOCIAL_SEARCH.hashtags, resultsPerPage: 40,
      shouldDownloadVideos: false, shouldDownloadCovers: false, shouldDownloadSubtitles: false, shouldDownloadSlideshowImages: false,
    }, 'tiktok', 120));
    started.push(startRun_(token, ACTORS.igHashtag, { hashtags: SOCIAL_SEARCH.hashtags, resultsLimit: 40 }, 'instagram', 80));
    props.setProperty('social_search_last', String(now));
  }

  // refresh stats for known posts + manual links (daily around events, weekly otherwise)
  const due = refreshDue_(eds);
  if (due.tiktok.length) started.push(startRun_(token, ACTORS.tiktok, {
    postURLs: due.tiktok, resultsPerPage: 1, shouldDownloadVideos: false, shouldDownloadCovers: false,
  }, 'tiktok', due.tiktok.length + 10));
  if (due.instagram.length) started.push(startRun_(token, ACTORS.igPosts, {
    directUrls: due.instagram, resultsType: 'posts', resultsLimit: 1, addParentData: false,
  }, 'instagram', due.instagram.length + 10));

  const ok = started.filter(Boolean);
  if (ok.length) {
    const pending = JSON.parse(props.getProperty('apify_runs') || '[]').concat(ok);
    props.setProperty('apify_runs', JSON.stringify(pending));
  }
  log_('apify', `started ${ok.length} run(s); refreshing ${due.tiktok.length} TikToks, ${due.instagram.length} Instagram posts`);
}

function startRun_(token, actor, input, kind, maxItems) {
  const url = `https://api.apify.com/v2/acts/${actor}/runs?token=${token}&maxItems=${maxItems}&maxTotalChargeUsd=1`;
  const r = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify(input), muteHttpExceptions: true });
  if (r.getResponseCode() >= 300) { log_('apify', `Could not start ${actor}: ${r.getResponseCode()} ${r.getContentText().slice(0, 200)}`); return null; }
  const d = JSON.parse(r.getContentText()).data;
  return { id: d.id, dataset: d.defaultDatasetId, kind, actor, started: Date.now() };
}

function finishApifyRuns() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('APIFY_TOKEN');
  const pending = JSON.parse(props.getProperty('apify_runs') || '[]');
  if (!token || !pending.length) return;
  const still = [];
  pending.forEach(run => {
    const r = UrlFetchApp.fetch(`https://api.apify.com/v2/actor-runs/${run.id}?token=${token}`, { muteHttpExceptions: true });
    if (r.getResponseCode() !== 200) { still.push(run); return; }
    const status = JSON.parse(r.getContentText()).data.status;
    if (status === 'SUCCEEDED') {
      const items = JSON.parse(UrlFetchApp.fetch(`https://api.apify.com/v2/datasets/${run.dataset}/items?token=${token}&clean=true&format=json`).getContentText());
      const res = run.kind === 'tiktok' ? saveSocial_(TABS.tiktok, items.map(tiktokRow_).filter(Boolean)) : saveSocial_(TABS.ig, items.map(igRow_).filter(Boolean));
      log_('apify', `${run.kind} (${run.actor}): ${items.length} results, added ${res.added}, updated ${res.updated}`);
    } else if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
      log_('apify', `${run.kind} run ${status}`);
    } else if (Date.now() - run.started < 6 * 3600e3) {
      still.push(run);
    }
  });
  props.setProperty('apify_runs', JSON.stringify(still));
}

function tiktokRow_(v) {
  if (!v || !v.id || !v.webVideoUrl) return null;
  const a = v.authorMeta || {};
  return { id: String(v.id), url: v.webVideoUrl, handle: a.name || '', name: a.nickName || a.name || '', followers: a.fans,
    published: v.createTimeISO ? new Date(v.createTimeISO) : null, views: v.playCount, likes: v.diggCount, comments: v.commentCount,
    shares: v.shareCount, caption: v.text || '', platform: 'tiktok' };
}
function igRow_(p) {
  if (!p || !(p.shortCode || p.id) || !p.url) return null;
  return { id: String(p.shortCode || p.id), url: p.url, handle: p.ownerUsername || '', name: p.ownerFullName || p.ownerUsername || '',
    followers: '', published: p.timestamp ? new Date(p.timestamp) : null, views: p.videoPlayCount || p.videoViewCount || '',
    likes: p.likesCount, comments: p.commentsCount, shares: '', caption: p.caption || '', platform: 'instagram' };
}

function saveSocial_(tab, rows) {
  const sh = sheet_(tab, SOCIAL_HEADERS);
  const eds = editions_();
  const own = ownHandles_(tab === TABS.tiktok ? 'tiktok' : 'instagram');
  const manual = manualLinks_();
  const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, SOCIAL_HEADERS.length).getValues() : [];
  const index = {};
  data.forEach((r, i) => { index[String(r[0])] = i; });
  const now = new Date();
  let added = 0, updated = 0;
  rows.forEach(x => {
    if (x.id in index) {
      const r = data[index[x.id]];
      r[7] = num_(x.views); r[8] = num_(x.likes); r[9] = num_(x.comments); r[10] = num_(x.shares); r[16] = now;
      if (x.followers) r[5] = num_(x.followers);
      updated++;
      return;
    }
    const m = manual[x.id];
    const edition = (m && m.edition) || (x.published ? editionFor_(eds, x.published) : '');
    if (!edition) return;
    const mentions = /(?<![a-z0-9])endix(?:expo|partner|showcase|_expo|20\d\d)?(?![a-z0-9])/i.test(x.caption);  // not appendix, bendix ...
    const status = own.includes(String(x.handle).toLowerCase()) ? 'own' : (m ? 'manual' : (mentions ? 'new' : 'no keyword'));
    data.push([x.id, edition, x.url, x.handle, x.name, num_(x.followers), x.published || '', num_(x.views), num_(x.likes),
      num_(x.comments), num_(x.shares), String(x.caption).slice(0, 300), mentions, status, m ? 'manual' : 'search', now, now]);
    index[x.id] = data.length - 1;
    added++;
  });
  if (data.length) {
    sh.getRange(2, 1, data.length, SOCIAL_HEADERS.length).setValues(data);
    sh.getRange(2, 7, data.length, 1).setNumberFormat('yyyy-mm-dd');
  }
  return { added, updated };
}

function refreshDue_(eds) {
  const props = PropertiesService.getScriptProperties();
  const last = Number(props.getProperty('social_refresh_last') || 0);
  const now = Date.now();
  const hot = eds.some(e => now >= e.eventStart.getTime() - HOT_DAYS_BEFORE_EVENT * 864e5 && now <= e.eventEnd.getTime() + 7 * 864e5);
  const due = { tiktok: [], instagram: [] };
  const fullDue = now - last >= (hot ? 1.9 : 6.9) * 864e5;
  // running editions follow the normal cadence; finished editions get a weekly refresh
  const active = new Set(eds.filter(e => finished_(e) ? weeklyDue_(e) : fullDue).map(e => e.slug));
  [[TABS.tiktok, 'tiktok'], [TABS.ig, 'instagram']].forEach(([tab, key]) => {
    if (!active.size) return;
    const sh = sheet_(tab, SOCIAL_HEADERS);
    if (sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 14).getValues()
      .filter(r => active.has(r[1]) && !['rejected', 'own'].includes(r[13]))
      .forEach(r => due[key].push(r[2]));
  });
  if (fullDue) props.setProperty('social_refresh_last', String(now));
  Object.values(manualLinks_()).filter(m => !m.known).forEach(m => due[m.platform] && due[m.platform].push(m.url));
  due.tiktok = [...new Set(due.tiktok)];
  due.instagram = [...new Set(due.instagram)];
  return due;
}

// Links_Manual: any link pasted here is tracked. TikTok/Instagram get stats automatically.
function manualLinks_() {
  const sh = sheet_(TABS.links, LINK_HEADERS);
  if (sh.getLastRow() < 2) return {};
  const known = new Set();
  [TABS.tiktok, TABS.ig].forEach(t => {
    const s = sheet_(t, SOCIAL_HEADERS);
    if (s.getLastRow() > 1) s.getRange(2, 1, s.getLastRow() - 1, 1).getValues().forEach(r => known.add(String(r[0])));
  });
  const out = {};
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, LINK_HEADERS.length).getValues();
  rows.forEach((r, i) => {
    const url = String(r[0] || '').trim();
    if (!url) return;
    let platform = '', id = '';
    let m;
    if ((m = url.match(/tiktok\.com\/.*\/video\/(\d+)/))) { platform = 'tiktok'; id = m[1]; }
    else if ((m = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([^/?#]+)/))) { platform = 'instagram'; id = m[1]; }
    else if (/facebook\.com|fb\.watch/.test(url)) platform = 'facebook';
    else if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/))) { platform = 'youtube'; id = m[1]; }
    else if (/youtu/.test(url)) platform = 'youtube';
    else platform = 'other';
    if (!r[1]) sh.getRange(i + 2, 2).setValue(platform);
    if (id) out[id] = { url: platform === 'youtube' ? url : url.split('?')[0], platform, edition: String(r[2] || '').trim(), known: known.has(id) };
  });
  return out;
}

function ownHandles_(platform) {
  const sh = sheet_(TABS.own, OWN_HEADERS);
  if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues()
    .filter(r => String(r[0]).toLowerCase() === platform).map(r => String(r[1]).replace(/^@/, '').toLowerCase());
}

/* ---------------- Steam reviews ----------------
 * All user reviews of Endix, newest first. Each review goes to the edition whose window contains its date.
 * Column K (Show) is your choice: TRUE = always on the report page, FALSE = never. Empty = the report picks
 * from the Suggested ones (recommended, readable length). Votes are refreshed for reviews seen again. */
function collectSteamReviews() {
  const sh = sheet_(TABS.reviews, REVIEW_HEADERS);
  const eds = editions_();
  const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, REVIEW_HEADERS.length).getValues() : [];
  const index = {};
  data.forEach((r, i) => { index[String(r[0])] = i; });
  const first = data.length === 0;
  const now = new Date();
  let cursor = '*', pages = 0, added = 0, updated = 0;
  while (pages < (first ? 60 : 10)) {
    const url = 'https://store.steampowered.com/appreviews/' + STEAM_APP_ID + '?json=1&filter=recent&language=all&purchase_type=all'
      + '&num_per_page=100&cursor=' + encodeURIComponent(cursor);
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    pages++;
    if (res.getResponseCode() !== 200) { log_('steam reviews', 'Steam answered ' + res.getResponseCode() + ', will try again next run'); break; }
    const j = JSON.parse(res.getContentText() || '{}');
    const list = j.reviews || [];
    let seen = 0;
    list.forEach(v => {
      const id = String(v.recommendationid);
      const helpful = Number(v.votes_up || 0);
      if (id in index) { data[index[id]][6] = helpful; seen++; updated++; return; }
      const posted = new Date(Number(v.timestamp_created) * 1000);
      const text = String(v.review || '').trim();
      const hours = Math.round(Number((v.author || {}).playtime_forever || 0) / 6) / 10;
      const good = v.voted_up && text.length >= 40 && text.length <= 400;
      data.push([id, editionFor_(eds, posted), posted, v.language || '', !!v.voted_up, hours, helpful, text.slice(0, 2000),
        'https://steamcommunity.com/profiles/' + (v.author || {}).steamid + '/recommended/' + STEAM_APP_ID + '/', good ? 'great' : '', '', now]);
      index[id] = data.length - 1;
      added++;
    });
    // stop when Steam has no more pages, or once a whole page was already known (we are caught up)
    if (!list.length || !j.cursor || j.cursor === cursor || (!first && seen === list.length)) break;
    cursor = j.cursor;
    Utilities.sleep(1000);
  }
  if (data.length) {
    sh.getRange(2, 1, data.length, REVIEW_HEADERS.length).setValues(data);
    sh.getRange(2, 3, data.length, 1).setNumberFormat('yyyy-mm-dd');
  }
  log_('steam reviews', `pages ${pages}, new reviews ${added}, refreshed ${updated}`);
}

/* ---------------- Twitch ---------------- */
// Runs every 15 min but only does work from 1 day before an event until 2 days after it.
function twitchPoll() {
  const now = Date.now();
  const ed = editions_().find(e => e.active && now >= e.eventStart.getTime() - 864e5 && now <= e.eventEnd.getTime() + 3 * 864e5);
  if (!ed) return;
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty('TWITCH_CLIENT_ID')) return;
  const gid = twitchGameId_();
  if (!gid) { log_('twitch', 'No Twitch category named "' + twitchGameName_() + '"'); return; }
  const rows = [];
  let cursor = '';
  const t = new Date();
  do {
    const res = twitchGet_('streams?first=100&game_id=' + gid + (cursor ? '&after=' + cursor : ''));
    (res.data || []).forEach(s => rows.push([t, ed.slug, s.id, s.user_login, s.user_name, s.language, s.viewer_count, s.title, new Date(s.started_at)]));
    cursor = res.pagination && res.pagination.cursor;
  } while (cursor && rows.length < 1000);
  if (rows.length) {
    const sh = sheet_(TABS.twitch, TWITCH_HEADERS);
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, TWITCH_HEADERS.length).setValues(rows);
  }
}

function twitchGameName_() { return PropertiesService.getScriptProperties().getProperty('TWITCH_GAME_NAME') || 'Endix'; }
function twitchGameId_() {
  const p = PropertiesService.getScriptProperties();
  const cached = p.getProperty('twitch_game_id');
  if (cached) return cached;
  const res = twitchGet_('games?name=' + encodeURIComponent(twitchGameName_()));
  const id = res.data && res.data[0] && res.data[0].id;
  if (id) p.setProperty('twitch_game_id', id);
  return id;
}
function twitchToken_() {
  const cache = CacheService.getScriptCache();
  const hit = cache.get('twitch_token');
  if (hit) return hit;
  const p = PropertiesService.getScriptProperties();
  const r = UrlFetchApp.fetch('https://id.twitch.tv/oauth2/token', {
    method: 'post', muteHttpExceptions: true,
    payload: { client_id: p.getProperty('TWITCH_CLIENT_ID'), client_secret: p.getProperty('TWITCH_CLIENT_SECRET'), grant_type: 'client_credentials' },
  });
  if (r.getResponseCode() !== 200) throw new Error('Twitch token rejected (' + r.getResponseCode() + ')');
  const tok = JSON.parse(r.getContentText()).access_token;
  cache.put('twitch_token', tok, 3 * 3600);
  return tok;
}
function twitchGet_(path) {
  const p = PropertiesService.getScriptProperties();
  const r = UrlFetchApp.fetch('https://api.twitch.tv/helix/' + path, {
    headers: { 'Client-Id': p.getProperty('TWITCH_CLIENT_ID'), Authorization: 'Bearer ' + twitchToken_() }, muteHttpExceptions: true,
  });
  if (r.getResponseCode() !== 200) throw new Error('Twitch API ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 150));
  return JSON.parse(r.getContentText());
}

/* ---------------- helpers ---------------- */
function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function log_(who, msg) {
  const sh = sheet_(TABS.log, ['Time', 'Collector', 'Message']);
  sh.insertRowAfter(1);
  sh.getRange(2, 1, 1, 3).setValues([[new Date(), who, msg]]);
}
function d_(s) { return new Date(s + 'T00:00:00'); }
function endOfDay_(d) { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }
function num_(v) { return v == null ? '' : Number(v); }
function text_(el, name) { const c = el.getChild(name); return c ? c.getText().trim() : ''; }
function host_(u) { const m = String(u).match(/^https?:\/\/([^/]+)/i); return m ? m[1].replace(/^www\./, '').toLowerCase() : ''; }
function norm_(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
function isoDur_(s) {
  const m = String(s || '').match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
}
