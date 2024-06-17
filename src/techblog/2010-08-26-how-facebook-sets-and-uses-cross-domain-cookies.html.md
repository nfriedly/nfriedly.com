---
title: How Facebook sets and uses cross-domain cookies
author: nFriedly

url: /techblog/2010/08/how-facebook-sets-and-uses-cross-domain-cookies/
urls:
    - /2010/08/how-facebook-sets-and-uses-cross-domain-cookies/
headerImage: https://farm9.staticflickr.com/8184/8441826101_551240bc4f_b.jpg
tags:
  - cookie
  - cross-domain
  - facebook
  - howto
  - javascript
featured: true
---
<img class="alignleft" alt="" src="/img/portfolio/facebook.png" />I&#8217;ve seen a lot of confusion about this lately, so I thought I&#8217;d make a quick writeup to explain how facebook does it. (I&#8217;ll also give a quick tip on how you can do it yourself.)

### What Facebook Does

Facebook is in a unique position compared to many developers looking to set cross domain cookies: The user visits both facebook.com and the other website.

<!--more-->

<img src="https://farm9.staticflickr.com/8456/7890051894_64a3a7796f.jpg" alt="Picture frames" title="Framed!" class="right" /> Facebook never actually sets cookies cross-domain, they only read cookies cross-domain. They set cookies on facebook.com when the user visits facebook.com and they set cookies on the other example.com (or any other website) when the user visits example.com.<sup><a href="#note-1">1</a></sup>

Doing things this way avoids all of the browser security issues because cookies that were already set when the user visited facebook.com can still be read when example.com loads facebook.com in an iframe. This is worth repeating: **Cookies can be read in an iframe if they were set outside of the iframe**.<sup><a href="#note-2">2</a></sup>

### What about when the user is not logged into Facebook?

**(This is how you can do it!)**

If the user is not logged into Facebook when trying to use Facebook on example.com, then Facebook opens a popup window &#8211; not an iframe &#8211; to let the user log in.

A popup window has none of the cookie restrictions that iframes get; it can read and set cookies normally.

### What about popup blockers?

Most popup blockers make a special exception for &#8220;intentional&#8221; popups &#8211; ones that occur as a direct result of a user&#8217;s click. When the user clicks the login button, the blocker allows the popup because the click indicates that the user wanted that popup.

### Cross-domain communication

If you need to communicate between domains, [modern browsers][1] allow you to use [postMessage][2] to send data between web pages (although it [doesn&#8217;t work with popups in Internet Explorer][3]).

If you need to support older browsers, you can include the excellent [easyXDM][4] library for iframe-parent communication. You might need to combine a popup + one or more iframes in some situations.

### An alternate method for of cross-domain cookies: flash <img src="https://farm5.staticflickr.com/4063/4698846940_7043976b6f_n.jpg" alt="THE Flash" class="right">

If you&#8217;re looking for a flash-based method of setting cross-domain cookies, or would otherwise like to avoid popups, you may want to check out my previous article, which includes source code: [.swf for JavaScript cross-domain flash cookies][5]

### Notes

1.  <a name="note-1"></a>Cookies are only set on example.com when using the using [Facebook&#8217;s JavaScript SDK][6]. When embedding Social plugins directly as an iframe, only facebook.com cookies are used.
2.  <a name="note-2"></a>Safari sometimes prevents JavaScript from reading cookies in an iframe even if GET and POST requests to the server have full access to the cookies. Safari has several quirks like this, but generally [behaves better with iframes if the user *interacts* with it][7].

## Need a more advanced integration than what Facebook Social Plugins provide?

At [Sociable Labs][8], our Intelligent Social Plugins<sup>TM</sup> increase social sharing by 15x and have shown a ~1% increase in sales. And the best part is that [we do all of the hard work for you!][9]

<p class="meta"><small class="photocredits"><b>Photo Credits:</b> 
Gorge du Verdon photo by <a href="http://www.flickr.com/photos/73886193@N06/8441826101/in/photostream/">Eksley</a>,
Picture frames photo by <a href="http://www.flickr.com/photos/elsie/7890051894/">Elsie esq.</a>,
Flash photo by <a href="http://www.flickr.com/photos/jdhancock/4698846940/">JD Hancock</a></small></p>

 [1]: http://caniuse.com/#feat=x-doc-messaging
 [2]: https://developer.mozilla.org/en-US/docs/DOM/window.postMessage
 [3]: http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx
 [4]: http://easyxdm.net/
 [5]: /techblog/2010/07/swf-for-javascript-cross-domain-flash-cookies/
 [6]: http://developers.facebook.com/docs/reference/javascript/
 [7]: http://anantgarg.com/2010/02/18/cross-domain-cookies-in-safari/
 [8]: http://sociablelabs.com
 [9]: http://www.sociablelabs.com/product.html
