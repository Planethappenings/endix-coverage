"""Builds index.html (hosted: YouTube aftermovie and X posts embedded) from data/report_data.json."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = open(os.path.join(ROOT, 'data', 'report_data.json'), encoding='utf-8').read().replace('</', '<\\/')
t = open(os.path.join(ROOT, 'tools', 'report_template.html'), encoding='utf-8').read()
assert '/*DATA*/' in t and '/*HOSTED*/false' in t
html = t.replace('/*DATA*/', d, 1).replace('/*HOSTED*/false', 'true', 1)
import json
slugs = [e['slug'] for e in json.loads(open(os.path.join(ROOT, 'data', 'report_data.json'), encoding='utf-8').read())['editions']]
# Sets <base> to the site root so the same page works at /, /spring2026/ and under /endix-coverage/ on github.io.
base_js = ('<script>(function(){var s=%s,p=location.pathname.replace(/index\\.html$/,"");var a=p.split("/");'
           'if(a.length>1&&a[a.length-1]==="")a.pop();if(s.indexOf(a[a.length-1])>-1)a.pop();'
           'var b=document.createElement("base");b.href=a.join("/")+"/";document.head.appendChild(b);})();</script>\n') % json.dumps(slugs)
html = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        + base_js + '<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png"><link rel="icon" type="image/png" sizes="512x512" href="assets/favicon-512.png"><link rel="apple-touch-icon" href="assets/apple-touch-icon.png">\n' + html.replace('</style>', '</style>\n</head><body>', 1) + '\n</body></html>')
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
for slug in slugs:  # clean per-edition URLs, e.g. /spring2026/
    os.makedirs(os.path.join(ROOT, slug), exist_ok=True)
    open(os.path.join(ROOT, slug, 'index.html'), 'w', encoding='utf-8').write(html)
print('ok index.html', len(html))

# The Creator Kit page (creators/index.html) uses the same data
import runpy; runpy.run_path(os.path.join(ROOT, 'tools', 'build_creators.py'))
