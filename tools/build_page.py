"""Builds index.html (hosted: YouTube aftermovie and X posts embedded) from data/report_data.json."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = open(os.path.join(ROOT, 'data', 'report_data.json'), encoding='utf-8').read().replace('</', '<\\/')
t = open(os.path.join(ROOT, 'tools', 'report_template.html'), encoding='utf-8').read()
assert '/*DATA*/' in t and '/*HOSTED*/false' in t
html = t.replace('/*DATA*/', d, 1).replace('/*HOSTED*/false', 'true', 1)
html = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        + html.replace('</style>', '</style>\n</head><body>', 1) + '\n</body></html>')
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
print('ok index.html', len(html))
