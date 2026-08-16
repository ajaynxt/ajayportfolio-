# Threat Model

## Scope

- System/version: Ajay Saini Portfolio, 2026 redesign
- Date: 2026-08-16
- Participants: Ajay Saini and Codex
- In scope: Static pages, browser interactions, booking-to-WhatsApp handoff, video embeds, external links, assets and GitHub Pages delivery
- Out of scope: WhatsApp, Google Drive and Fontshare internal security; DNS registrar controls; GitHub account configuration outside this repository

## Roles

| Role | Intended permissions | High-impact actions |
|---|---|---|
| Public visitor | View pages, filter projects, watch public videos and prepare a WhatsApp booking | Send voluntarily entered details to Ajay via WhatsApp |
| Repository owner | Change source, links, domain and deployment | Publish or roll back the website |

## Components and trust boundaries

```text
[Visitor browser] -> [GitHub Pages / custom domain] -> [Static HTML, CSS, JavaScript]
        |                         |
        |                         -> [Fontshare font files]
        -> [Google Drive video frame]
        -> [WhatsApp booking handoff]
        -> [External project and social websites]

[GitHub owner account] -> [Repository / Pages deployment] -> [Production site]
```

## Abuse cases

| ID | Attacker goal | Entry point | Impact | Likelihood | Controls | Test | Residual risk |
|---|---|---|---|---|---|---|---|
| TM-01 | Inject script or markup through booking fields | Book-a-call form | Medium | Possible | No `innerHTML`; output is URL-encoded; strict length/range validation | Submit HTML/script-like input and inspect DOM/URL | WhatsApp displays user-supplied text as message content |
| TM-02 | Make the site frame an untrusted URL | Film card data attribute | Medium | Unlikely | Fixed source data plus HTTPS/hostname/path allowlist | Replace URL locally and confirm modal stays closed | Repository compromise could change both control and data |
| TM-03 | Take over navigation through a new tab | Project/social links | Low | Possible | `noopener noreferrer` on external targets | Inspect all `_blank` links | External destinations remain outside site control |
| TM-04 | Publish malicious code by compromising deployment access | GitHub account/repository | High | Possible | Owner-only access, MFA/rules recommended, Git history rollback | Review account and Pages permissions | Account controls require owner action outside source |
| TM-05 | Track visitors or serve altered third-party resources | Fonts or embedded videos | Medium | Possible | Minimal third parties and restrictive CSP origins | Review network origins and CSP console | Third-party availability/privacy cannot be fully controlled |
| TM-06 | Expose booking data through site storage/logs | Booking form | Medium | Unlikely | No backend, analytics, local storage or logging; explicit privacy note | Search source and browser storage | WhatsApp retains messages under its own policies |
| TM-07 | Abuse public phone/email with spam | Published contact details | Low | Likely | Business contact details only; no hidden personal data | Content review | Public portfolio contact channels are inherently discoverable |

## Security assumptions

| Assumption | How verified | What happens if false |
|---|---|---|
| GitHub Pages serves the custom domain over valid HTTPS | Production TLS check after deployment | Do not enable HSTS/preload; fix DNS/Pages configuration first |
| Google Drive links remain intentionally public | Open each selected film as a visitor | Remove any link that requires unintended access or exposes private content |
| GitHub owner account uses MFA and recovery controls | Owner verifies account settings | Deployment takeover risk remains high until corrected |
| Form data is needed only for WhatsApp contact | Source review and product requirement | Add a reviewed backend/privacy/retention design before storing data |

## Decisions

| Decision | Reason | Tradeoff | Reviewer/date |
|---|---|---|---|
| Keep the site static | Smaller attack surface and simple GitHub Pages hosting | No server-confirmed calendar availability |
| Send bookings through WhatsApp | Matches the owner workflow and avoids a contact database | Booking is not automatic and depends on WhatsApp |
| Use icon-based project cards | Meets the design request and avoids untrusted/screenshotted media | Less visual preview before opening a demo |
| Restrict video frames to Google Drive previews | Preserves the nine selected videos | Google Drive remains a third-party dependency |

