# Darmigan Baskar — Personal Site

A five-page personal portfolio: Home, Work, Projects, 3D Printing, and Contact.

## Website

https://darmigan2011-ops.github.io/-personal-profile-for-my-business-/

The site features a cinematic portrait hero, interactive Three.js sculptures, scroll reveals, project filters, keyboard-accessible dialogs, responsive navigation, and a 3D printing layer study.

## Hosting

This repository contains the complete static production build. GitHub Pages publishes from `main` and the repository root. Keep the `assets/` and `vendor/` directories alongside the HTML, CSS, and JavaScript files. There is no separate custom Pages workflow.

For a local preview, serve the repository with an HTTP server, for example `python -m http.server 8000`. Open http://localhost:8000. File URLs may block JavaScript module imports.

## Contact

The contact form creates a draft in the visitor's email app and offers a Gmail-composer link. Visitors review and send the message themselves; there is no server that sends or stores enquiries.

## Content and artwork

Project descriptions come from Darmigan's public GitHub repositories. Jarvis is labeled as an early exploration because its public repository currently contains a README. Flash Force information and the public contact address come from the previously published portfolio. The hero was edited from the supplied visual reference to remove embedded UI. Project illustrations and the 3D form study are website artwork, not evidence of completed products or customer projects.

Three.js is distributed under its MIT license; see `vendor/THREE-LICENSE.txt`.
