# Security Verification Report

## Release summary

- Project: Ajay Saini Portfolio
- Version: 1.0.0 redesign
- Date: 2026-08-16
- Risk class: S2 Business
- Scope: `index.html`, `projects.html`, `404.html`, `styles.css`, `script.js`, public assets, Vite build configuration and GitHub Pages domain files
- Decision: Source and production build are ready for owner review. Publishing remains conditional on the production-domain checks listed below.

## Architecture and data handling

The website is static and has no backend, account system, database, analytics or application logs. The booking form keeps visitor-entered details in the browser and uses them only to prepare a voluntary WhatsApp message. No booking data is stored by the website.

Third-party origins are limited to Fontshare for fonts, Google Drive for the nine selected video previews, WhatsApp for booking handoff and the explicitly linked project/social destinations.

## Verification results

| Check | Result | Evidence |
|---|---|---|
| JavaScript syntax | Pass | `npm run check` completed successfully |
| Production build | Pass | Vite 8.2.1 generated all three pages, CSS, JavaScript, manifest and assets |
| Dependency audit | Pass | `npm audit` reported 0 vulnerabilities |
| HTML and asset integrity | Pass | Local assets resolved; IDs were unique; images had alt text and dimensions; form controls had labels |
| External-tab protection | Pass | All `_blank` links use `noopener noreferrer` |
| Repository secret scan | Pass | No credentials, API keys, tokens or passwords found in application source |
| Visible brand rule | Pass | No visible `AJAYNXT`/`AJAY NXT` brand string in the delivered pages |
| Project and film inventory | Pass | 5 homepage project cards, 25 archive demos and 9 film cards |
| Browser layout smoke test | Pass | Desktop preview loaded at 1363×936 without horizontal overflow |
| Film modal | Pass | Allowed Google Drive preview opened; title/focus were set; closing removed the iframe source |
| Project filters | Pass | Healthcare filter showed 5 of 25 archive cards without overflow |
| Reduced motion and keyboard focus | Pass by source review | Reduced-motion override, visible `:focus-visible`, Escape handling and focus restoration are present |

## Manual triage of automated pattern matches

The repository triage script reported three `SQL_STRING_CONCAT` pattern matches in `script.js`. All are false positives:

- `filmIndex + 1` is arithmetic used by the video carousel.
- The two template strings are DOM selectors built from fixed, checked-in form element IDs.
- The website has no SQL library, query execution path, backend or database.

No remediation is required for those matches.

## Controls confirmed

- Booking fields have required, length, range and type constraints with encoded WhatsApp output.
- User-entered values are never assigned through `innerHTML` or another HTML execution sink.
- Google Drive iframe URLs fail closed unless they use HTTPS, the exact `drive.google.com` host and the expected preview path.
- Content Security Policy restricts scripts, styles, fonts, frames, objects, base URLs and form actions.
- The referrer policy is set to `strict-origin-when-cross-origin`.
- External links opened in a new tab cannot access the opener.
- No local storage, session storage, cookies or application logging are used.
- There are zero runtime package dependencies. Vite is pinned as a development-only dependency with `package-lock.json`.

## Checks required after publishing

- Confirm `https://ajaynxt.com` serves the new build and redirects HTTP to HTTPS.
- Confirm the certificate, custom-domain mapping and GitHub Pages HTTPS enforcement.
- Inspect production response headers; GitHub Pages may not support every header available in server-managed hosting.
- Open each Google Drive video as a signed-out visitor and confirm it is intentionally public.
- Submit one owner-approved test booking and confirm WhatsApp formatting and timezone text.
- Verify the repository owner account has MFA, recovery codes and restricted write access.

## Residual risk and rollback

Public business contact details may receive spam, and third-party fonts/videos remain subject to their providers' privacy and availability. GitHub account or repository compromise could replace both content and client-side controls. Mitigate with MFA, least-privilege repository access and protected deployment settings.

Before publishing, retain the previous known-good Git commit or release ZIP. If the release fails, restore the prior commit and redeploy GitHub Pages. Do not enable HSTS preload until HTTPS and subdomain coverage are independently verified.
