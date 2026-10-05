# Darmigan Baskar — Personal Site

A personal portfolio with Home, Work, Projects, 3D Printing, Contact, and four static project detail pages.

## Website

https://darmigan2011-ops.github.io/-personal-profile-for-my-business-/

The site features a cinematic portrait hero, interactive Three.js sculptures, scroll reveals, project filters, keyboard-accessible dialogs, responsive navigation, and a 3D printing layer study.

## Search and sharing

Each public page has a unique title and description, an absolute canonical URL, Open Graph/card metadata, and truthful Person, Organization, WebSite, and page structured data. `sitemap.xml` lists nine canonical URLs. Old `profile.html` and `flashforce3d.html` entry points use immediate HTML redirects and destination canonicals. Portraits use responsive AVIF/WebP and the 3D module is bundled and minified. Project details and navigation remain accessible without JavaScript.

Search Console verification, Google indexing, Business Profile eligibility, and actual enquiry counts require the owner's Google account and business evidence; publishing this build alone does not establish those results.

The `portfolio:interaction` browser event provides an analytics adapter hook for email/source clicks, email-copy actions, project previews, print enquiry clicks, and draft preparation. It excludes names, email addresses, and message contents. No remote analytics provider is configured. A prepared draft is not a sent enquiry.

## Hosting

This repository contains the complete static production build. GitHub Pages publishes from `main` and the repository root. Keep the `assets/` and `vendor/` directories alongside the HTML, CSS, and JavaScript files. There is no separate custom Pages workflow.

For a local preview, serve the repository with an HTTP server, for example `python -m http.server 8000`. Open http://localhost:8000. File URLs may block JavaScript module imports.

## Contact

The contact form creates a draft in the visitor's email app and offers a Gmail-composer link. Visitors review and send the message themselves; there is no server that sends or stores enquiries.

## Content and artwork

Project descriptions come from Darmigan's public GitHub repositories. Jarvis is labeled as an early exploration because its public repository currently contains a README. Flash Force information and the public contact address come from the previously published portfolio. The hero was edited from the supplied visual reference to remove embedded UI. Project illustrations and the 3D form study are website artwork, not evidence of completed products or customer projects.

Three.js is distributed under its MIT license; see `vendor/THREE-LICENSE.txt`.
