---
title: Why some users can't see a https website
author: nFriedly

url: /techblog/2009/06/users-cant-see-https-website/
urls:
    - /2009/06/users-cant-see-https-website/
headerImage: http://farm3.staticflickr.com/2197/2333040774_bb03ca472a_b.jpg
imageCredits: 
	"Transparent screen photo by patstip" : http://www.flickr.com/photos/24468787@N05/2333040774/
tags:
  - bugfix
  - https
  - security
  - ssl
  - tls
---
<img class="alignleft size-thumbnail wp-image-41" title="lock_small" src="http://nfriedly.com/techblog/wp-content/uploads/2009/06/lock_small-128x150.jpg" alt="lock_small" width="128" height="150" />Recently a client of mine had me pulling my hair out trying to figure out why some users couldn&#8217;t see the the secure https sections of their website.

As it turned out,  the server had been upgraded to TLS only for PCI-compliance, and some users had TLS disabled.

This article goes in to the how, they why, and the solution to fix https websites that aren&#8217;t showing up for some users.

<!--more-->

## The Change

Recently a client of mine made some changes to their secure server in order to comply with <acronym title="Payment Card Industry">PCI</acronym> regulations.

The rather cryptic error the PCI compliance scan gave was

> **Synopsis** : The remote service supports the use of weak SSL ciphers.
>
> **Description** : The remote host supports the use of SSL ciphers that offer either weak encryption or no encryption at all.
>
> **See also** : http://www.openssl.org/docs/apps/ciphers.html
>
> **Solution**: Reconfigure the affected application if possible to avoid use of weak ciphers.
>
> **Risk Factor**: Medium  / CVSS
>
> **Base Score** : 5.0 (CVSS2#AV:N/AC:L/Au:N/C:P/I:N/A:N)
>
> **Plugin output** :
>
> Here is the list of weak SSL ciphers supported by the remote server :
>
> Low Strength Ciphers (&lt; 56-bit key) SSLv3 EXP-RC2-CBC-MD5 Kx=RSA(512) Au=RSA Enc=RC2(40) Mac=MD5 export EXP-RC4-MD5 Kx=RSA(512) Au=RSA Enc=RC4(40) Mac=MD5 export
>
> The fields above are : {OpenSSL ciphername} Kx={key exchange} Au={authentication} Enc={symmetric encryption method} Mac={message authentication code} {export flag}</pre>

They disabled <acronym title="Secure Socket Layer">SSL</acronym> 3.0 and lower in IIS and set it to only accept <acronym title="Transport Layer Security">TLS</acronym> connections. (TLS is essentially SSL 4.0). This allowed them to pass the PCI compliance, but brought on new issues.

## The Problem

Immediately after making this change, they began to get complaints from a few users who could no longer see the secure sections of their website.

Most of these users were on older versions of Internet Explorer, so they were first asked to upgrade to the<a rel="nofollow" href="http://www.microsoft.com/windows/internet-explorer/"> latest version</a>. This didn&#8217;t fix the issue for most of them.

## The Fix

After some digging around, I learned the IE has settings for disabling SSL & TLS.

1.  In Internet Explorer on the **Tools** menu, choose **Internet Options**.
2.  Go to the **Advanced** tab.
3.  Scroll all the way to the bottom and check &#8216;**Use <span class="il">TLS</span> 1.0**&#8216;
4.  Click Ok. You may need to restart your browser.

I have *no idea* why that would ever get unchecked, but apparently it happens.  It&#8217;s also worth noting that upgrading to a newer version keeps the old settings intact.

## Need help with a secure website?

I have significant experience in [e-commerce][1] and other security heavy areas.  If you need [secure web development][1], I can probably help you out.  I understand https from the high level implementation right down to the [bits and bytes][2] (.doc file).

 [1]: http://nfriedly.com/webdev
 [2]: http://nfriedly.com/stuff/Nathan_Friedly_SSL_TLS.doc
