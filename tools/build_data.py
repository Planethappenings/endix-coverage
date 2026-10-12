"""Turn the Endix X-statistik sheet dump into report data (data/report_data.json).

Input : data/sheet_dump.json  (spreadsheets.get with grid data for the collector + Grok tabs)
Output: data/report_data.json
Rules that change event to event live in CONFIG below (blocklists, static Steam/Twitch numbers, aftermovies).
"""
import json, re, sys, os, datetime as dt
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from urllib.parse import urlparse

DUMP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'data', 'sheet_dump.json')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'data', 'report_data.json')

CONFIG = {
    # YouTube channels / names that are not about the expo (people, music and channels that share the name)
    'yt_block_channels': {'@endix tube', 'endika parimbawa', 'hilaldeep', 'endix', 'endix_playz', 'itzendix', 'crnovyy', '18 red boss', 'reaper gaming-தமிழ்'},
    'press_channels': {'ign', 'gametrailers', 'insider gaming', 'indie-cent exposure', 'frikiup patch notes — noticias gamer', 'revista grind'},
    'press_block_domains': {'x.com', 'finance.yahoo.com', 'uk.finance.yahoo.com', 'hk.finance.yahoo.com', 'store.steampowered.com', 'youtu.be', 'youtube.com'},
    'social_block_handles': set(),
    # X posts hidden from the page: whole accounts (lower-case @handle) or single post IDs (duplicates)
    'x_hide_authors': {'@oursnet'},
    'x_hide_ids': {'2058216440541348164'},
    'editions': {
        'spring2026': {
            'aftermovie': 'https://www.youtube.com/watch?v=DDZxxjYXfSg',
            'x_tab': 'Endix Spring 2026',
            'downloads': '11,000+',
            'twitch': {'source': 'SullyGnome', 'url': 'https://sullygnome.com/game/endix/2026may', 'hours_watched': 29200, 'hours_streamed': 623, 'streamers': 241, 'peak_viewers': 2900,
                       'avg_viewers': 40, 'viewer_ratio': 46.8,
                       # concurrent viewers across all Endix streams, every 3 hours (read from SullyGnome's weekend graph)
                       'timeline': {'labels': ['Sat 12AM','Sat 3AM','Sat 6AM','Sat 9AM','Sat 12PM','Sat 3PM','Sat 6PM','Sat 9PM','Sun 12AM','Sun 3AM','Sun 6AM','Sun 9AM','Sun 12PM','Sun 3PM','Sun 6PM','Sun 9PM','Mon 12AM','Mon 3AM','Mon 6AM'],
                                    'peak': [20,150,520,2040,1170,790,1450,830,520,715,260,885,1150,320,1000,2630,260,30,0],
                                    'avg':  [15,120,400,1490,1000,650,1180,700,430,560,200,700,930,260,800,2100,200,20,0]},
                       'languages': [['English', 135], ['Spanish', 37], ['Portuguese', 23], ['French', 13], ['Russian', 10], ['Polish', 6], ['German', 5], ['Italian', 4]]},
            'steam': {'impressions': 6128795, 'reads': 71791, 'growth': [['Winter 2025 vs Spring 2025', '+100.8%'], ['Spring 2026 vs Winter 2025', '+30.2%']],
                      'note': 'Unique impressions and reads across all Endix Steam events to date.',
                      # Per-event values read off the old Lovable chart (reads derived from the total and the growth rates). Replace with exact Steamworks numbers when available.
                      'events': [
                          {'name': 'Endix Spring 2025', 'url': 'https://store.steampowered.com/curator/45584116/sale/EndixIndieShowcase', 'impressions': 1250000, 'reads': 12768},
                          {'name': 'Endix Winter 2025', 'url': 'https://store.steampowered.com/curator/45584116/sale/EndixShowcase', 'impressions': 2790000, 'reads': 25639},
                          {'name': 'Endix Spring 2026', 'url': 'https://store.steampowered.com/curator/45584116-Endix-Indie-Showcase/sale/endixmay2026', 'impressions': 2088795, 'reads': 33384},
                      ]},
            'sponsor': 'Alienware sponsored the Endix Climb Trial and Endix Maze mini-games.',
            'testimonials': [  # partner and exhibitor quotes, shown under Meet the exhibitors
                {'text': 'I love conventions, but I do love my gamer cave even more. With Endix, I can have both combined! Genuinely such a unique, creative, and fun solution to the question of what the future of game showcases will look like.',
                 'name': 'Golnaz Eftekhari', 'company': 'THQ Nordic', 'logo': 'assets/logo-thq-nordic.png'},
                {'text': 'To be part of Endix was a great deal of fun, both to be at the booth to meet the fans & on the opening day meeting the press. The idea that you can run a booth at a convention from home is a real game changer, looking forward to seeing how Endix evolves!',
                 'name': 'Christopher Lewis', 'company': 'Frozen District', 'logo': 'assets/logo-frozen-district.png'},
                {'text': 'Endix Showcase was a genuinely fun and interactive experience. Combined with excellent Alienware visibility and flawless execution, Endix created an engaging environment that kept attendees actively involved throughout the event.',
                 'name': 'Marek Gabonay', 'company': 'Alienware', 'logo': 'assets/logo-alienware.png'},
            ],
            'quotes': [  # verbatim pull quotes, each linked to its article
                {'text': 'Endix makes the demo experience feel like it should have always been this simple.', 'outlet': 'Yardbarker', 'url': 'https://www.yardbarker.com/entertainment/articles/join_me_at_endix_may_2026_the_free_digital_gaming_expo_changing_how_we_convention/s1_17456_43875324'},
                {'text': 'The potential, with this level of execution, is insane.', 'outlet': 'Indie-cent Exposure', 'url': 'https://www.indie-exposure.com/top-picks-from-endix-2026/'},
                {'text': 'Endix may offer one of the more unique experiences of the showcase season.', 'outlet': 'Insider Gaming', 'url': 'https://insider-gaming.com/endix-showcase-playable-virtual-gaming-event/'},
                {'text': 'One of the most ambitious and accessible virtual gaming showcases on the internet.', 'outlet': 'Indiecator', 'url': 'https://indiecator.org/2026/05/18/endix-digital-expo-2026-returns-in-may/'},
                {'text': 'It feels like someone mashed up a traditional expo with a multiplayer hub world, and the result is surprisingly immersive.', 'outlet': 'Yardbarker', 'url': 'https://www.yardbarker.com/entertainment/articles/join_me_at_endix_may_2026_the_free_digital_gaming_expo_changing_how_we_convention/s1_17456_43875324'},
                {'text': 'More importantly, it shows what a gaming expo can be.', 'outlet': 'Indie-cent Exposure', 'url': 'https://www.indie-exposure.com/endix-first-impressions/'},
                {'text': 'A virtual gaming expo with huge PlayStation Home energy.', 'outlet': 'GameSpew', 'url': 'https://www.gamespew.com/2026/05/endix-2026/'},
                {'text': 'Each iteration of Endix feels bigger, more polished, and more confident.', 'outlet': 'Yardbarker', 'url': 'https://www.yardbarker.com/entertainment/articles/join_me_at_endix_may_2026_the_free_digital_gaming_expo_changing_how_we_convention/s1_17456_43875324'},
                {'text': 'ENDIX is so good, and honestly, I want to see it grow and frankly, grow with it.', 'outlet': 'Indie-cent Exposure', 'url': 'https://www.indie-exposure.com/top-picks-from-endix-2026/'},
                {'text': 'Endix Is Turning Digital Game Showcases Into a Playable Experience.', 'outlet': 'Insider Gaming', 'url': 'https://insider-gaming.com/endix-showcase-playable-virtual-gaming-event/'},
                {'text': 'The strongest part of ENDIX is the event’s accessibility.', 'outlet': 'Screen Hype', 'url': 'https://www.screenhype.co.uk/endix-2026-the-future-of-gaming-conventions-is-accessible/'},
                {'text': 'It is easy, fast, and surprisingly social.', 'outlet': 'Yardbarker', 'url': 'https://www.yardbarker.com/entertainment/articles/join_me_at_endix_may_2026_the_free_digital_gaming_expo_changing_how_we_convention/s1_17456_43875324'},
                {'text': 'No expensive tickets. No travel. No hotel bookings.', 'outlet': 'Indie-cent Exposure', 'url': 'https://www.indie-exposure.com/endix-first-impressions/'},
                {'text': 'ENDIX absolutely has its own charm.', 'outlet': 'GameSpew', 'url': 'https://www.gamespew.com/2026/05/endix-2026/'},
                {'text': 'The event feels like it is growing in the right direction.', 'outlet': 'Screen Hype', 'url': 'https://www.screenhype.co.uk/endix-2026-the-future-of-gaming-conventions-is-accessible/'},
                {'text': 'ENDIX presents an opportunity for developers and players to interact through digital worlds, and I’m here for it.', 'outlet': 'Indiecator', 'url': 'https://indiecator.org/2026/05/18/endix-digital-expo-2026-returns-in-may/'},
            ],
        },
        'winter2026': {'aftermovie': None, 'x_tab': 'Endix Fall 2026', 'downloads': None, 'twitch': None, 'steam': None, 'sponsor': None, 'quotes': []},
    },
}

