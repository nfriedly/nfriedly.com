---
title: Power measurements for the PowKiddy V90, RGB10 Max, Anbernic RG351P, and GPD Win Max
heading: Power measurements for handheld gaming systems
subHeading: PowKiddy V90, RGB10 Max, Anbernic RG351P, GPD Win Max

headerImage: /img/blog/power-draw/header-bg.jpg

featured: false

tags:
 - hardware
 - retro-handheld
---

I used a [Multifunctional USB Digital Tester](https://www.adafruit.com/product/4232) to record the power draw of a few handheld retro gaming devices. I've previously posted a lot of this information in various threads on reddit, but I've decided to collect them here as the new canonical source.

* [PowKiddy V90](#powkiddy-v90)
* [PowKiddy RGB 10 Max](#powkiddy-rgb10-max)
* [Anbernic RG351P](#anbernic-rg351p)
* [GPD Win Max](#gpd-win-max-1st-gen-)

<!--more-->

# PowKiddy V90

<img class="right" src="/img/blog/power-draw/v90.jpg" alt="PowKiddy V90" /> I was curious why my [V90](https://powkiddy.com/products/powkiddy-v90-3-inch-ips-screen-flip-handheld-console-dual-open-system-game-console-16-simulators-retro-ps1-kids-gift-3d-new-game) seemed to die within a few hours if I did a software shutdown but didn't flip the power switch, so I got out a USB-C power meter and took some measurements of the power draw in different scenarios.

## Interesting tidbits

* Gaming is going to draw give-or-take 1W, depending more on screen brightness than anything else.
   * Volume is second place for determining power draw, system and game complexity doesn't seem to have much effect.
   * The range seems to be about 0.7 - 1.3W.
* [Miyoo] draws a little less power than the stock firmware in the menu, Suspend, and software shutdown modes. About the same in gaming.
* Software shutdown draws slightly *more* power than suspend mode (?)
* Both are essentially the same reduction you'd get from just turning off the display while in the menu - the CPU seems to continue operating at full speed.
* The battery charges at about 2.5W
* The maximum power it will draw from the wall, when gaming and charging, is around 3.5W

This was connected to an official raspberry Pi USB-C power supply - I chose this one because it's rated for over 15W, and it provides power regardless of what's connected to it.

(Amusingly, the initial batch of [Raspberry Pi 4's had the same issue](https://hackaday.com/2019/07/16/exploring-the-raspberry-pi-4-usb-c-issue-in-depth/) as the V90 where they wouldn't charge from a USB-C port. But, unlike Powkiddy, the Raspberry Pi foundation quickly fixed that mistake.)

Update: I [added the missing resistors](/techblog/2021-10-10-v90-usb-c/) and fixed USB-C charging on mine!

## More details

### When playing Crash Bandicoot on PS1

* Maximum power draw was 1.3W with the screen brightness and volume maxed out. The power ranged from about 1.1W to 1.3W depending on how loud the ambient noise in the game was (I was standing by the beech.)
* With the volume turned down to 0 and the brightness at the lowest visible setting, it went down to 0.68W

### When playing Asteroids for Game Boy

* Power draw ranged from 0.73 to 1.15, depending on volume and brightness.
* It didn't seem to get as loud as Crash Bandicoot, even at maximum volume.

### Stock Firmware vs Miyoo Custom Firmware

* Menus are lower in [Miyoo], 0.62-0.89W, depending on brightness. 0.47W if you turn the brightness down to 0.
   * Stock Firmware is about 1.09W in the menu, I'm not sure how to change the brightness.
* Suspend mode draws 0.47W steadily in Miyoo (same as awake but screen off)
   * Stock draws 0.68W in suspend mode.
* After a software shutdown but before flipping the switch, it draws 0.47-0.52W in Miyoo.
   * Stock draws 0.68-0.73W.
   * (In both cases, it bounced between those two numbers. The real number is probably somewhere in between, but my meter isn't quite precise enough to detect it.)
* In-game was about the same with the stock also going up to 1.3W

([Original Post](https://www.reddit.com/r/SBCGaming/comments/pejfl3/v90_power_draw_information/))

# PowKiddy RGB10 Max

![PowKiddy RGB10 Max](/img/blog/power-draw/rgb10-max.jpg)

I took some measurements of the power draw of the [PowKiddy RGB10 Max](https://powkiddy.com/products/powkiddy-rgb10-max-handheld-game-players) (running the OGS build of EmuELEC 4.2), here's a few interesting take-aways:

* The on-screen battery charge level is slow to update. Based on my measurements, it actually stopped charging when it was reporting 73% charged. Later on it reported 100%.
* In EmulationStation, the power draw depends on how much activity is on screen. 
  * A basic screen draws ~1-2W
  * A screen with video playing and scrolling text draws 2~3.5W
* When gaming, power draw depends somewhat on the game. 
  * The Legend of Zelda on NES draws 1-2W
  * Valkyria Chronicles 2 on PSP draws ~1.5-2.5W in 2D parts and 2-3W in 3D parts
* In general, the power draw is very jumpy when awake, going up and down from one second to the next
* Brightness and volume seems to have a fairly small effect. I'm sure they make some difference, like maybe 0.15W to go from 5% brightness to 100%, but it mostly seems to be getting lost in the noise.
* **Wi-Fi does make a noticeable impact**, something like 0.5-1W of additional power draw
* When in sleep mode, the power draw is a steadily ~0.26W (with the battery installed but at 100%). Wi-fi does not cause any additional power draw when the unit is sleeping.
* The highest power draw I saw when it was sleeping and charging was 4.4W, but the battery was already fairly full. So it may draw more when the battery level is lower. Charging rate  decreased over time, as the battery was approaching 100% charged (despite the UI claiming 73% every time I checked).

Unlike when [I tested my V90](#powkiddy-v90), I did not remove the battery from my RGB10 Max during testing, so it may be contributing somewhat to the "noise" I mentioned above. 

([Original Post](https://www.reddit.com/r/SBCGaming/comments/pjv0fu/powkiddy_rgb10_max_power_draw_measurements/))
# Anbernic RG351P

The [Anbernic RG351P](https://anbernic.com/products/rg351p-anbernic-retro-game-ps1-rk3326-64g-open-source-system-3-5-inch-ips-screen-portable-handheld-game-console-rg351gift-2401) has the same CPU as the above RGB10 line, so these number should be inline with the above device, or perhaps a little lower due to the smaller screen.

![Anbernic RG351P](/img/blog/power-draw/rg351p.jpg)

Recorded numbers are power draw from wall, with the battery disconnected.

* Off: 0.21W 🤷‍♂️

## Stock Firmware
* Home screen, 100% brightness: 1.77-1.87W
* In-game in Ridge Racer for psp: 2.39-3.88W
* Sleeping: 0.21-0.31W

### With Wi-Fi dongle attached 
* Home, stock wifi attached: 2.08-2.39W, one spike to 3.12
   * This seems to break the controls sometimes, I think when it is in the OTG port but not when it's in the DC port (?)
* Home, 3rd-party 2.4/5Ghz wifi attached, connected to 2.4ghz: 2.49-2.65W
	* Sleeping: 0.21-0.31w
* Internal wifi power goes from 3.3v with screen on to 0v when sleeping
* It also goes to 0v when "enable wifi" is turned off in the menu

## 351Elec Firmware
* Home
   * 100% brightness: 1.71-1.82W after settling down (initial spikes up to 2.29W while browsing through)
   * 1% Brightness: 1.46-1.51W
* Sleeping: 0.21-0.31W
* Internal wifi power goes from 3.3v with screen on to 0v with screen off
* However, it remains at 3.3v with the screen on when "enable wifi" is turned off in the menu. So an internal dongle will always draw power on 351Elec, vs only drawing power when in use on the stock firmware. I [opened a ticket](https://github.com/351ELEC/351ELEC/issues/624), but it was closed as "won't fix".


### With Wi-Fi
* Factory wifi dongle
   * 1% brightness: 1.25-2.66W, mostly 1.7-2
   * 100% brightness: 1.92-2.39W
   * WiFi dongle also seems to break the controls in 351Elec sometimes
* 3rd-party wifi, 100% brightness 
   * Enabled, not connected: 2.34-2.44
   * Disabled in menu: no change
   * Connected to 2.4 ghz: 2.34-2.39
   * Sleeping: 0.21-0.31w

# GPD Win Max (1st gen)

<img class="right" src="/img/blog/power-draw/gpd-win-max.jpg" alt="GPD Win Max" /> The [GPD Win Max](https://www.gpd.hk/gpdwinmax2021) is basically a small Windows laptop with active cooling, so it's in a completely different league than the above devices. Nonetheless, it's a handheld gaming device, so I think it fits here. (Note: that link is for the 2021 edition, I have the 2020 version, which has a previous-gen CPU, but is otherwise largely similar.) 

## Can it be charged with an Apple USB-C Charger?

Yes, it works fine. I just tested it with my 87 watt MacBook pro charger. My Win Max's battery is at about 50% and sleeping, and the power draw at the wall is 51w. I fired up Halo Reach in the power draw jumped all the way up to 85 watts.

But as far as I know, Apple follows the standards, so the GPD should work fine with any Apple laptop charger.

### What about a Nintendo Switch charger?
Nintendo did a really shoddy job with the USB-C power delivery on the Switch. Because they didn't follow the standard correctly, it's potentially a fire hazard, or more often just doesn't work with devices that do follow the standard.

I don't own a Switch, but I have tested my Win Max with a handful of other chargers, and everything 30 watts and higher that I tried seems to work fine. (Obviously the 30w one charges more slowly.)

([Original post](https://www.reddit.com/r/gpdwin/comments/in453a/charging_gpd_win_max_with_apple_usb_c_chargers/g462gur/))

## Are the Thunderbolt 3 and USB-C ports equivalent when it comes to charging?

I don't think so. For context, the GPD Win Max supports charging at 15v and 20v. The USB PD 1.0 specification allows the voltage to be negotiated to one of 5v, 12v, or 20v. The USB PD 2.0 spec split the 12v option into 9v and 15v. So the Win Max supports 20v only on the USB PD 1.0 spec, but both 15v and 20v on the USB 2.0 spec.

The USB-C (only) port definitely supports 15v charging, but the TB3 port sometimes gets stuck at 12v, and then it doesn't actually charge. My guess is that perhaps it only supports USB PD 1.0(?)

[Wayback machine link for my 27W charger](https://web.archive.org/web/20201220051812/https://www.amazon.com/AUKEY-Delivery-Ultra-Slim-Compatible-More-Black/dp/B07LBG1C3Q), since the amazon page seems to be dead now.

([Original post](https://www.reddit.com/r/gpdwin/comments/kp9jqw/gpd_win_max_cant_charge_from_the_genki_covert_dock/gi3ses1/))

[Miyoo]: https://github.com/TriForceX/MiyooCFW