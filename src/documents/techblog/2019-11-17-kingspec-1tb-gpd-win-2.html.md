---
title: KingSpec 1TB SSD review for GPD Win 2
subHeading: Bigger and better

headerImage: /img/blog/win2/win2-ssd.jpg

featured: false

tags:
 - hardware
 - review
---

<img class="left" src="/img/blog/win2/kingspec-1tb.jpg" alt="KingSpec SSD stock photo" /> The [GPD Win 2](https://gpd.hk/gdpwin2) is a small computer designed for gaming on-the-go. It has an upgradeable 128GB M.2 2242 SATA SSD. I decided to upgrade to a larger drive.

<!--more-->

I bought a [1 TB KingSpec SSD](https://www.aliexpress.com/item/Kingspec-120GB-HDD-22-42mm-NGFF-M2-SATA-SSD-Solid-State-Hard-Disk-Harddisk-Drive-for/32465074880.html?spm=a2g0s.9042311.0.0.7b364c4duOdIk5) for my Win 2 on Ali Express. The default free shipping option took 20 days to arrive. I also ordered an [M.2 USB enclosure](https://www.aliexpress.com/item/2015-New-products-Design-micro-hdd-box-usb-3-0-to-mSATA-2-5-suit-for/32506466451.html?spm=a2g0s.9042311.0.0.7b364c4duOdIk5) for the old drive which arrived the day after.

Installation was easy-peasy: unscrew the SSD cover, pop out the old drive, pop in the new drive, screw the cover back on.

I opted to go with a fresh install of Windows 10. You can download [Microsoft's Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows10) to make a bootable USB drive with the Windows 10 installer.

I rebooted with the windows 10 USB stick inserted, so it initially booted from that and then it automatically configured things to boot from the SSD after the install.

After the installation, Windows spent about 45 minutes downloading and installing updates.

Everything but the touchscreen worked automatically. I grabbed the [touchscreen driver](https://www.reddit.com/r/gpdwin/comments/8ichgg/gpd_win_2_touch_driver_march_2018_with_download/) that [u/mefaun](https://www.reddit.com/user/mefaun) posted and installed it without any trouble.

I installed Steam and a couple of games, and everything just worked.

## Benchmarks

Here's a couple of benchmarks from the new and old drives:

<div class="row">
  <div class="col-md-6">
  <p>KingSpec 1TB Crystal Disk Mark:</p>
  <p><img alt="KingSpec 1TB Crystal Disk Mark" src="/img/blog/win2/kingspec-1tb-cdm.png"/></p>
  </div>
  <div class="col-md-6">
  <p>Stock <a href="http://www.biwin.com.cn/en/">Biwin</a> 128GB Crystal Disk Mark:</p>
  <p><img alt="Stock Biwin 128GB Crystal Disk Mark" src="/img/blog/win2/biwin-128gb-cdm.png"/></p>
  </div>
</div>

Note that this wasn't a perfect apples-to-apples comparison, because the old drive was 85% full and SSD write speeds may decrease as the drive approaches 100% full. However, that's probably fairly representative of real-world usage (if not slightly less full than normal - I actually deleted 2 games to bring it down to 85%).

## Temperature

I do occasionally notice that the SSD cover is warm to the touch with the new drive. I don't recall that ever happening with the old one. However, it's just warm, not uncomforterably hot.

## Fixing the boot-shell bug

Sometimes, after messing with the SSD, the GPD Win 2's BIOS will revert to booting into a UEFI shell by default instead of booting from the SSD. This looks daunting, but is actually an easy fix:

* Turn the Win 2 off
* Turn it on and immediately start pressing [Delete] repeatedly until it loads the BIOS
* In the BIOS, navigate to the Boot tab with the arrow keys
* Set Boot Option #1 to Windows Boot Manager
* Press [F4] to save and exit

<div class="row">
  <div class="col-md-6">
  <p>Boot Shell Bug:</p>
  <p><img alt="UEFI shell" src="/img/blog/win2/uefi-shell.jpg"/></p>
  </div>
  <div class="col-md-6">
  <p>Set the first boot option to Windows in the BIOS:</p>
  <p><img alt="Stock Biwin 128GB Crystal Disk Mark" src="/img/blog/win2/bios.jpg"/></p>
  </div>
</div>

## Summary

In short, I'm very happy with the upgrade.

## 6 Month Update

Six months later the KingSpec SSD was still going strong; it hadn't given me any trouble at all. 

I sold my Win 2 shortly after that, so this is the last update I'll provide.
