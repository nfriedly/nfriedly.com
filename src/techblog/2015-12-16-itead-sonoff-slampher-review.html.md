---
title: ITEAD Sonoff and Slampher Review
heading: Sonoff and Slampher Review
subHeading: IoT devices for home automation from ITEAD

headerImage: /img/blog/itead/sonoff-slampher-bg.jpg

featured: false

tags:
 - hardware
 - review
---

<img class="left" src="/img/blog/itead/sonoff-slampher.jpg" alt="remote" /> <a href="https://www.itead.cc/">ITEAD studio</a> is an electronics shop based in Shenzhen, China with the tagline "make innovation easier". 
They sell a variety of hobbyist-friendly prototyping hardware such as LCD displays and Arduino shields, and they do seem to be one of the more innovative players in the market.

ITEAD has an <a href="https://www.indiegogo.com/projects/sonoff-slampher-low-cost-smart-home-solution#/">Indiegogo campaign</a> 
in progress for their latest products, Sonoff and Slampher, and they sent me pre-release samples of each to review.

The two devices are fairly similar, they're both essentially smart power switches. 
Both can be remote controlled via the included remote and/or via a Android or iOS app, and both can be assigned a schedule through said app.

The only real difference is the connectors and amount of amperage the devices can handle: 
Sonoff is hard-wired via screw terminals, and can handle up to 10 amps
whereas Slampher is intended for lightbulbs (see the "lamp" in the name?) with an E27 socket and can only handle &lt; 2A.

<!--more-->

Update: the final versions of both devices are now available for purchase: [Sonoff](https://www.itead.cc/sonoff-wifi-wireless-switch.html) ($4.85 USD), [Slampher](https://www.itead.cc/slampher-wifi-wireless-light-holder.html) ($8.50). This review, however, is still of the pre-release versions.

## Slampher

![Slampher side](/img/blog/itead/slampher-side.jpg)![Slampher button](/img/blog/itead/slampher-button.jpg)

<img class="right" src="/img/blog/itead/slampher-installed.jpg" alt="Slampher installed"/> Even though the instructions were written in somewhat broken english, installing the Slampher could hardly have been easier: just unscrew a light bulb, screw in the Slampher, screw the lightbulb back in. 
It will make your bulb stick out a few inches further from the socket and may not fit every socket, but the Ikea "Morup" paper globe lamp I used was perfect: plenty of space + an adjustable socket height.

Switching on and off is silent, so it presumably uses a solid state relay to control the A/C power.

There's a small status light inside of the Slampher - but since the material is opaque, I didn't even notice it at first. 
However, you can see it if you look through the hexagon dot pattern on the light bulb-side of the device, and it is helpful for figuring out the status of the device.

<img class="left" src="/img/blog/itead/remote.jpg" alt="remote" /> Setting up the 433mhz remote took a few attempts, but I was able to get it paired to my light fairly quickly. 
Actually using it, however, takes some patience: the lamp only seems to respond to about half or less of my button presses (although holding the button down for a second or so seems to help).


The remote does work through walls as advertised, but the range isn't great and, confusingly, seems to be longer for turning the light on than for turning it off:
I can turn the light on from one room over or even down the hallway, but I have to be within 2-3 meters of the lamp to turn it off with the remote.


While the keychain remote is less than perfect, the Wi-Fi control is downright frustrating at times. For starters, there's the account creation process.
You have to create an account to use the app, which I can understand in light of the sharing features in the app, but I still think it should't be required just to control a local device. 

When you put the Slampher into Wi-Fi pairing mode, it hosts it's own Wi-Fi access point and the e-Welink Android app finds it right away, lets you enter credentials, and then waits 30 or so seconds and fails with the message "device over time ,please try again".
I only figured out the trick to make it work when I accidentally canceled it after entering credentials - the next pairing attempt worked. 
My best guess is that something in the Slampher takes too long, but if you cancel and restart the pairing process in the app then the Slampher finishes the first pairing while the app thinks it's waiting on the second attempt.

After I managed to pair the Slampher, I was able to successfully control it from my phone. 
There's a slight delay from when you tap the button on the phone to when the light pops on, and a more noticeable delay before the UI of the phone app actually updates.
The worst issue, though, is that the Slampher seemed to be offline quite frequently for the first couple of days. To resolve this I have to walk over, unplug it, and plug it back in, then wait a few seconds for it to connect. 
However, more recently it's proven to be more reliable, so perhaps a software update came out while I was reviewing it.


![Slampher off](/img/blog/itead/slampher-off.jpg)![Slampher remote](/img/blog/itead/slampher-remote.jpg)![Slampher on](/img/blog/itead/slampher-on.jpg)

## Sonoff

As I mentioned before, the Sonoff is essentially the same product as the Slampher, except with screw terminals and a beefier mechanical relay. The status light is on the surface of the device and much easier to see.

Installation requires that you cut and strip your wires, insert them into the slots, then tighten the screws. 
There's also a pair of green plastic pieces that you can screw down to give your wires a little extra grip and cover up any exposed portion, but my evaluation unit didn't include any screws to hold them in place.

![Sonoff installation](/img/blog/itead/sonoff-installation.jpg)

All told, installation is still fairly easy, but it's notably more "destructive" than the Slampher - you can't just remove and forget it if you change your mind, you'll have to do some rewiring. 
With that in mind, I decided to just add standard male and female AC plugs to the both ends of my Sonoff.

Pairing went similarly to the Slampher - the keychain remote took a few attempts and the Wi-Fi required some trickery. 
Wi-Fi control is essentially the same, however it does seem to respond better to the keychain remote. 
I can turn it on and off from across my house, and while it doesn't respond to every single click, it does respond to most.

In the final shipping version of the Sonoff, I would recommend that ITEAD include the screws for the plastic covers and perhaps even some basic AC connectors appropriate for whatever part of the world the buyer is in.

## e-Welink software

<img class="right" src="/img/blog/itead/software-error.png" alt="software error" /> In addition to initial device setup, the e-Welink software on Android (I think it's eWeLink without the hyphen on iPhone) allows you to schedule one-time and recurring timers to turn the device on or off and share access with other users. 
Your account is tied to your cell number (they use a SMS to verify it), and you can share access with other users via their cell number. 

As I mentioned before, the sharing is cool but I don't think you should be required to have an account and verify your phone number just to use the light on your local network.
Part of the catch is that even when your phone and Sonoff/Slampher are on the same network, they still communicate over the internet through ITEADs servers.
I'm sure this was simpler for ITEAD to impliment, but I would have preferred direct no-internet communication when possible. 
For starters, it should be faster just more reliable, especially when the online option is still there as a fallback.

Currently there does not appear to be any API or programability beyond the basic timers, which is a bit of a shame. 
I'd love to, for example, be able to automatically turn my lights on at sunset instead of at a fixed time each day.
Or hook the Sonoff up to my whole house fan and have it automatically turn off once the house's temperature has dropped to match the outside temperature.
There's a lot of potential here, and I hope ITEAD decides to open this up more. 

## Summary

All of the pieces are there and, with a few big caveats, both the Slampher and Sonoff work as advertised. 
Neither of these devices are ready for prime time yet, but hopefully ITEAD will use the ~1.5 months left in their campaign to resolve the various connectivity issues and add a little polish.

![Remote, Slampher, Sonoff](/img/blog/itead/sonoff-slampher-bg.jpg)