# ---------------------------------------------------------------- load
dump = json.load(open(DUMP))
S = {}
for s in dump['sheets']:
    S[s['properties']['title']] = [[c.get('formattedValue', '') for c in (r.get('values') or [])]
                                   for d in s.get('data', []) for r in (d.get('rowData') or [])]

SV_HINT = re.compile(r"[åäöÅÄÖ]|\b(och|att|var|som|har|ska|med|för|säger|vill|hans|hennes|tipsar|citerar)\b", re.I)
def x_text(s):
    """Grok writes Swedish notes; the public page shows English only."""
    s = (s or '').strip()
    q = re.findall(r'[”“"]([^”“"]{8,})[”“"]', s)
    if q:
        return '“' + max(q, key=len).strip().rstrip('.') + '”'
    for pre, lab in (('Delar artikel:', 'Shared article: '), ('Utdrag:', ''), ('Nyhet:', '')):
        if s.startswith(pre):
            rest = re.sub(r'\s*[–-]?\s*\([^)]*\)', '', s[len(pre):]).strip()
            if not SV_HINT.search(rest):
                return lab + rest
    return 'Post mentioning @Endix_Expo' if (not s or SV_HINT.search(s)) else s

def table(name, header_row=0, header_hint=None):
    rows = S.get(name, [])
    if header_hint:  # Grok sometimes adds title rows above the header
        header_row = next((i for i, r in enumerate(rows) if header_hint in r), header_row)
    if len(rows) <= header_row: return []
    h = rows[header_row]
    return [dict(zip(h, r + [''] * (len(h) - len(r)))) for r in rows[header_row + 1:] if any(r)]

