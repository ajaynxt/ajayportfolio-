# Security Plan

## Project

- Name: Ajay Saini Portfolio
- Date: 2026-08-16
- Owner: Ajay Saini
- Reviewer: Codex
- Risk class: S2 Business
- Environments: local development and GitHub Pages production

## Architecture

- Frontend: Static HTML, CSS and vanilla JavaScript
- Backend/API: None
- Authentication: None
- Database/storage: None; the booking form does not persist data
- External services: Google Drive video embeds, Fontshare fonts and WhatsApp handoff
- Hosting/VPS/CDN/WAF: GitHub Pages with the `ajaynxt.com` custom domain
- CI/CD: GitHub repository and Pages publishing workflow/configuration
- Monitoring/logging: GitHub Pages/platform status only; no application logging
- Backup/recovery: Git history plus a packaged release ZIP; rollback to a known-good commit

## Sensitive assets

| Asset/data | Classification | Stored where | Who can access | Retention |
|---|---|---|---|---|
| Booking name, project details, preferred date/time and budget | Personal/business contact data | Browser memory until WhatsApp opens; then handled by WhatsApp | Visitor and Ajay Saini | Not stored by this website |
| Phone number and email displayed on the site | Public business contact data | Static source | Public | Until owner changes it |
| Repository and custom-domain settings | Administrative | GitHub account | Repository owner/admin | Account lifetime |

## Trust boundaries and public entry points

| Boundary/endpoint | Untrusted input | Authentication | Authorization | Validation/rate limit |
|---|---|---|---|---|
| Public portfolio pages | URL fragments and browser state | None | Public by design | No dynamic HTML generation |
| Book-a-call form | Name, date, time, service, currency, budget and project text | None | Public by design | Required fields, type/range/length limits, encoded WhatsApp handoff |
| Google Drive film modal | Fixed `data-video` URLs in checked-in HTML | None | Public links | JavaScript allowlists HTTPS, hostname and preview-path format |
| External project/social links | Fixed checked-in URLs | None | Public links | HTTPS links with `noopener noreferrer` |
| GitHub Pages deployment | Repository changes | GitHub account | Repository owner/admin | Account security and branch/deployment controls |

## Security controls

| Control ID | Applicable | Implementation | Verification | Owner |
|---|---:|---|---|---|
| AJX-IV-01 | Yes | HTML constraints and client-side validation with maximum lengths/ranges | Boundary and malformed-input tests | Ajay Saini |
| AJX-IV-02 | Yes | User content is read as strings, inserted with `textContent`, and URL-encoded | DOM sink review and form test | Ajay Saini |
| AJX-SC-01 | Yes | No API keys, tokens or secrets are required or stored | Repository secret scan | Ajay Saini |
| AJX-CR-01 | Yes | GitHub Pages HTTPS and upgrade-insecure CSP directive | Verify on the production domain | Ajay Saini |
| AJX-HD-01 | Partly | CSP meta restricts scripts, styles, fonts, frames, objects and base URLs | Browser console and CSP behavior check | Ajay Saini |
| AJX-HD-02 | Partly | Referrer policy is set in markup; response headers depend on GitHub Pages | Verify production response headers | Ajay Saini |
| AJX-ER-01 | Yes | Invalid video URLs fail closed and invalid forms stay local | Negative interaction tests | Ajay Saini |
| AJX-SW-01 | Yes | No runtime package dependencies; Vite is pinned as a development-only build tool with a lockfile | `npm audit` and dependency/source review | Ajay Saini |
| AJX-CI-01 | Yes | Deployment access remains in the GitHub account/repository | Review GitHub account and Pages settings | Ajay Saini |
| AJX-LG-02 | Yes | Site has no application logs and does not log form values | Source review | Ajay Saini |
| AJX-AU/AC/SE | No | No accounts, sessions, roles or protected actions exist | Architecture review | Ajay Saini |
| AJX-DB/API/UP/SSRF | No | No database, API, file upload or user-supplied outbound URL feature exists | Architecture and source review | Ajay Saini |

## Release gates

- [x] Threat model complete
- [x] No known plaintext secrets
- [x] Authentication and authorization tests marked inapplicable
- [x] Injection/XSS/CSRF/SSRF/upload checks completed as applicable
- [x] Dependency review: zero runtime dependencies; Vite development dependency audited
- [ ] Headers/TLS checked on the final hosted domain
- [x] Logging/alerts documented as platform-only
- [x] Backup and rollback approach documented
- [ ] Residual risks accepted by the owner
