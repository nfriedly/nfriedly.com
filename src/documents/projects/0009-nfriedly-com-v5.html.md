---
title: "nfriedly.com, v5"
link: "https://www.nfriedy.com/"
picture: "/img/portfolio/nfriedly.com-v5.png"
github: nfriedly.com
travis: nfriedly.com
date: 2013-06-12
tags: 
  - HTML
  - Bootstrap
  - DocPad
  - Node.js
  - LESS
  - CSS
  - AWS
  - Continuous Integration
  - JavaScript
  - Mobile First
  - Open Source
write: false
---

I rebuilt my personal website from scratch with a state of the art mobile-first design made for speed and usability. I like to say that I have more taste than skill when it comes to design, so I'm really happy with myself when I can build something that I think looks good, and I think I did that here. 

The homepage starts out with a photo I took of my grape arbor in my back yard; this photo is the basis for the color scheme on the rest of the site. I put a lot of time into choosing the fonts - I wanted something that is easy to read and light-weight, but doesn't stand out too much, and I think the Raleway / Nobile combination did a great job.  Also, check out how the footer appears when you scroll down (the effect is only enabled on modern browsers with relatively large displays.)

On the technical side, I actually simplified things a lot compared to the last version of my site: It now uses DocPad to convert markdown files to html for the blog and portfolio, and the site's completely static, allowing it to be hosted on GitHub pages and cached by Amazon CloudFront. Every git push causes the site to be re-generated and deployed (courtesy of Travis CI), and then CloudFront gets the changes within 6 minutes. The site pulls in a little bit of live content from GitHub and Instagram on each visit.

