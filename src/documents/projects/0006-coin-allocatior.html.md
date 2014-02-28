---
title: Coin Allocator: Bitcoin & Altcoin algorithmic trading
link: https://github.com/nfriedly/Coin-Allocator
tags:
 - Node.js
 - JavaScript
 - Open Source
 - Continuos Integration
---
A low-frequency trading tool, taking the principles from [The Intelligent Asset Allocator](http://www.amazon.com/gp/product/0071362363/ref=as_li_ss_il?ie=UTF8&camp=1789&creative=390957&creativeASIN=0071362363&linkCode=as2&tag=nfriedly-20) and applying them to Bitcoin and altcoins.

Project is currently a command-line tool that only supports the [Cryptsy](https://www.cryptsy.com/users/register?refid=154285) API, however it was designed to be able to easily support additional exchanges in the future and also be integrated into other projects as a Node.js module.

Continuously integrated with JSHint and a suite of Jasmine tests that are executed after each GitHub push via Travis CI: [![Build Status](https://travis-ci.org/nfriedly/Coin-Allocator.png?branch=master)](https://travis-ci.org/nfriedly/Coin-Allocator)
