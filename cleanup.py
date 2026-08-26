import os, glob
d = r'C:\Users\Administrator\WorkBuddy\2026-08-25-16-57-43\site'
for name in ['inject_seo.py','seo_log.txt','diag.py','diag.txt']:
    p = os.path.join(d, name)
    if os.path.exists(p):
        os.remove(p)
        print('removed', name)
    else:
        print('absent', name)
# list remaining loose py/txt in root
left = [f for f in os.listdir(d) if f.endswith(('.py','.txt'))]
print('remaining py/txt in root:', left)