def num(v):
    s = re.sub(r'[^\d.\-]', '', str(v or '').replace(',', '.').replace(' ', '').replace('\xa0', ''))
    if s.count('.') > 1 or (s.count('.') == 1 and len(s.split('.')[1]) == 3): s = s.replace('.', '')
    try: return float(s) if s else 0.0
    except ValueError: return 0.0

def day(v):
    m = re.match(r'(\d{4}-\d{2}-\d{2})', str(v or ''))
    return m.group(1) if m else ''

def host(u):
    try: return urlparse(u).netloc.lower().replace('www.', '')
    except Exception: return ''

def norm(s):
    return re.sub(r'[^\w]+', ' ', str(s or '').lower()).strip()

editions = []
for e in table('Editions'):
    if not e.get('Slug'): continue
    editions.append({'slug': e['Slug'], 'name': e['Edition'], 'start': day(e['Event start']), 'end': day(e['Event end']),
                     'from': day(e['Window start']), 'to': day(e['Window end'])})

def edition_for(date):
    for e in editions:
        if date and e['from'] <= date <= e['to']: return e['slug']
    return ''

# ---------------------------------------------------------------- country / language
TLD = {'jp': 'Japan', 'br': 'Brazil', 'it': 'Italy', 'es': 'Spain', 'fr': 'France', 'de': 'Germany', 'nl': 'Netherlands', 'pl': 'Poland',
       'se': 'Sweden', 'co': 'Colombia', 'pt': 'Portugal', 'hr': 'Croatia', 'gr': 'Greece', 'kr': 'South Korea', 'tw': 'Taiwan', 'au': 'Australia',
       'uk': 'UK', 'cn': 'China', 'mx': 'Mexico', 'ar': 'Argentina', 'ro': 'Romania', 'tr': 'Turkey', 'in': 'India', 'za': 'South Africa'}
