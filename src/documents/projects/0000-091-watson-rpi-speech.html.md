---
title: Watson/Raspberry Pi Time and Weather Speech Demo
github: https://github.com/watson-developer-cloud/rpi-time-weather-demo
picture: /img/portfolio/time-weather.jpg
date: 2015-05-03

tags:
  - JavaScript
  - Node.js
  - IoT
  - hardware
  - Open Source
---

My first in a series of Watson/<abbr title="Internet of Things">IoT</abbr> demos, this one emplys a Raspberry Pi that 
announces the current time and weather over the system speakers at the press of a button. Uses Node.js and the newer 
Linux userspace GPIO support to avoid needing to run as root.

This design focused on energy and bandwidth efficiency: it uses interrupts rather than polling the GPIOs, it uses 
omxplayer to ensure the audio is decoded in hardware, and it caches the audio files to disk for potential reuse later.


