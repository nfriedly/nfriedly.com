---
title: Using an Arduino and an IR Shield to connect a TV and Sound Bar
heading: Making a "Smart" TV Smarter
subHeading: Using an Arduino to Automatically Turn On the Sound Bar with the TV

url: /techblog/2015/01/samsung-tv-turn-on-soundbar-with-arduino/

headerImage: /img/blog/arduino-ir/tv-back.jpg

featured: true

tags:
 - Arduino
 - hardware
 - IR
---

<style> center img { margin: 20px 0; } </style>

<img class="left" src="/img/blog/arduino-ir/arduino-ir-assembled-small.jpg" alt="Arduino Uno and IR Shield assembled" />
*"Snatching defeat from the jaws of victory."*
That summarizes Samsung's implementation of HDMI CEC ("Anynet+") in their "Smart" TVs - everything works except the power button.

However, with help from an Arduino and an IR Shield, I was able to add in the missing parts and make things work properly.

<!--more-->

## Background

The <abbr title="High-Definition Multimedia Interface Consumer Electronics Control">[HDMI CEC]</abbr>
protocol allows various pieces of home theater equipment to send each other commands with the idea being that your TV remote can control everything.
It allows your TV to turn your connected equipment on and off, play/pause your DVD player, adjust the volume on your sound system, etc.
On [my TV], Samsung got everything right except the first step: turning things on.

The TV forwards volume up/down commands to [my sound bar] and, critically, it also automatically turns the sound bar off when I turn off the TV.
But, since it doesn't turn sound bar back on, I still have to get out my sound bar's remote any time I want to watch TV.


## Easy Version: Arduino Uno + IR Shield

The TV has a couple of USB ports on the back. These were intended for plugging in an external HDD to play movies off of, but they provide more than enough power for an Arduino, and, importantly, they only provide power when the TV is on.

For my initial solution, I put together a regular [Arduino Uno R3] and an [IR Shield].
(That shield comes from [Electrodragon], who I highly recommend, but be aware that they ship from China so it takes a little while to arrive. LinkSprite offers a [similar shield](http://store.linksprite.com/linksprite-infrared-shield-for-arduino/) that ships from Colorado and would presumably work just as well.)

<center>
![Arduino Uno and IR Shield side-by-side](/img/blog/arduino-ir/arduino-ir-parts.jpg)
</center>

I used Ken Shirriff's awesome [Arduino IRemote library] and initially it had some conflicts.
It seems that the Arduino IDE 1.5 beta includes a butchered copy of the library that can only receive a single format and can't transmit anything, but they neglected to rename anything.
You can delete the `examples/RobotIRemote` folder or just go back to the Arduino IDE 1.0.6.

After getting that sorted, I loaded the IRecord example sketch onto my Arduino. I opened the Serial Monitor, pointed my sound bar remote at the IR Shield, and pressed power:

```none
Received NEC: FF02FD
repeat; ignoring.
repeat; ignoring.
repeat; ignoring.
```

Success! I now had the code to turn on my sound bar.

Inspecting the code revealed that the "repeat" code is actually `0xFFFFFFFF`, and some trial and error revealed that a sketch with one repeat is sufficient to turn on my sound bar:

```c++
#include <IRremote.h>
#include <avr/sleep.h>

/*
 * Turn on a Vizio Soundbar via an IR shield when the Arduino receives power
 * https://www.nfriedy.com/techblog/2015/01/samsung-tv-turn-on-soundbar-with-arduino/
 */


void setup()
{
  IRsend irsend;
  delay(100);

  irsend.sendNEC(0xFF02FD, 8*6); // Vizio power on code
  irsend.sendNEC(REPEAT, 8*8); // 0xFFFFFFFF - my remote actually sends out 4 of these (?)

  set_sleep_mode(SLEEP_MODE_PWR_DOWN);  // waste not.
}

void loop() {
}
```

I "installed" it on the back of my TV (A.K.A. set it on top of the wall mount pointing vaguely in the direction of the sound bar), and viola! I could now control everything from just my TV's remote.

Total time: < 20 minutes.

<center>
![Arduino Uno and IR Shield assembled together](/img/blog/arduino-ir/arduino-ir-assembled.jpg)
![Arduino Uno and IR Shield installed on TV](/img/blog/arduino-ir/arduino-ir-installed.jpg)
</center>



## Cheaper Version: Digispark

I was stoked with how well my new setup worked, but it still kind of annoyed me that I was using my $25 arduino when I had a couple of spare $8 [Digisparks] that are more than powerful enough to meet the requirements here.
So after a week or so, I rebuilt it and recovered my Arduino.

<center>
![Digispark, IR Shield, and parts to make a dupont cable](/img/blog/arduino-ir/digispark-ir-parts.jpg)
</center>

There was a bit of trouble with the IRremote library wanting to use timers that The Arduino's ATmega 328 processor had but the Digispark's Attiny85 did not.
However, TKJElectronics made a [fork](https://github.com/TKJElectronics/ATtinyRemote) (with the same naming conflicts *again*) that works on a Digispark.
It didn't have support for the NEC format that I needed, but copy-pasting everything NEC-related from the IRRemote library got me a working build.
I should clean it up and send a Pull Request sometime soon here...

After that, I made myself a male-to-female dupont cable (probably the hardest part) and "re-installed" it.

<center>
![Digispark + IR Shield](/img/blog/arduino-ir/digispark-ir-assembled.jpg)
</center>

Out of the box, Digispark's have a 5-second delay between powering on and running your program. This is to allow the IDE to recognize it and upload a new sketch, but I found it a little bit annoying.
Fortunately, the [micronucleus] bootloader has an alternate mode where it runs your sketch immediately unless pin 0 is pulled low at power on.
Updating to that got me back instantaneous, automatic sound bar power!

<center>
![IR Shield installed on TV](/img/blog/arduino-ir/ir-installed.jpg)
![Overview of Digispark and IR Shield installed on TV](/img/blog/arduino-ir/digispark-ir-installed.jpg)
![Digispark installed on TV](/img/blog/arduino-ir/digispark-installed.jpg)
</center>

## Now with lighting control!

I have a strand of icicle-style christmas lights strung above my TV that I had been manually plugging in and unplugging. 
After a while, I decided to automate this! 
With the help of a [Power Switch Tail 2] and a couple of free pins on the arduino, I was able to set this up in under 20 minutes with no code changes!

<center>
![With the lighting control connected #notilter](/img/blog/arduino-ir/tv-back.jpg)
</center>

[HDMI CEC]: https://en.wikipedia.org/wiki/HDMI#CEC
[my TV]: http://www.amazon.com/gp/product/B007BG4F5C/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B007BG4F5C&linkCode=as2&tag=nfriedly-20&linkId=XLTMI57TA3XPSFQ3
[my sound bar]: http://www.amazon.com/gp/product/B005P99KX4/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B007BG4F5C&linkCode=as2&tag=nfriedly-20&linkId=XLTMI57TA3XPSFQ3
[Arduino Uno R3]: http://www.amazon.com/gp/product/B006H06TVG/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B006H06TVG&linkCode=as2&tag=nfriedly-20&linkId=65LVBGKDBEAGVMAO
[Electrodragon]: http://www.electrodragon.com/
[IR Shield]: http://www.electrodragon.com/product/arduino-ir-infrared-shield/
[Arduino IRemote library]: https://github.com/shirriff/Arduino-IRremote
[Digisparks]: http://digistump.com/products/1
[micronucleus]: https://github.com/micronucleus/micronucleus
[Power Switch Tail 2]: https://www.adafruit.com/product/268