IGN_SUB = {'nl': 'Netherlands', 'za': 'South Africa', 'in': 'India', 'pk': 'Pakistan', 'sea': 'Southeast Asia', 'es': 'Spain', 'fr': 'France',
           'nordic': 'Nordics', 'uk': 'UK', 'me': 'Middle East', 'it': 'Italy', 'de': 'Germany', 'jp': 'Japan', 'br': 'Brazil', 'mx': 'Mexico'}
KNOWN = {'17173.com': 'China', 'insider-gaming.com': 'UK', 'gamespew.com': 'UK', 'mcvuk.com': 'UK', 'screenhype.co.uk': 'UK', 'gamegrin.com': 'UK',
         'indie-exposure.com': 'UK', 'gamespress.com': 'UK', 'oursn.net': 'Middle East', 'gamesmarket.global': 'Germany', 'semperludo.com': 'France',
         'geek-o-polis.com': 'France', 'pixelforgegr.com': 'Greece', 'appbank.net': 'Japan', 'gamingcoffee.com': 'Mexico', 'virus.hr': 'Croatia',
         'yardbarker.com': 'USA', 'ign.com': 'USA', 'tech.yahoo.com': 'USA', 'msn.com': 'USA', 'totalapexentertainment.com': 'USA',
         'gamerheadlines.com': 'USA', 'thegg.net': 'Sweden', 'bluesnews.com': 'USA', 'kyusaimedia.com': 'UK', 'alienwarearena.com': 'USA',
         'heypoorplayer.com': 'USA', 'capsulecomputers.com.au': 'Australia', 'thethumbwars.com': 'USA', '247videogame.com': 'USA',
         'blazetrends.com': 'USA', 'biznooz.com': 'USA', 'gameshedge.com': 'UK', '4-rg.com': 'Germany', 'watermelo.com.br': 'Brazil',
         'dropthespotlight.com': 'USA', 'indiecator.org': 'UK', 'indiegamesdevel.com': 'Spain', 'cat5.pl': 'Poland', 'powerups.es': 'Spain',
         'corrierenerd.it': 'Italy', 'squared-potato.pt': 'Portugal', 'axyo.de': 'Germany', 'blansi.es': 'Spain', 'portalgeek.co': 'Colombia',
         'frikiup.co': 'Colombia', 'prtimes.jp': 'Japan', 'mainichikirei.jp': 'Japan', 'dengekionline.com': 'Japan', 'gamespark.jp': 'Japan',
         'salaodejogos.net': 'Brazil', 'gamersegames.com.br': 'Brazil', 'lumirinav.se': 'Sweden', 'spelhubben.se': 'Sweden', 'gamestic.nl': 'Netherlands'}

def country_of(url, outlet='', domain=''):
    d = domain or host(url)
    if d.endswith('ign.com'):
        sub = d.split('.')[0]
        return IGN_SUB.get(sub, 'USA')
    for k, v in KNOWN.items():
        if d == k or d.endswith('.' + k): return v
    m = re.search(r'\((Japan|MENA|NL|DE|FR|svensk)\)', outlet or '')
    if m: return {'MENA': 'Middle East', 'NL': 'Netherlands', 'DE': 'Germany', 'FR': 'France', 'svensk': 'Sweden'}.get(m.group(1), m.group(1))
    tld = d.rsplit('.', 1)[-1] if '.' in d else ''
    return TLD.get(tld, 'International')

def lang_of(text, country):
    if re.search(r'[぀-ヿ]', text): return 'Japanese'
    if re.search(r'[一-鿿]', text): return 'Chinese'
    if re.search(r'[؀-ۿ]', text): return 'Arabic'
    if re.search(r'[Ͱ-Ͽ]', text): return 'Greek'
    return {'Brazil': 'Portuguese', 'Portugal': 'Portuguese', 'Spain': 'Spanish', 'Mexico': 'Spanish', 'Colombia': 'Spanish', 'Argentina': 'Spanish',
            'France': 'French', 'Italy': 'Italian', 'Germany': 'German', 'Netherlands': 'Dutch', 'Poland': 'Polish', 'Sweden': 'Swedish',
            'Croatia': 'Croatian', 'Greece': 'Greek', 'Japan': 'Japanese', 'China': 'Chinese', 'Middle East': 'Arabic'}.get(country, 'English')

# ---------------------------------------------------------------- press
def clean_outlet(o):
    o = re.sub(r'\s*\((?:pressmeddelande|sponsor|syndikerad|enligt|delad|ingen|video|podd)[^)]*\)', '', o or '').strip()
    return o

