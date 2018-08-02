---
title: JavaScript library and .swf for cross-domain flash cookies
author: nFriedly

url: /techblog/2010/07/swf-for-javascript-cross-domain-flash-cookies/
urls:
    - /2010/07/swf-for-javascript-cross-domain-flash-cookies/
headerImage: http://farm4.staticflickr.com/3438/3762193048_ecaa18a3a1_b.jpg
imageCredits:
	"Lightning header photo by John Fowler": http://www.flickr.com/photos/snowpeak/3762193048/
	"Flash Mob photo by JD Hancock" : http://www.flickr.com/photos/jdhancock/4317168441/
tags:
  - actionscript 3.0
  - cookie
  - cross-domain
  - externalinterface
  - flash
  - flashcookie
  - javascript
  - sharedobject
  - swf
featured: true
---

<img class="right" title="325990_chocolate_chip_cookies_2" src="/techblog/wp-content/uploads/2010/07/325990_chocolate_chip_cookies_2.jpg" alt="" width="300" height="224" />I&#8217;m working on a project that has a legitimate (non-spammy) reason to need cross-domain cookies, and we settled on flash as a good way to accomplish this.
  
However, I was surprisingly unable to find any complete library or how-to guide for connecting flash cookies to javascript. So I dusted off my flash skills and built one, and and now you get to enjoy the fruit of my labor:

<!--more-->

<div class="well well-large"><p>[<i class="fa fa-download"></i> Download the swf, js, and source code from github][zip]</p><p>Or install via <a href="http://bower.io">Bower</a>:</p><pre><code>bower install javascript-flash-cookies</code></pre></div>


This is an .swf file that communicates with JavaScript via flash&#8217;s <a href="http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/external/ExternalInterface.html">ExternalInerface</a> to read and write to a Local <a href="http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/net/SharedObject.html">SharedObject</a> (LSO). Essentially, it&#8217;s cross-domain cookies for javascript.

It also includes an (optional) javascript library that handles embedding, communication, error checking, and logging.

The project is hosted at github: http://github.com/nfriedly/Javascript-Flash-Cookies

<div class="well"><em>You might also be interested in <a href="/techblog/2010/08/how-facebook-sets-and-uses-cross-domain-cookies/">How Facebook Sets and uses cross-Domain cookies</a></em></div>

### Working Example

See <a href="/stuff/swfstore-example/">https://nfriedly.com/stuff/swfstore-example/</a> and <a href="http://nfriedly.github.com/Javascript-Flash-Cookies/">http://nfriedly.github.com/Javascript-Flash-Cookies/</a> for a working example.

### Quick start guide

To use the library, upload the storage.swf & swfstore.js files to your web server and put this HTML and JavaScript into your web page(s):

#### The HTML

    
``` html

<!-- This example uses jquery, but SwfStore does not require jquery to work. -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

<script src="/PATH/TO/swfstore.js"></script>

<input id="dataInput" /> <input id="saveBtn" type="submit" value="Save" />

<div id="status"></div>

```
    
#### And The JavaScript
    
``` js
// wait until the page has finished loading before starting

$(function(){
	// first disable things while the swfStore is initializing

	$('input').attr("disabled","disabled");

	$('#status').text('Loading...');
	var mySwfStore = new SwfStore({
		// Optional but recommended. Try to choose something unique.

		namespace: 'myExample', 
		// To work cross-domain, only one of your sites should have the

		// .swf, all other sites should load it from the first one

		swf_url: //site.com/PATH/TO/storage.swf', 
		// Logs messages to the console if available, a div at the

		// bottom of the page otherwise. 

		debug: true,
		onready: function(){

			// Now that the swfStore was loaded successfully, re-enable

			$('input').removeAttr("disabled");
			// Read the existing value (if any)

			$('#dataInput').val(mySwfStore.get('myKey'));
			// Set up an onclick handler to save the text to the 

			// swfStore whenever the Save button is clicked

			$('#saveBtn').click(function(){

				mySwfStore.set('myKey', $('#dataInput').val() );

				$('#status').text('Saved!')

			});
			$('#status').text('Loaded');

		},
		onerror: function(){

			// In case we had an error. (The most common cause is that 

			// the user disabled flash cookies.)

			$('#status').text('Error');

		}

	});

});

```
    
### Cross-domain usage

A copy of storage.swf located on one domain may be embedded on pages from one or more other domains, allowing cross-domain cookie access.

### Security notes

By default, any website on the internet can access the data stored in these flashcookies.

Also, versions prior to 1.9.1 were vulnerable to an XSS bug and should not be used.

### Troubleshooting <img src="http://farm3.staticflickr.com/2705/4317168441_0c4652aaf6_n.jpg" class="right" alt="Flash Mob">

* Be sure the <span class="highlight">urls</span> to the .swf file and .js file are both correct.
* If the .swf file is unable to communicate with the JavaScript, it will <span  class="highlight">display log messages on the flash object</span>. If debug is enabled, this this should be visible on the page.
* To <span class="highlight">hide the flash object</span> and disable the <span class="highlight">log messages appending to the bottom of the page</span>, set debug to false</span>. (Log messages are added to a `<div>` if no console is found).
* If the user does not have flash installed, the onerror function will be called after a (configurable) 10 second timeout. You may want to use a library such as <a href="http://www.featureblend.com/javascript-flash-detection-library.html">Flash Detect</a> to check for this more quickly. <span  class="highlight">Flash Player 9.0.31.0</span> or newer is required.
* If you pass a <span class="highlight">non-string data</span> as the key or value, things may break. Your best bet is to use strings and/or use <a href="http://json.org">JSON</a> to encode objects as strings.
* If you see the error `uncaught exception: Error in Actionscript. Use a try/catch block to find error.`, try using `//` in the .swf URL rather than `https://`. See <a href="https://github.com/nfriedly/Javascript-Flash-Cookies/issues/14">https://github.com/nfriedly/Javascript-Flash-Cookies/issues/14</a> for more information.
* Do not set `display:none` on the swf or any of it's parent elements, this will cause the file to not render and the timeout will be fired. Disable debug and it will be rendered off screen.
* The error `this.swf.set is not a function` has been known to occur when the FlashFirebug plugin is enabled in Firefox / Firebug...
	
### Bugs and patches

Bug reports and patches are always welcome at <a href="http://github.com/nfriedly/Javascript-Flash-Cookies">github</a> (preferred), or just send me an email. I'll also consider new features, but I'm generally going to prioritize keeping this library small and simple, so most new features will be refused.

[zip]: http://github.com/nfriedly/Javascript-Flash-Cookies/zipball/master
