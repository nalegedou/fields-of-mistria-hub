import os, glob, sys

snippet = '''
  <!-- ===== SEO / monitor placeholder (replace with real values, then push) ===== -->
  <meta name="google-site-verification" content="REPLACE_WITH_GSC_CODE">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <!-- ===== /SEO placeholder ===== -->
'''

files = sorted(glob.glob('**/*.html', recursive=True))
done = 0
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            html = fh.read()
        if 'REPLACE_WITH_GSC_CODE' in html:
            print('SKIP (already):', f)
            continue
        if '</head>' not in html:
            print('WARN no </head>:', f)
            continue
        html = html.replace('</head>', snippet + '\n</head>', 1)
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(html)
        done += 1
        print('OK injected:', f)
    except Exception as e:
        print('ERROR on', f, '->', repr(e))

print('TOTAL newly injected:', done)
sys.stdout.flush()
