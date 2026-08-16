# Ajay Saini Portfolio

A responsive static portfolio for `ajaynxt.com`, built with semantic HTML, modern CSS and vanilla JavaScript.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run check
npm run build
```

The deployable output is generated in `dist/`. The root `CNAME` is preserved as `ajaynxt.com` for GitHub Pages.

## Main files

- `index.html` - portfolio homepage
- `projects.html` - filtered archive of 25 live demos
- `styles.css` - responsive design system
- `script.js` - navigation, motion, film modal, filtering and WhatsApp booking
- `CNAME` - custom-domain mapping
- `SECURITY_PLAN.md`, `THREAT_MODEL.md`, `SECURITY_REPORT.md` - security decisions and verification

The booking form stores no data on the site. Validated details are encoded into a visitor-initiated WhatsApp message.
