"""Builds creators/index.html (the Endix Creator Kit page) from tools/creators_template.html + data/report_data.json.

Numbers come from the latest edition that has Twitch data (the last full event); Steam reviews from all editions.
Edit CLIPS to change the six short videos (files live in assets/creators/). Run after build_data.py.
"""
import json, os, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The six short clips under "What creators said": (file stem in assets/creators/, creator, title)
CLIPS = [
    ('clip-jaffe-future', 'David Jaffe', 'On the future of expos'),
    ('clip-cohh-what-is-endix', 'CohhCarnage', 'Explains Endix'),
    ('clip-dans-dave', 'DansGaming', 'Meets Dave the Diver'),
    ('clip-jaffe-hire-me', 'David Jaffe', '“They should hire me”'),
    ('clip-cohh-avatar', 'CohhCarnage', 'Meets his Endix avatar'),
    ('clip-nyanners-booth', 'Nyanners', 'When an interactive booth attacks you'),
]
# Giveaways: fill in when ready; empty values show a tidy "details coming soon" instead of blanks.
GIVEAWAYS = {
    # image: file in assets/creators/. embed=True shows Gleam's own entry widget inside the card instead of a button.
    'alienware': {'image': '', 'specs': '', 'dates': '', 'gleam': 'https://gleam.io/ONi3k/endix-alienware-gaming-pc-giveaway',
                  'embed': True, 'embed_title': 'Endix 🫰 Alienware GAMING PC 🎮🖥️ giveaway'},
    'elgato': {'prize': '2× Elgato Stream Deck MK.2', 'image': 'elgato-giveaway.jpg', 'dates': '', 'gleam': 'https://gleam.io/jjlbM/endix-elgato-giveaway'},
}
CONTACT_EMAIL = ''  # e.g. creators@endix-expo.com; empty = no email shown

REVIEWS_SHOWN = 6
REVIEW_MAX_CHARS = 150  # short reviews read best on cards

def short(n):
    n = float(n or 0)
    if n >= 1e6: return f'{n/1e6:.1f}M'.replace('.0M', 'M')
    if n >= 1e3: return f'{n/1e3:.1f}K'.replace('.0K', 'K')
    return f'{int(n)}'

d = json.load(open(os.path.join(ROOT, 'data', 'report_data.json'), encoding='utf-8'))
eds = d['editions']
last = [e for e in eds if e.get('twitch')][-1]
yt = last['youtube']
dl = str(last.get('downloads') or '').replace(',000+', 'K+').replace(',000', 'K')
vals = {
    'n_edition': html.escape(last['name']), 'n_slug': last['slug'],
    'n_hours': short(last['twitch']['hours_watched']), 'n_streamers': f"{last['twitch']['streamers']:,}",
    'n_ytviews': short(sum(v['views'] for v in yt)), 'n_ytvideos': f'{len(yt):,}',
    'n_press': f"{len(last['press']):,}", 'n_countries': str(len({p['country'] for p in last['press']})),
    'n_impr': short((last.get('steam') or {}).get('impressions', 0)), 'n_downloads': html.escape(dl or '–'),
}
tot = sum((e.get('review_stats') or {}).get('total', 0) for e in eds)
pos = sum((e.get('review_stats') or {}).get('positive', 0) for e in eds)
vals['r_total'] = f'{tot:,}'
vals['r_pct'] = f'{round(pos / tot * 100)}%' if tot else '–'
revs = [r for e in eds for r in e.get('reviews', []) if len(r['text']) <= REVIEW_MAX_CHARS]
revs.sort(key=lambda r: (not r.get('pinned'), -r['helpful'], -r['hours']))
vals['reviews'] = ''.join(
    f'\n      <blockquote class="card" style="margin: 0; padding: 24px; font-size: 20px; line-height: 1.35; font-weight: 700; display: flex; flex-direction: column; gap: 14px">'
    f'“{html.escape(r["text"])}”<a href="{html.escape(r["url"])}" target="_blank" rel="noopener" style="margin-top: auto; font-size: 15px; font-weight: 600; color: #66c0f4; text-decoration: none">Recommended · Steam ↗</a></blockquote>'
    for r in revs[:REVIEWS_SHOWN]) + '\n    '
