---
title: Coin Allocator: Bitcoin & Altcoin algorithmic trading
link: https://github.com/nfriedly/Coin-Allocator
tags:
 - Bitcoin
 - Node.js
 - JavaScript
 - Open Source
 - Continuous Integration
 - NPM
 - Heroku
---
<img src="/img/portfolio/bitcoin.png" class="right"> A low-frequency trading tool, taking the principles from [The Intelligent Asset Allocator](http://www.amazon.com/gp/product/0071362363/ref=as_li_ss_il?ie=UTF8&camp=1789&creative=390957&creativeASIN=0071362363&linkCode=as2&tag=nfriedly-20) and applying them to Bitcoin and altcoins. Currently running on Heroku: it checks the markets every 10 minutes and trades coins every day or two.

Currently supports only the [Cryptsy](https://www.cryptsy.com/users/register?refid=154285) exchange, however it was designed to be able to easily support additional exchanges in the future; I'm planning on adding BTC-e when I have time available.

Coin-Allocator can be run via the command-line, or included as a Node.js module to build larger projects on top of (I'd like to build a web interface.)

Continuously integrated & deployed with JSHint and a suite of Jasmine tests that are executed after each GitHub push via Travis CI. If the tests pass, it is automatically deployed to my personal instance on Heroku. Tagged commits are also published to NPM automatically. [![Build Status](https://travis-ci.org/nfriedly/Coin-Allocator.png?branch=master)](https://travis-ci.org/nfriedly/Coin-Allocator)
