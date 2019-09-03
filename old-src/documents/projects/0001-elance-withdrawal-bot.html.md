---
title: Elance Automatic Withdrawal Bot
link: https://github.com/nfriedly/elance-withdrawal
npm: elance-withdrawal
date: 2014-04-16
icon: dollar
tags: 
    - JavaScript
    - CasperJS
    - Heroku
    - Open Source
    - npm
---

I occasionally <a href="https://www.elance.com/s/nfriedly/">take on side projects via Elance</a>, and their payment system is really great at reliably getting funds into my Elance account.
And then they just sit there until I remember to withdrawal them to my bank. So, I built this bot.

The bot uses CasperJS to log into the site as me, check if I have any available funds, and immediately transfer them to my bank if I do.

It runs on Heroku once per day and gives me one less thing I have to remember to do.