vals['clips'] = ''.join(
    f'\n        <figure class="clip" style="margin: 0"><video controls playsinline preload="none" poster="../assets/creators/{f}.jpg" aria-label="{html.escape(c)}: {html.escape(t)}">'
    f'<source src="../assets/creators/{f}.mp4" type="video/mp4"></video>'
    f'<figcaption class="cap"><b>{html.escape(c)}</b><span>{html.escape(t)}</span></figcaption></figure>'
    for f, c, t in CLIPS) + '\n      '

def entry(g, color):
    if g.get('embed') and g['gleam']:  # the widget is the entry form; no separate button
        return f'<span style="font-size: 16px; font-weight: 600; color: #a99dca">{html.escape(g["dates"]) or "Entries open now. Enter right here on the page."}</span>'
    out = f'<span style="font-size: 16px; font-weight: 600; color: #a99dca">{html.escape(g["dates"]) if g["dates"] else ("Entries open now" if g["gleam"] else "Entry details coming soon")}</span>'
    if g['gleam']:
        out += f'\n          <a class="btn" href="{html.escape(g["gleam"])}" target="_blank" rel="noopener" style="align-self: flex-start; margin-top: auto; background: {color}; color: #fff">Enter giveaway</a>'
    return out
def image(g, label, color):
    if g['image']:
        return f'<img src="../assets/creators/{html.escape(g["image"])}" alt="{label} giveaway prize" style="width: 100%; height: 100%; object-fit: cover; display: block">'
    return f'<span style="font-family: Orbitron, sans-serif; font-weight: 800; font-size: 15px; color: {color}; letter-spacing: .08em">{label.upper()}</span>'
aw, el = GIVEAWAYS['alienware'], GIVEAWAYS['elgato']
vals.update({
    'aw_specs': html.escape(aw['specs']) or 'A brand-new Alienware gaming PC. Full specs announced soon.',
    'aw_entry': entry(aw, '#3aa0ff'),
    'aw_flex': '1 1 100%' if aw.get('embed') and aw['gleam'] else '3 1 560px',
    # Image panel: hidden when the widget is shown and there is no prize photo yet (avoids an empty placeholder column)
    'aw_media': '' if (aw.get('embed') and aw['gleam'] and not aw['image']) else
        ('\n        <div style="flex: 1 1 280px; min-height: 320px; display: grid; place-items: center; background: repeating-linear-gradient(45deg, #182540 0 14px, #1b2a48 14px 28px); border-right: 1px solid #2c2347">\n          '
         + image(aw, 'Alienware', '#8fb6ff') + '\n        </div>'),
    'aw_widget': (f'\n        <div style="flex: 1 1 420px; padding: 24px; background: rgba(8,6,16,.45); border-left: 1px solid #2c2347; display: flex; justify-content: center">'
                  f'<div style="width: 100%; max-width: 560px"><a class="e-widget no-button" href="{html.escape(aw["gleam"])}" rel="nofollow">{html.escape(aw.get("embed_title") or "Enter the Alienware giveaway")}</a>'
                  f'<script type="text/javascript" src="https://widget.gleamjs.io/e.js" async="true"></script></div></div>')
                 if aw.get('embed') and aw['gleam'] else '',
    'el_image': image(el, 'Elgato', '#c9b8ff'), 'el_title': 'Win ' + html.escape(el['prize']) if el['prize'] else 'Win Elgato gear',
    'el_entry': entry(el, '#9c7dff'),
    'contact': (f'Questions, early access or a partnership? Reach the creator team at <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.'
                if CONTACT_EMAIL else 'Grab the kit, pick your stream day and bring your community along.'),
})
page = open(os.path.join(ROOT, 'tools', 'creators_template.html'), encoding='utf-8').read()
for k, v in vals.items():
    page = page.replace('{{' + k + '}}', v)
assert '{{' not in page, page[page.index('{{'):page.index('{{') + 40]
os.makedirs(os.path.join(ROOT, 'creators'), exist_ok=True)
open(os.path.join(ROOT, 'creators', 'index.html'), 'w', encoding='utf-8').write(page)
print('ok creators/index.html', len(page), vals['r_pct'], vals['r_total'], len(revs[:REVIEWS_SHOWN]), 'reviews')
