---
title: JavaScript library and .swf for cross-domain flash cookies
author: nFriedly
layout: post
permalink: /2010/07/swf-for-javascript-cross-domain-flash-cookies/
categories:
  - Web Development
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
<p style="position:relative;">
  <img class="alignright size-full wp-image-295" title="325990_chocolate_chip_cookies_2" src="http://nfriedly.com/techblog/wp-content/uploads/2010/07/325990_chocolate_chip_cookies_2.jpg" alt="" width="300" height="224" />I&#8217;m working on a project that has a legitimate (non-spammy) reason to need cross-domain cookies, and we settled on flash as a good way to accomplish this.</p>
  
  <p>However, I was surprisingly unable to find any complete library or how-to guide for connecting flash cookies to javascript. So I dusted off my flash skills and built one, and and now you get to enjoy the fruit of my labor:
  </p>
  
  <p>
    <a href="http://github.com/nfriedly/Javascript-Flash-Cookies"><img style="position: absolute; top: 0pt; right: 0pt; border: 0pt none;" src="http://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub" /></a> <p>
      <!--more-->
    </p>
    
    <p>
      <a href="http://github.com/nfriedly/Javascript-Flash-Cookies/zipball/master"><img class="alignleft" src="/img/application_put.png" alt="" /> Download the .swf, .js, and source code from github</a>
    </p>
    
    <p>
      This is an .swf file that communicates with JavaScript via flash&#8217;s <a href="http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/external/ExternalInterface.html">ExternalInerface</a> to read and write to a Local <a href="http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/net/SharedObject.html">SharedObject</a> (LSO). Essentially, it&#8217;s cross-domain cookies for javascript.
    </p>
    
    <p>
      It also includes an (optional) javascript library that handles embedding, communication, error checking, and logging.
    </p>
    
    <p>
      The project is hosted at github: <a href="http://github.com/nfriedly/Javascript-Flash-Cookies">http://github.com/nfriedly/Javascript-Flash-Cookies</a>
    </p>
    
    <hr style="margin-top: 20px;" />
    
    <p>
      <em>You might also be interested in <a href="http://nfriedly.com/techblog/2010/08/how-facebook-sets-and-uses-cross-domain-cookies/">How Facebook Sets and uses cross-Domain cookies</a></em>
    </p>
    
    <hr />
    
    <h3>
      Working Example
    </h3>
    
    <p>
      See <a href="http://nfriedly.com/stuff/swfstore-example/">https://nfriedly.com/stuff/swfstore-example/</a> and <a href="http://nfriedly.github.com/Javascript-Flash-Cookies/">http://nfriedly.github.com/Javascript-Flash-Cookies/</a> for a working example.
    </p>
    
    <h3>
      Quick start guide
    </h3>
    
    <p>
      To use the library, upload the storage.swf & swfstore.js files to your web server and put this HTML and JavaScript into your web page(s):
    </p>
    
    <h4>
      The HTML
    </h4>
    
    <pre class="brush: xml; title: ; notranslate" title="">

&lt;!-- This example uses jquery, but SwfStore does not require jquery to work. --&gt;

&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"&gt;&lt;/script&gt;



&lt;script src="/PATH/TO/swfstore.js"&gt;&lt;/script&gt;



&lt;input id="dataInput" /&gt; &lt;input id="saveBtn" type="submit" value="Save" /&gt;



&lt;div id="status"&gt;&lt;/div&gt;

</pre>
    
    <h4>
      And The JavaScript
    </h4>
    
    <pre class="brush: jscript; title: ; notranslate" title="">



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

		swf_url: 'http://site.com/PATH/TO/storage.swf', 



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

</pre>
    
    <h3>
      Cross-domain usage
    </h3>
    
    <p>
      A copy of storage.swf located on one domain may be embedded on pages from one or more other domains, allowing cross-domain cookie access.
    </p>
    
    <h3>
      Troubleshooting
    </h3>
    
    <ul>
      <li>
        Be sure the <span class="highlight">urls</span> to the .swf file and .js file are both correct.
      </li>
      <li>
        If the .swf file is unable to communicate with the JavaScript, it will <span  class="highlight">display log messages on the flash object</span>. If debug is enabled, this this should be visible on the page.
      </li>
      <li>
        To <span class="highlight">hide the flash object</span> and disable the <span class="highlight">log messages appending to the bottom of the page</span>, set debug to false</span>. (Log messages are added to a div if no console is found).
      </li>
      <li>
        If the user does not have flash installed, the onerror function will be called after a (configurable) 10 second timeout. You may want to use a library such as <a href="http://www.featureblend.com/javascript-flash-detection-library.html">Flash Detect</a> to check for this more quickly. <span  class="highlight">Flash Player 9.0.31.0</span> or newer is required.
      </li>
      <li>
        If you pass a <span class="highlight">non-string data</span> as the key or value, things may break. Your best bet is to use strings and/or use <a href="http://json.org">JSON</a> to encode objects as strings.
      </li>
      <li>
        If you see the error <span class="highlight">&#8220;uncaught exception: Error in Actionscript. Use a try/catch block to find error.&#8221;</span>, try using &#8220;//&#8221; in the .swf URL rather than &#8220;https://&#8221;. See <a href="https://github.com/nfriedly/Javascript-Flash-Cookies/issues/14">https://github.com/nfriedly/Javascript-Flash-Cookies/issues/14</a> for more information.
      </li>
      <li>
        Do not set <code class="highlight">display:none</code> on the swf or any of it&#8217;s parent elements, this will cause the file to not render and the timeout will be fired. Disable debug and it will be rendered off screen.
      </li>
      <li>
        The error <code class="highlight">this.swf.set is not a function</code> has been known to occur when the FlashFirebug plugin is enabled in Firefox / Firebug.. </ul> <h3>
          Patches
        </h3>
        
        <p>
          Although my JS is solid, my Flash / ActionScript skills leave something to be desired. Patches to either are more than welcome at <a href="http://github.com/nfriedly/Javascript-Flash-Cookies">github</a> (preferred), or just leave a comment here if you&#8217;re not sure how to use github. (This comment has a <a href="http://nfriedly.com/techblog/2010/07/swf-for-javascript-cross-domain-flash-cookies/comment-page-1/#comment-2531">short walk through to using github</a>.)
        </p>
        
        <h3>
          Production Use
        </h3>
        
        <p>
          If you&#8217;re using SwfStore in a production site, feel free to leave a comment here with a link to the site. I turned off WP&#8217;s default rel=&#8221;nofollow&#8221;, so enjoy the link juice <img src='http://nfriedly.com/techblog/wp-includes/images/smilies/icon_wink.gif' alt=';)' class='wp-smiley' /> Reciprocal links are not required, but are always appreciated.
        </p>