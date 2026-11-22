# SIDRENX — Siddharth Patil's Portfolio

Personal portfolio of **Siddharth Patil**, also known online as **SIDRENX**. Built with plain HTML, CSS, and JavaScript. No frameworks or build step.

## Files

- `index.html` — page structure, biography, SEO metadata, and ProfilePage/Person structured data
- `style.css` — theme variables, layout, and responsive styles
- `script.js` — scroll reveal, reading progress bar, active navigation, custom cursor, and copy-email button
- `favicon.svg` — vector SIDRENX site icon
- `robots.txt` — allows search crawlers and points to the sitemap
- `sitemap.xml` — lists the canonical homepage URL
- `google2ac679faf02f406a.html` — Google Search Console ownership verification file; **keep this file in the site root**

## Run locally

Open `index.html` directly or run a local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating content

- Biography and facts: edit the `#about` section in `index.html`.
- Projects: replace the `.empty-projects` block in `#work` with real project cards when ready. Do not publish placeholder or made-up projects.
- Colors and fonts: edit the CSS variables at the top of `style.css`.
- SEO identity: keep the HTML title, visible H1, meta description, and JSON-LD Person name consistent with the real public name **Siddharth Patil** and handle **SIDRENX**.

## Publish with Git

```bash
git add index.html README.md robots.txt sitemap.xml google2ac679faf02f406a.html
git commit -m "Improve portfolio SEO and add sitemap"
git push origin main
```

Keep the Google verification file at the repository root so Search Console ownership remains verified.

## Search Console checklist

1. Open URL Inspection for `https://sidrenx.github.io/` and run **Test Live URL**.
2. If the live test passes, request indexing.
3. Open **Sitemaps** in Search Console and submit `sitemap.xml`.
4. After Google recrawls the page, monitor the Performance report for queries such as `Siddharth Patil` and `SIDRENX`.

Search engines decide whether and where to show pages. Accurate identity signals and a sitemap help discovery, but no markup or keyword guarantees a ranking for broad searches such as `Siddharth`.