press = {}
def add_press(item):
    nh = norm(item['headline'])[:25]
    for v in press.values():  # same outlet + same headline start = same article (dates are often missing)
        if v['domain'] == item['domain'] and (norm(v['headline'])[:25] == nh or canon(v['url']) == canon(item['url'])):
            for f in ('date', 'country', 'uvm'):
                if not v.get(f) and item.get(f): v[f] = item[f]
            v['x_views'] = max(v.get('x_views', 0), item.get('x_views', 0))
            return
    press[item['domain'] + '|' + nh] = item

def canon(u):
    return re.sub(r'^https?://(www\.)?', '', str(u or '')).split('#')[0].rstrip('/\\').lower()

REGION = {'MENA': 'Middle East', 'Arabic': 'Middle East', 'LATAM': 'Latin America'}
uvm_by_domain = {}
for r in table('Press_Manual'):
    url = r.get('URL', '').strip()
    if not url.startswith('http'): continue
    d = host(url); date = day(r.get('Published'))
    ed = r.get('Edition') or edition_for(date)
    if not ed: continue
    uvm = num(r.get('Monthly visitors'))
    if uvm: uvm_by_domain[d] = max(uvm_by_domain.get(d, 0), uvm)
    head = r.get('Headline', '').strip()
    kind = 'press release' if re.search(r'pressrelease|prtimes|press-release|release/|pr_topics|company_news|releases/', url) else 'article'
    add_press({'edition': ed, 'date': date, 'outlet': r.get('Outlet') or d, 'domain': d, 'headline': head, 'url': url,
               'country': REGION.get(r.get('Country'), r.get('Country')) or country_of(url, '', d), 'kind': kind,
               'uvm': uvm, 'x_views': 0, 'source': 'manual'})

for r in table('Press', header_hint='Artikellänk'):
    url = r.get('Artikellänk', '')
    date = day(r.get('Datum (Stockholm)'))
    if not url.startswith('http') or not edition_for(date): continue
    d = host(url)
    if d in CONFIG['press_block_domains']: continue
    outlet_raw = r.get('Outlet', '')
    kind = 'press release' if ('pressmeddelande' in outlet_raw or 'prtimes' in url) else 'sponsor' if 'sponsor' in outlet_raw else 'article'
    head = r.get('Rubrik', '')
    head = re.sub(r'^\((?:enligt adressen|rubrik saknas[^)]*)\)\s*', '', head)
    add_press({'edition': edition_for(date), 'date': date, 'outlet': clean_outlet(outlet_raw), 'domain': d, 'headline': head, 'url': url,
               'country': country_of(url, outlet_raw, d), 'kind': kind, 'x_views': num(r.get('X-visningar (summa)')), 'source': 'grok'})

trailer_pages = []
for r in table('Press_Feed'):
    date = day(r.get('Published')); ed = r.get('Edition') or edition_for(date)
    head = r.get('Headline', ''); d = (r.get('Outlet domain') or host(r.get('URL', ''))).lower()
    if not ed or d in CONFIG['press_block_domains'] or not re.search(r'endix|エンディックス', head, re.I): continue
    item = {'edition': ed, 'date': date, 'outlet': r.get('Outlet') or d, 'domain': d, 'headline': head, 'url': r.get('URL', ''),
            'country': country_of(r.get('URL', ''), '', d), 'kind': 'press release' if d in ('prtimes.jp', 'gamespress.com') else 'article',
            'x_views': 0, 'source': r.get('Feed', '')}
    if re.search(r'trailer|tráiler|bande-annonce', head, re.I) and 'showcase' in head.lower():
        trailer_pages.append(item)
        continue
    add_press(item)

