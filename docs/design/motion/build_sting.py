"""Builds sting.html from the site's built wordmark (dist/index.html). Run after `npm run build`:
python3 docs/design/motion/build_sting.py"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parents[3]
page = (root / 'dist/index.html').read_text()
svg = re.search(r'<svg class="logo"[^>]*data-tone="dark".*?</svg>', page, re.S).group(0)
svg = re.sub(r' data-astro-cid-\w+', '', svg)
pid = re.search(r'id="(logo-[^"]+)-s"', svg).group(1)
defs = re.search(r'<defs>.*?</defs>', svg, re.S).group(0)
body = svg[svg.index('</defs>') + 7:svg.rindex('</svg>')]
k = body.index(f'<g clip-path="url(#{pid}-below)"')
halves = [body[:k], body[k:]]
word = re.search(r'<path d="(M261[^"]+)"', svg).group(1)
i = word.index('M2964 -595'); j = word.index('Z', i)
word_no_dot = word[:i] + word[j + 1:]

def variant(prefix, no_dot=False):
    d = defs.replace(pid, prefix)
    hs = [h.replace(pid, prefix) for h in halves]
    if no_dot:
        hs = [h.replace(word, word_no_dot) for h in hs]
    return d, hs

dA, hA = variant('a'); dB, hB = variant('b', True); dC, hC = variant('c')
VB = 'viewBox="-30 -790 3615 860"'
tpl = (pathlib.Path(__file__).parent / 'sting.template.html').read_text()
out = (tpl.replace('{VB}', VB)
       .replace('{dA}', dA).replace('{hA0}', hA[0]).replace('{hA1}', hA[1])
       .replace('{dB}', dB).replace('{hB0}', hB[0]).replace('{hB1}', hB[1])
       .replace('{dC}', dC).replace('{hC0}', hC[0]).replace('{hC1}', hC[1]))
(pathlib.Path(__file__).parent / 'sting.html').write_text(out)
print('wrote sting.html', len(out))
