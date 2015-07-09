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
platform with a CPU+RAM+Storage+WiFi all in one for (considerably) less than the price of an Arduino. There are a number of 
[breadboard][huzzah]-[friendly][espthing] [modules][nodemcu] with all pins exposed (and [more][oak] coming soon.)

However, this post is about the breadboard-unfriendly ESP-01 module. It only has two GPIO pins (four if you include the
TX & RX pins), but it's smaller and most importantly, cheaper. <!--more-->[US][adafruit] [vendors][sparkfun] tend to charge around 
$7, but if you don't mind importing, they can be [had for $3.50][electrodragon] [or less][ebay].

The biggest problem with the ESP-01 is that it's annoying to wire up and program, so that's what we're solving today.

## Parts

* <img class="right" src="/img/blog/esp-mb/parts.jpg" style="max-width: 300px;" alt="ESP-01 motherboard parts" /> __ESP-01 module__: The reason were going through all this trouble
* __USB-Serial TTL programmer__: I'm using an Adafruit FTDI Friend, although I'm hesitant to recommend FTDI products after they shipped mallware with their Windows drivers...
* __3.3v Voltage Regulator__: Needs to be a slightly beefy one because the ESP8266EX chips can reportedly draw as much as 350-400mA. I'm using a LM2937ET-3.3/NOPB from TI.
* __10 μF Capacitor__: For the 3.3v side of the voltage regulator
* __0.1 μF Capacitor__: (100nf) For the vin/5v side of the voltage regulator
* __2x button__: SPST (Single Pole, Single Throw) momentary on switches. I'm using Omron B3F buttons.
* __10k Ω Resistor__: Pull-up for the Program button on `GPIO0`
* __1k Ω Resistor__: Pull-up for the `CH_PD` pin that enables the ESP-01 module
* __2*4 Female Pin Headers__: For connecting the ESP-01 module. (But nobody will look down on you if you just break off two 1x4 pieces of single-row pin headers and solder them side-by-side ;)
* __Male and Female Breakaway Pin Headers__: For connecting USB-Serial TTL programmer and connecting to the GPIO pins.
* __Stripboard__: The "board" part of our motherboard
* __Misc Wire__: A few short pieces of wire, probably less than 2 inches total.

I also added brass spacers to my board after I built it.


## Tools

![ESP-01 motherboard parts & tools](/img/blog/esp-mb/parts-tools.jpg)

* __Soldering Iron & Solder__: I recently upgraded to a [Weller WESD51] and I am *loving* it.
* __Wire Cutter / Strippers__: For cutting stripping the few bits of wire we need.
* __X-Acto Knife__: Necessary for cutting the stripboard track between the two rows of pins on the ESP-01 module, and a fallback option for the other cuts.
* __Drill w/ 4mm drill bit__: Makes all of the other stripboard cuts much easier.

## Building

![ESP-01 motherboard Wiring Diagram](/img/blog/esp-mb/fritzing.png)
([Fritzing .fzz file](https://www.dropbox.com/s/c5nzxps1d0y40xp/esp-01%20programing%20board.fzz?dl=0), uses Yan Donelly's [ESP-01 Fritzing part](https://github.com/ydonnelly/ESP8266_fritzing))

Connect everything as shown in the diagram. Be sure to cut the stripboard tracks between the two rows of pins where the ESP-01 connects. 
(And the other locations - the `CH_PD` track and a few on either side of the power tracks - but you can see each of those cuts in the graphic.)

I changed the spacing a bit when I assembled mine to give my fingers more room to connect and disconnect things from the pin headers.

![ESP-01 motherboard top-down, unconnected](/img/blog/esp-mb/top-unconnected.jpg)

(This pic is from a previous revision where I used a bit of red wire for `CH_PD` instead of the 1k Ω resistor. It's since been corrected.)

## Programing

There are a few ways to program the ESP-8266, but my favorite is to use the [Arduino IDE] with the [ESP8266][addon] from
 [esp8266.com](http://www.esp8266.com/). Adafruit has a [nice guide] for installing it.

When uploading your sketch, you have to be a little carefule about the order and timing of the button presses:

1. Click upload in the Arduino IDE
2. Quickly press and hold the RESET button (the one farther from the ESP-01)
3. Quickly press and hold the PROGRAM button
4. Watch the status line in the Arduino IDE. When it changes from "Compiling..." to "Uploading..." release the RESET button
5. After you see it starting to print the upload status in red text, release the PROGRAM button.

Here's an example program to make use of the PROGRAM button on `GPIO 0`:

```C++
const int buttonPin = 0;

void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
 pinMode(buttonPin, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  Serial.print("Button is ");
  int status = digitalRead(buttonPin);
  // because of the way the board is wired, the pin state is reversed
  if (status == LOW) {
    Serial.println("pressed");
  } else {
    Serial.println("released");
  }
  delay(500);
}
```

Happy hacking!

![ESP-01 motherboard top-down, connected](/img/blog/esp-mb/top.jpg)

[huzzah]: https://www.adafruit.com/product/2471
[espthing]: https://www.sparkfun.com/products/13231
[nodemcu]: http://www.electrodragon.com/product/nodemcu-lua-amica-r2-esp8266-wifi-board/
[oak]: https://www.kickstarter.com/projects/digistump/oak-by-digistump-wi-fi-for-all-things-arduino-comp

[adafruit]: https://www.adafruit.com/product/2282
[sparkfun]: https://www.sparkfun.com/products/13252
[electrodragon]: http://www.electrodragon.com/product/esp8266-wi07c-wifi-module/
[ebay]: http://www.ebay.com/sch/i.html?_sop=15&_nkw=esp-01

[Weller WESD51]: http://www.amazon.com/gp/product/B000ARU9PO/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000ARU9PO&linkCode=as2&tag=nfriedly-20&linkId=F4NKRV7MHUBFOMA5

[arduino IDE]: https://www.arduino.cc/en/Main/Software
[addon]: https://github.com/esp8266/Arduino
[nice guide]: https://learn.adafruit.com/adafruit-huzzah-esp8266-breakout/using-arduino-ide