# ---------------------------------------------------------------- manual links: IGN trailer pages, Facebook, other
facebook = []
for r in table('Links_Manual'):
    url = (r.get('URL') or '').strip(); plat = (r.get('Platform') or '').lower()
    if plat not in ('other', 'facebook') or not url.startswith('http'): continue
    ed = r.get('Edition (optional)') or ''
    if not ed: continue
    views = num(r.get('Views (only for Facebook/other)'))
    if plat == 'facebook':
        facebook.append({'edition': ed, 'platform': 'facebook', 'creator': r.get('Creator', ''), 'name': r.get('Creator', ''), 'url': url,
                         'date': '', 'views': views, 'likes': 0, 'caption': r.get('Note', ''), 'followers': 0})
    elif re.search(r'ign\.com', url) and 'trailer' in url:
        if any(canon(t['url']) == canon(url) for t in trailer_pages): continue
        title = re.sub(r'-', ' ', url.rstrip('/').rsplit('/', 1)[-1]).replace('endix showcase 2026', '| Endix Showcase 2026')
        d = host(url)
        trailer_pages.append({'edition': ed, 'date': '', 'outlet': r.get('Creator') or d, 'domain': d, 'headline': title.title().replace('| Endix', '| Endix'),
                              'url': url, 'country': country_of(url, '', d), 'kind': 'trailer', 'x_views': views, 'source': 'manual'})

seen_tp = {}
for t in trailer_pages:
    k = t['domain'] + '|' + norm(t['headline'])[:30]
    if k not in seen_tp: seen_tp[k] = t
trailer_pages = list(seen_tp.values())

for p in press.values():
    p['language'] = lang_of(p['headline'], p['country'])
    p['uvm'] = p.get('uvm') or uvm_by_domain.get(p['domain'], 0)

# ---------------------------------------------------------------- YouTube
# YT_Channels tab: Danne's choice in column H wins, then the suggestion in G, then the rules below
yt_cat = {}
for r in table('YT_Channels'):
    ch = (r.get('Channel') or '').strip().lower()
    c = (r.get('Category (creator / media / exclude)') or '').strip().lower() or (r.get('Suggested') or '').strip().lower()
    if ch and c in ('creator', 'media', 'exclude'): yt_cat[ch] = c

youtube = []
for r in table('YT_Videos'):
    if r.get('Status') not in ('new', 'manual'): continue
    ch = (r.get('Channel') or '').strip()
    override = yt_cat.get(ch.lower())
    if override == 'exclude' or (not override and ch.lower() in CONFIG['yt_block_channels']): continue
    title = r.get('Title', '')
    official_trailer = bool(re.search(r'official|oficial|officiel', title, re.I) and re.search(r'trailer|tráiler', title, re.I) and 'showcase' in title.lower())
    cat = override or ('media' if (ch.lower() in CONFIG['press_channels'] or official_trailer or re.search(r'trailer', ch, re.I)) else 'creator')
    youtube.append({'edition': r['Edition'], 'title': title, 'channel': ch, 'url': r['URL'], 'date': day(r['Published']),
                    'views': num(r['Views']), 'likes': num(r['Likes']), 'type': r.get('Type', ''), 'category': cat})

# ---------------------------------------------------------------- TikTok / Instagram
# "Endix" as its own word or as #endixexpo / #endixpartner / #endix2026 / @endix_expo, never inside appendix, bendix, endixg ...
ENDIX_WORD = re.compile(r'(?<![a-z0-9])endix(?:expo|partner|showcase|_expo|20\d\d)?(?![a-z0-9])', re.I)

def social(tab, platform):
    out = []
    for r in table(tab):
        if r.get('Status') in ('own', 'rejected', 'no keyword'): continue
        if r.get('Status') == 'new' and not ENDIX_WORD.search(r.get('Caption') or ''): continue
        if (r.get('Creator') or '').lower() in CONFIG['social_block_handles']: continue
        out.append({'edition': r['Edition'], 'platform': platform, 'creator': r.get('Creator', ''), 'name': r.get('Creator name', ''),
                    'url': r['URL'], 'date': day(r['Published']), 'views': num(r['Views']), 'likes': num(r['Likes']),
                    'caption': (r.get('Caption') or '')[:140], 'followers': num(r.get('Followers'))})
    return out
tiktok = social('TikTok', 'tiktok')
instagram = social('Instagram', 'instagram')

# ---------------------------------------------------------------- X comments curated by Grok (Webb_Kommentarer, visa = TRUE)
comments, press_quotes = [], []
for r in table('Webb_Kommentarer_Publik'):
    date = day(r.get('date')); ed = edition_for(date)
    if not ed or not (r.get('text') or '').strip(): continue
    if str(r.get('id', '')).startswith('press:'):  # Grok also adds verified press pull quotes here
        press_quotes.append({'edition': ed, 'text': r['text'].strip(), 'outlet': r.get('author_name', ''), 'url': r.get('url', '')})
        continue
    comments.append({'edition': ed, 'date': date, 'name': r.get('author_name', ''), 'handle': r.get('handle', ''),
                     'text': r['text'].strip(), 'url': r.get('url', ''), 'likes': num(r.get('likes'))})

