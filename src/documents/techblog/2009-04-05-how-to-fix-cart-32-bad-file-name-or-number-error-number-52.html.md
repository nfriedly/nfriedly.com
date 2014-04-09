---
title: How to fix Cart 32 "Bad file name or number Error Number = 52"
author: nFriedly
layout: post
url: /techblog/2009/11/how-to-fix-cart-32-bad-file-name-or-number-error-number-52/
urls:
    - /2009/04/how-to-fix-cart-32-bad-file-name-or-number-error-number-52/
headerImage: http://farm9.staticflickr.com/8453/7968029824_1d1eb20771_b.jpg
imageCredits:
	"Header shopping cart photo by r. nial bradshaw" : http://www.flickr.com/photos/zionfiction/7968029824/
lightbox:
  - 1
tags:
  - bugfix
  - cart32
---
<a href="http://nfriedly.com/techblog/wp-content/uploads/2009/11/cart32-error.png" rel="lightbox"><img class="alignleft size-medium wp-image-244" title="cart32-error" src="http://nfriedly.com/techblog/wp-content/uploads/2009/11/cart32-error-300x202.png" alt="cart32-error" width="300" height="202" /></a>One of our Cart32 websites started having a problem recently where it would work great all the way until the last page of the checkout process, where it would give the error &#8220;Bad file name or number Error Number = 52&#8243;.

Even worse, it charged the customers credit card each time, so a persistent customer could wind up with multiple charges which you would need to undo!

<!--more-->

## The Fix

<a href="http://nfriedly.com/techblog/wp-content/uploads/2009/11/cart32-fix.png" rel="lightbox"><img class="size-medium wp-image-245 alignright" title="cart32-fix" src="http://nfriedly.com/techblog/wp-content/uploads/2009/11/cart32-fix-300x235.png" alt="cart32-fix" width="300" height="235" /></a>Cart32&#8242;s support was not particularly helpful (both the [Knowledge Base][1] and their phone support), but fortunately the fix was not very hard. The error basically means that it had trouble opening some file.

In our case the name of the file that orders were saved in (**Orders > Order Setting > Order Output File**) had gotten goofed and was set to the url of the website. The fix was to change it back to &#8220;**orders.txt**&#8220;.

## Did it work for you?

Please let me know if you found this helpful. If you have some other website issue, cart 32 related or not, [I may be able to help][2].

Doing impossible things with [JavaScript and AJAX][3] is my specialty.  My contact info is in the footer.

 [1]: http://www.cart32.com/kb.asp
 [2]: http://nfriedly.com/webdev
 [3]: http://nfriedly.com/webdev/javascript
