```md
# Darmigan Baskar - Personal Site

My personal portfolio and kinda my business website too.

I made this to keep my works, projects, 3D printing stuff and contact all in one place instead of having everything scattered everywhere.

[Live Website](https://darmigan2011-ops.github.io/-personal-profile-for-my-business-/) · [Source Code](https://github.com/darmigan2011-ops/-personal-profile-for-my-business-)

## Description

This is basically my personal portfolio.

I'm Darmigan Baskar and this website is where I put the projects I worked on, things im experimenting with and some of my 3D printing stuff.

There are pages for **Home, Work, Projects, 3D Printing and Contact** and also seperate pages for few of my projects.

I didnt really want to make a normal portfolio where its just some cards and text, so I tried making it more interactive.

There is a big cinematic hero section, some Three.js 3D stuff, scroll animations, project filters and few other small interactions around the website.

It also works on mobile and I tried making the navigation and dialogs keyboard accesible too.

Most of the website is just **HTML, CSS and Javascript + Three.js** for the 3D things.

## AI USAGE

I did use AI while making this website.

Mostly for helping me code some parts, debugging errors, structuring stuff, improving few UI things and also understanding SEO and accessibility better.

I also used it when I was stuck with some Three.js things because i havent really used it that much before.

But I didnt just generate a full website and put it online. I changed alot of the things myself, tested it, removed stuff I didnt like and kept changing the design till it looked more like what I wanted.

AI also helped me learn some of the stuff while building this.

## Features

Some stuff I added:

- Cinematic portrait hero
- Interactive 3D models using Three.js
- Scroll reveal animations
- Project filtering
- Responsive navbar
- Keyboard accesible dialogs
- Project detail pages
- 3D printing layer visual
- Better image formats like AVIF and WebP
- SEO and social sharing meta tags
- `sitemap.xml`
- Contact email drafts
- Some hooks for adding analytics later

The project pages and important navigation can still be accessed without Javascript too.

## Screenshots

Will add more screenshots once I finish changing few parts of the website.

```md
![Darmigan Personal Website](YOUR-SCREENSHOT-LINK)
```

## Search and sharing

I also tried making the site atleast decent for Google search and sharing links.

Every public page has its own title and description instead of everything using the same one.

I added things like:

- Canonical URLs
- Open Graph tags
- Social card metadata
- Person structured data
- Organisation structured data
- Website structured data
- Page structured data

There is also a `sitemap.xml` which currently contains **9 main URLs**.

Some older URLs like:

```text
profile.html
flashforce3d.html
```

redirect to the newer pages so old links hopefully dont just randomly break.

The portraits also use AVIF/WebP versions depending on what the browser supports.

The Three.js code is bundled and minified too.

Obviously putting SEO stuff in the site doesnt magically mean Google will instantly rank it.

Things like Google Search Console, indexing, Google Business profile etc still need to be setup by the actual owner using their Google account.

## Analytics

I added a browser event called:

```text
portfolio:interaction
```

Mostly so analytics can be connected later without rewriting everything.

For example it can detect stuff like:

- Email clicks
- Source code clicks
- Copying the email
- Opening projects
- Print enquiry clicks
- Preparing contact drafts

It doesnt collect the visitors name, email address or their message content.

There isnt any actual remote analytics service connected right now though.

Also if someone prepares an email draft that doesnt mean they actually sent it.

## Getting Started

### Dependencies

If you just want to visit the website you need:

- A browser
- Internet

Thats basically it.

If you wanna edit it then you should also have Git installed.

There isnt any huge framework or package setup for running the final website.

### Installing

You dont need to download anything if you just wanna see it.

[Open the live site](https://darmigan2011-ops.github.io/-personal-profile-for-my-business-/)

But if you wanna clone it:

```sh
git clone https://github.com/darmigan2011-ops/-personal-profile-for-my-business-.git
cd ./-personal-profile-for-my-business-
```

Try not to move around folders randomly because some files depend on the current paths.

Main folders like:

```text
assets/
vendor/
```

should stay with the HTML, CSS and Javascript files.

### Executing program

You can use Python to run a simple local server.

Open terminal inside the project folder and run:

```sh
python -m http.server 8000
```

Then go to:

```text
http://localhost:8000
```

Dont just double click the HTML file if something isn't working.

Some Javascript module imports can get blocked when the site is opened through `file://`.

## Hosting

The website is hosted using **Github Pages**.

It publishes directly from the `main` branch and the root of the repository.

So basically:

```text
Branch: main
Folder: /
```

There isnt a seperate custom deployment workflow for this.

The repo itself contains the production website.

After changing something just push the updated files and Github Pages should publish the new version.

## Contact

The contact form is actually pretty simple.

I didnt make a server/backend just to store messages.

Instead the website prepares an email for the person.

It can either open their normal email app or give them a Gmail compose option.

They can check the message and press send themselves.

So the website doesn't actually send emails automatically or store peoples messages somewhere.

## Content and Artwork

Most project descriptions are based on Darmigan's public Github repositories.

Jarvis is shown as more of an early project/exploration because right now the public repository mainly has the README and not like a complete released product.

Some information about Flash Force and the contact details were taken from the older portfolio.

The hero image was edited from the visual reference that was given to me because the original had some UI stuff inside the image which didnt really belong there.

Some project pictures and the 3D printing visual are mainly artwork made for this site.

They are there to make the website look better and explain the projects, not to pretend that every render is already a finished physical product or customer work.

## Accessibility

I tried not to make everything only work with a mouse.

Project dialogs can be controlled using keyboard and navigation is responsive for smaller screens.

Some important project details are also available even when Javascript isnt running.

Still probably more accessibility things I can improve later.

## License

Three.js is used for the 3D parts of this website.

Its distributed under MIT license.

The Three.js license is inside:

```text
vendor/THREE-LICENSE.txt
```