# ---------------------------------------------------------------- exhibitors (Exhibitors tab: edition + store link; name/image filled by the collector)
exhibitors = []
for r in table('Exhibitors'):
    url = (r.get('Store URL (Steam or other)') or '').strip(); ed = (r.get('Edition') or '').strip()
    if not url or not ed: continue
    m = re.search(r'store\.steampowered\.com/app/(\d+)', url)
    img = (r.get('Capsule image (filled automatically)') or '').strip() or (f'https://cdn.cloudflare.steamstatic.com/steam/apps/{m.group(1)}/header.jpg' if m else '')
    if not img: continue
    exhibitors.append({'edition': ed, 'name': (r.get('Game (filled automatically)') or '').strip() or 'Exhibitor', 'url': url, 'img': img,
                       'dev': (r.get('Developer (filled automatically)') or '').strip()})

# ---------------------------------------------------------------- X (Grok tabs)
def x_stats(tab):
    rows = S.get(tab, [])
    def find(label, col_label=3, col_val=4):
        for r in rows:
            if len(r) > col_val and r[col_label].strip() == label: return r[col_val]
        return ''
    top = []
    for i, r in enumerate(rows):
        if r and r[0].startswith('Topp 10 omnämnanden'):
            for rr in rows[i + 2:i + 12]:
                if len(rr) >= 7 and rr[0][:4].isdigit():
                    if rr[1].split(' ')[0].lower() in CONFIG['x_hide_authors'] or rr[5].rstrip('/').rsplit('/', 1)[-1] in CONFIG['x_hide_ids']: continue
                    top.append({'date': rr[0][:10], 'author': rr[1], 'views': num(rr[2]), 'engagement': num(rr[3]), 'url': rr[5], 'summary': x_text(rr[6])})
            break
    return {'mentions': num(find('Omnämnanden')), 'accounts': num(find('Unika konton')), 'views': num(find('Visningar')),
            'engagement': num(find('Engagemang')), 'viral': num(find('Virala inlägg')), 'top': top}

# ---------------------------------------------------------------- assemble
out = {'generated': dt.datetime.now().strftime('%Y-%m-%d'), 'editions': []}
for e in editions:
    c = CONFIG['editions'].get(e['slug'], {})
    yt = [v for v in youtube if v['edition'] == e['slug']]
    out['editions'].append({
        **e,
        'aftermovie': c.get('aftermovie'),
        'downloads': c.get('downloads'),
        'twitch': c.get('twitch'),
        'steam': c.get('steam'),
        'sponsor': c.get('sponsor'),
        'quotes': (lambda base: base + [q for q in press_quotes if q['edition'] == e['slug'] and norm(q['text'])[:40] not in {norm(b['text'])[:40] for b in base}])(c.get('quotes', [])),
        'comments': [x for x in comments if x['edition'] == e['slug']],
        'exhibitors': [x for x in exhibitors if x['edition'] == e['slug']],
        'testimonials': c.get('testimonials', []),
        'youtube': sorted(yt, key=lambda v: -v['views']),
        'tiktok': sorted([v for v in tiktok if v['edition'] == e['slug']], key=lambda v: -v['views']),
        'facebook': [v for v in facebook if v['edition'] == e['slug']],
        'instagram': sorted([v for v in instagram if v['edition'] == e['slug']], key=lambda v: -v['views']),
        'x': x_stats(c['x_tab']) if c.get('x_tab') else None,
        'press': sorted([p for p in press.values() if p['edition'] == e['slug']], key=lambda p: p['date'], reverse=True),
        'trailer_pages': [t for t in trailer_pages if t['edition'] == e['slug']],
    })
json.dump(out, open(OUT, 'w'), ensure_ascii=False, indent=1)
for ed in out['editions']:
    print(ed['slug'], 'yt', len(ed['youtube']), int(sum(v['views'] for v in ed['youtube'])), 'tt', len(ed['tiktok']), 'ig', len(ed['instagram']),
          'press', len(ed['press']), 'countries', len({p['country'] for p in ed['press']}), 'trailerpages', len(ed['trailer_pages']),
          'x', ed['x'] and (ed['x']['mentions'], ed['x']['views'], len(ed['x']['top'])))
