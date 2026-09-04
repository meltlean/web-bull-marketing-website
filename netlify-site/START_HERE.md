# Getting your site live — no coding needed

This will take about 15 minutes the first time. After that, editing your site is as easy as filling out a form.

## Part 1: Put the files on GitHub (a free file-storage site for websites)

1. Go to https://github.com and make a free account if you don't have one.
2. Click the "+" in the top right → "New repository."
3. Name it something like `bull-marketing-website`. Keep it **Private** or **Public**, either is fine. Click "Create repository."
4. On the next page, look for a link that says "uploading an existing file." Click it.
5. Drag the **entire unzipped folder's contents** (everything inside this zip, not the zip file itself) into that upload box.
6. Scroll down, click "Commit changes." Done — your files are now on GitHub.

## Part 2: Connect it to Netlify (this makes it a live website)

1. Go to https://netlify.com and sign up (there's a "Sign up with GitHub" button — use that, it's the easiest).
2. Click "Add new site" → "Import an existing project."
3. Choose GitHub, and pick the repository you just made.
4. Netlify will auto-detect the settings (Build command: `npm run build`, Publish directory: `dist`). Just click "Deploy."
5. Wait about a minute. You'll get a random web address like `chipper-narwhal-123.netlify.app` — click it to see your live site!

## Part 3: Turn on the "edit my site" feature

This is what lets you log in and change text/prices/blog posts without touching code.

1. In your Netlify site dashboard, click **"Identity"** in the top menu, then **"Enable Identity."**
2. Still in Identity, click **"Settings and usage"** → scroll to **"Registration"** → set it to **"Invite only"** (so strangers can't sign up to your admin panel).
3. Scroll down to **"Services"** → find **Git Gateway** → click **"Enable Git Gateway."**
4. Go back to the main Identity tab and click **"Invite users."** Type in your own email address and send yourself an invite.
5. Check your email, click the invite link, and set a password.
6. Now go to `your-site-address.netlify.app/admin/` — log in with the email and password you just set.
7. You're in! You'll see a friendly panel with "Site Settings," "Pages," and "Blog Posts." Click into anything, edit the text boxes, and click the **Publish** button at the top. Your live site updates automatically within about a minute.

## Part 4: Connect your real domain (webbullmarketing.com)

1. In Netlify, go to **"Domain settings"** → **"Add a domain"** → type in `webbullmarketing.com`.
2. Netlify will show you some DNS records (a couple of lines of text/numbers).
3. Go to wherever you bought your domain (GoDaddy, Namecheap, etc.), find "DNS settings," and add the records Netlify showed you. Netlify's screen walks you through this — just follow its instructions exactly.
4. It can take anywhere from a few minutes to a few hours for the domain to fully switch over. Netlify will show a green checkmark when it's ready, and will also give you free HTTPS (the padlock) automatically.

## That's it!

From here on, to change anything on your site — prices, blog posts, your headline, adding Google Analytics, a chatbot code, whatever — just go to `webbullmarketing.com/admin/`, log in, edit, and click Publish. No code, no re-uploading files.

## If something breaks

- If the site fails to deploy on Netlify, click into the "Deploys" tab and look at the log — it'll usually say exactly what went wrong. Feel free to paste that error back to me and I'll help you fix it.
- If `/admin/` gives you a blank page or login error, double check Identity and Git Gateway are both switched on (Part 3, steps 1–3).
