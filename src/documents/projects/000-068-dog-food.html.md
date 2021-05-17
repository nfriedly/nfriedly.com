---
title: Dog feeding tracker
github: dog-food
date: 2021-01-21
picture: /img/portfolio/dog-food/open.jpg
# extraPictures:
#  - /img/portfolio/dog-food/closed,jpg
#  - /img/portfolio/dog-food/parts.jpg
#  - /img/portfolio/dog-food/soldered.jpg
#  - /img/portfolio/dog-food/dog-computer.jpg
tags:
  - Python
  - hardware
  - Open Source
---

A device that answers the question of "Did anyone feed the dog yet?"

Built with an [Adafruit QT Py](https://www.adafruit.com/product/4600) running [CircuitPython](https://circuitpython.org/), a door sensor, and a dog food container, it detects when the door to the dog food container is opened/closed and colors the LED to indicate when the dog was fed last:

🟢 Green indicates that the dog has been fed her breakfast / dinner (or at least that the food container has been opened within the last 8 hours)
<br>
🔴 Red indicates the dog has not been fed her current meal
<br>
🔵 Blue indicates the door is opened now, or the wire is disconnected, or the microcontroller rebooted and doesn't know the last time the door was opened. After the door has been opened for a brief period, it switches to rainbow to indicate that the timer has been reset.