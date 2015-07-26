---
title: DIY ESP8266 ESP-01 Programing / Test board
heading: DIY ESP-01 Motherboard
subHeading: Build a simple dev board to make programing ESP-01 (ESP8266EX) chips fast and easy

url: /techblog/2015/07/build-a-diy-esp8266ex-esp-01-dev-test-programming-board/

headerImage: /img/blog/esp-mb/header-bg.jpg

featured: true

tags:
 - Arduino
 - hardware
 - ESP8266
---

<img class="right" src="/img/blog/esp-mb/zoom.jpg" style="max-width: 300px;" alt="ESP-01" />[NodeMCU](http://nodemcu.com/index_en.html) and other ESP8266 modules are starting to become very popular because they offer an embedded development 
platform with a CPU+RAM+Storage+WiFi all in one for (considerably) less than the price of an Arduino. There are a [number][huzzah] of 
[breadboard][espthing]-[friendly][nodemcu] [modules][cactus] with all pins exposed (and [more][oak] coming soon.)

However, this post is about the breadboard-unfriendly ESP-01 module. It only has two GPIO pins (four if you include the
TX & RX pins), but it's smaller and most importantly, cheaper. <!--more-->[US][adafruit] [vendors][sparkfun] tend to charge around 
$7, but if you don't mind importing, they can be [had for $3.50][electrodragon] [or less][ebay].

The biggest problem with the ESP-01 is that it's annoying to wire up and program, so that's what we're solving today.

## Parts

![ESP-01 motherboard parts](/img/blog/esp-mb/parts.jpg)

* __ESP-01 module__: The reason were going through all this trouble. [$3.50 @ Electrodragon][electrodragon]
* __USB-Serial TTL programmer__: I'm using an Adafruit FTDI Friend, although I'm hesitant to recommend FTDI products after they shipped mallware with their Windows drivers... 
  [$14.75 @ Adafruit](http://www.adafruit.com/product/284).
  Update: I've confirmed that a CP2102 USB-TLL UART also works well on OS X. You can either use the included cable, or switch the pin headers from male to female. 
  [$2.20 @ Electrodragon](http://www.electrodragon.com/product/cp2102-usb-ttl-uart-module-v2/)
* __3.3v Voltage Regulator__: Needs to be a slightly beefy one because the ESP8266EX chips can reportedly draw as much as 350-400mA. I'm using a LM2937ET-3.3/NOPB from TI. 
  [$1.61 @ Texas Instruments](http://www.ti.com/product/LM2937-3.3/samplebuy) (Or request a free sample)
* __10 μF Capacitor__: For the 3.3v side of the voltage regulator. 
  [$0.02 each @ Tayda Electronics](http://www.taydaelectronics.com/10uf-25v-105c-radial-electrolytic-capacitor-5x11mm.html) 
  or [$3.30 for a 120-piece kit @ Electrodragon](http://www.electrodragon.com/product/radial-electrolytic-capacitor-1uf-470uf-12-kinds-10pcs/)
* __0.1 μF Capacitor__: (100nf) For the vin/5v side of the voltage regulator. 
  [$0.02 each @ Tayda Electronics](http://www.taydaelectronics.com/0-1uf-50v-105c-radial-electrolytic-capacitor-5x11mm.html) 
  (Or use the 0.2uf Capacitor from the aforementioned [Electrodragon kit](http://www.electrodragon.com/product/radial-electrolytic-capacitor-1uf-470uf-12-kinds-10pcs/)
* __Two Buttons__: SPST (Single Pole, Single Throw) momentary on switches. I'm using Omron B3F buttons.
  [$0.04 each @ Tayda Electronics](http://www.taydaelectronics.com/electromechanical/switches-key-pad/tact-switch/tact-switch-6x6mm-5mm-through-hole-spst-no.html)
  or [$1.20 for 50 @ Electrodragon](http://s1.electrodragon.com/wp-content/uploads/2011/12/button1.jpg)
* __10k Ω Resistor__: Pull-up for the Program button on `GPIO 0`. 
  [$0.10 for 10 @ Tayda Electronics](http://www.taydaelectronics.com/resistors/1-4w-carbon-film-resistors/10-x-resistor-10k-ohm-1-4w-5-carbon-film-pkg-of-10.html)
  or [$0.90 for 100 @ Electrodragon](http://www.electrodragon.com/product/metal-membrane-resistors-different-value-available-100pcs/)
  or [$3 for a 600-piece kit @ Electrodragon](http://www.electrodragon.com/product/14w-resistor-kit-accuracy-in-1-2020pcs/)
* __1k Ω Resistor__: Pull-up for the `CH_PD` pin that enables the ESP-01 module.
  [$0.10 for 10 @ Tayda Electronics](http://www.taydaelectronics.com/resistors/1-4w-carbon-film-resistors/10-x-resistor-1k-ohm-1-4w-5-carbon-film-pkg-of-10.html)
  or [$0.90 for 100 @ Electrodragon](http://www.electrodragon.com/product/metal-membrane-resistors-different-value-available-100pcs/)
  or the aforementioned [$3 600-piece kit @ Electrodragon](http://www.electrodragon.com/product/14w-resistor-kit-accuracy-in-1-2020pcs/)
* __2x4 Female Pin Headers__: For connecting the ESP-01 module. 
  (I'm not even sure where to buy these, I think mine was a free sample from [Samtec](https://www.samtec.com/technical-specifications/default.aspx?SeriesMaster=SSW) that was leftover from a different project.
  Nobody will look down on you if you just break off two 1x4 pieces of single-row pin headers and solder them side-by-side ;)
* __Male and Female Breakaway Pin Headers__: For connecting USB-Serial TTL programmer and connecting to the GPIO pins.
  [$0.90 (male) & $1.70 (female) @ Electrodragon](http://www.electrodragon.com/product/break-away-header/) + [$1.40 (male, right-angle - optional) @ Electrodragon](http://www.electrodragon.com/product/10pcs-2-54mm-90-degree-break-away-pin-header/)
* __Stripboard__: The "board" part of our motherboard.
  [$0.66 @ Tayda Electronics](http://www.taydaelectronics.com/small-stripboard-94x53mm-copper.html)
* __Misc Wire__: A few short pieces of wire, probably less than 2 inches total.
  [$0.10 per foot @ Tayda Electronics](http://www.taydaelectronics.com/hardware/cable-wire.html)
  or [$1.60 for 10 meters @ Electrodragon](http://www.electrodragon.com/product/24awg-wires-cables-1-meter-variablecolors/)
* __Brass Spacers__: Optional but keeps the board from potentially shorting out on your desk/whatever.
  [$0.90 for 10 @ Electrodragon](http://www.electrodragon.com/product/m3-brazz-bolt-different-length-available/)
  
Total cost: ~$12 + shipping to go with the cheapest options. Be aware that Tayda Electronics has a minimum order of $5, so with that and shipping you'll probably have to spend $20-25 to get everything.

## Tools

![ESP-01 motherboard parts & tools](/img/blog/esp-mb/parts-tools.jpg)

* __Soldering Iron & Solder__: I recently upgraded to a [Weller WESD51] and I am *loving* it.
* __Flush Cutters__: To cut the leads off after soldering each part in. These are also handy for "breakaway" female pin headers.
* __Wire Strippers__: For cutting stripping the few bits of wire we need.
* __X-Acto Knife__: Necessary for cutting the stripboard track between the two rows of pins on the ESP-01 module, and a fallback option for the other cuts.
* __Drill w/ 4mm drill bit__: Makes all of the other stripboard cuts much easier. Just position the drill in the center of an unused pin hole and spin it for a few moments to strip away the copper.

## Building

![ESP-01 motherboard Wiring Diagram](/img/blog/esp-mb/fritzing.png)
([Fritzing .fzz file](https://www.dropbox.com/s/c5nzxps1d0y40xp/esp-01%20programing%20board.fzz?dl=0), uses Yan Donelly's [ESP-01 Fritzing part](https://github.com/ydonnelly/ESP8266_fritzing))

Connect everything as shown in the diagram. Be sure to cut the stripboard tracks between the two rows of pins where the ESP-01 connects. 
(And the other locations - the `CH_PD` track and a few on either side of the power tracks - but you can see each of those cuts in the graphic.)

I changed the spacing a bit when I assembled mine to give my fingers more room to connect and disconnect things from the pin headers.

![ESP-01 motherboard front-angled](/img/blog/esp-mb/front-angle.jpg)

![ESP-01 motherboard back-angled](/img/blog/esp-mb/back-angle-2.jpg)

![ESP-01 motherboard behind connector](/img/blog/esp-mb/back-angle.jpg)

![ESP-01 motherboard bottom](/img/blog/esp-mb/bottom.jpg)

## Programing

There are a few ways to program the ESP-8266, but my favorite is to use the [Arduino IDE] with the [ESP8266][addon] board from
 [esp8266.com](http://www.esp8266.com/). Adafruit has a [nice guide] for installing it.

When uploading your sketch, you have to be a little carefule about the order and timing of the button presses:

1. Click upload in the Arduino IDE
2. Quickly press and hold the RESET button (the one farther from the ESP-01)
3. Quickly press and hold the PROGRAM button
4. Watch the status line in the Arduino IDE. When it changes from "Compiling..." to "Uploading..." release the RESET button
5. After you see it starting to print the upload status in red text, release the PROGRAM button.

Here's an example sketch to use PROGRAM button on `GPIO 0` as a regular input:

```C++
const int buttonPin = 0;

void setup() {
 Serial.begin(9600);
 // Normally the button will take the pin from "floating" (not connected to anything) to grounded
 // This enables the internal pullup resistor so that the default state is high rather than floating.
 pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  Serial.print("Button is ");
  int status = digitalRead(buttonPin);
  // because of the pullup resistor, the pin state is reversed: button pressed = LOW, button released = HIGH
  if (status == LOW) {
    Serial.println("pressed");
  } else {
    Serial.println("released");
  }
  delay(500);
}
```

Happy hacking! Discuss on [esp8266.com](http://www.esp8266.com/viewtopic.php?f=6&t=3968).

![ESP-01 motherboard top-down, connected](/img/blog/esp-mb/top.jpg)

[huzzah]: https://www.adafruit.com/product/2471
[espthing]: https://www.sparkfun.com/products/13231
[nodemcu]: http://www.electrodragon.com/product/nodemcu-lua-amica-r2-esp8266-wifi-board/
[cactus]: https://www.tindie.com/products/AprilBrother/cactus-micro-rev2-arduino-compatible-plus-esp8266/
[oak]: https://www.kickstarter.com/projects/digistump/oak-by-digistump-wi-fi-for-all-things-arduino-comp

[adafruit]: https://www.adafruit.com/product/2282
[sparkfun]: https://www.sparkfun.com/products/13252
[electrodragon]: http://www.electrodragon.com/product/esp8266-wi07c-wifi-module/
[ebay]: http://www.ebay.com/sch/i.html?_sop=15&_nkw=esp-01

[Weller WESD51]: http://www.amazon.com/gp/product/B000ARU9PO/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000ARU9PO&linkCode=as2&tag=nfriedly-20&linkId=F4NKRV7MHUBFOMA5

[arduino IDE]: https://www.arduino.cc/en/Main/Software
[addon]: https://github.com/esp8266/Arduino
[nice guide]: https://learn.adafruit.com/adafruit-huzzah-esp8266-breakout/using-arduino-ide
