---
title: How AJAX Security and Twitter callbacks work
author: nFriedly
layout: post
permalink: /2009/06/javascript-security-ajax-json-and-twitter-callbacks/
categories:
  - Web Development
tags:
  - ajax
  - javascript
  - json
  - security
  - twitter
---
<img class="alignleft" title="Breaking javascript - the right way" src="http://www.sxc.hu/pic/m/s/si/simonok/323276_game_of_pool.jpg" alt="" width="141" height="188" />The twitter callback feature is nice &#8211; it makes it extremely easy to to add a twitter feed to a page. But to get the most benefit out of it, you really need to understand what it&#8217;s doing.

We&#8217;re going to look at how AJAX security works, specifically the Same Origin Policy, how Twitter gets around it, and the type of callback that twitter uses.

Note: the callback that twitter uses is entirely different from callback in the sense of passing a javascript function around as a variable. We&#8217;ll look at that in a future article.

<!--more-->

## AJAX Security

The XMLHTTPRequest Object, which is the javascript object used to make AJAX requests, has a &#8220;[Same Origin Policy][1]&#8221; which basically means that javascript on site1.com cannot use AJAX to directly load data from site2.com. This is a security feature, as it makes XSS (Cross-Site Scripting) attacks more difficult.

Worth noting, if the website is at site1.com, no scripts can communicate with any other site, even if the script was loaded from site2.com.

## Work Arounds

There are a number of workarounds including iframes, java applets, and flash, but here&#8217;s a couple of the more common methods.

### <img src="http://www.sxc.hu/pic/m/c/cw/cwmgary/486891_all_lined_up.jpg" alt="Line em up!" class="alignright" />Proxying Requests

The way proxying works is to have a file on your server that grabs the data from a remote server and passes it along. Then for javascript, the data appears to be coming from your server, even though it actually originated at a remote server. This is what the Fancy part of my [twitter demo][2] does.

We&#8217;ll look at using a proxy to get remote data in a future article.

### Remotely hosted javascript files

Scripts stored on other websites can be included on a page. As long as the script doesn&#8217;t need to call home after the initial load, everything works great. This is how a basic twitter function works: you load a script from twitter&#8217;s website and it communicates with your site via the callback feature. This is what the Simple part of my [twitter demo][2] does.

Here is a very basic page that uses Twitter&#8217;s callback feature and a remotely loaded javascript file to show my twitter status &#8211; remote data &#8211; on my website, by interacting with local javascript.

<pre class="brush: xml; title: ; notranslate" title="">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"  dir="ltr" lang="en-US"&gt;

&lt;head&gt;
&lt;title&gt;Simple Twitter Status&lt;/title&gt;

&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;My Twitter Status:&lt;/h1&gt;

&lt;div id="twitter_status"&gt;Loading...&lt;/div&gt;

&lt;!-- Put scripts down here for speed --&gt;

&lt;!-- this must come before we load the twitter script --&gt;
&lt;script type="text/javascript"&gt;

function showStatus(json){

	json = json[0]; // we only care about the most recent status;

	var myDiv = document.getElementById('twitter_status');

	myDiv.innerHTML = '&lt;img src="'
		+ json.user.profile_image_url
		+ '" style="float:left; margin:5px 10px 10px 0"&gt;'
		+ json.text;
}
&lt;/script&gt;

&lt;!-- now load the twitter file --&gt;
&lt;script type="text/javascript"
src="http://twitter.com/statuses/user_timeline/nfriedly.json?count=1&amp;callback=showStatus&amp;random=&lt;?php echo time(); ?&gt;" /&gt;
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;
</pre>

You can see a live copy of this code at <http://nfriedly.com/demos/twitter-extra-simple>.

## Digging into Twitter&#8217;s callback method

Below is a trimmed down example of what Twitter&#8217;s API sends back when we make the request in the example above.

<pre class="brush: jscript; title: ; notranslate" title="">showStatus([{"in_reply_to_screen_name":null,"text":" [ Lots of information that I'm omitting because it's not the point. ] "]);
</pre>

Now, don&#8217;t worry about the jazz in the middle, just look at that showStatus(); that&#8217;s wrapped around it. First of all, how does Twitter even know that we have a function named show status? Because we said so in the url to the file -see how we added `&callback=showStatus`? That&#8217;s where the magic is.  (Ok, technically we said `&amp;` not just `&`, but that was just to pass XHTML validation. )

<img class="alignright" title="The break!" src="http://www.sxc.hu/pic/m/l/lj/ljweb/490307_pool_break.jpg" alt="" width="300" height="168" />

### Cross-domain!

There&#8217;s a second important thing going on here &#8211; javascript from two different domains are interacting with each other. This is allowed because of how the Same Origin Policy works &#8211; everything is restricted to the local domain, but that means that everything can work together on the same plane.

### It&#8217;s a beautiful thing

I hope this gave you a little bit better understanding of how AJAX security works and how Twitter gets around it and is still able to interact with your site. In the future, I&#8217;ll have an article on how &#8220;traditional&#8221; callbacks work that will use jQuery and more AJAX to dive a bit deeper into the topic.

## Javascript Ninja for Hire

I have [extensive experience][3] working with AJAX, Twitter, and related technologies. I&#8217;m just the man you need to make your next [javascript development][4] project shine!

 [1]: https://developer.mozilla.org/En/Same_origin_policy_for_JavaScript
 [2]: http://nfriedly.com/demos/twitter
 [3]: http://nfriedly.com/portfolio
 [4]: http://nfriedly.com/webdev