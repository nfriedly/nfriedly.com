---
title: How to use XSLT to style an RSS feed
author: nFriedly

url: /techblog/2009/06/how-to-use-xslt-to-style-an-rss-feed/
urls:
    - /2009/06/how-to-use-xslt-to-style-an-rss-feed/
headerImage: https://farm3.staticflickr.com/2103/2205813608_e9b0db0c05_b.jpg
imageCredits:
	"SOC GX-34 GunBuster photos by GogDog": http://www.flickr.com/photos/gogdog/sets/72157603753867140/with/2240855570/
tags:
  - css
  - javascript
  - php
  - rss
  - xml
  - xslt
---
[<img class="alignright" src="https://farm3.static.flickr.com/2097/2240855570_4529cf9f6d_m.jpg" alt="Take this!" />][1]XSLT is a fairly well-supported technology. It allows you to take any XML file &#8211; including RSS &#8211; and *transform* it into a styled HTML document. It&#8217;s kind of like CSS on steroids.

Unfortunately, most browsers think they know better and go off and do their own thing on RSS feeds.

We&#8217;re going to look at how and which browsers can be brought into line, and how to use XSLT to improve the look of your RSS feed in those browsers.

<!--more-->

## The RSS problem

In most browsers, XML and XSLT are supported in every single case \*except\* RSS. By default, Internet Explorer, Firefox, Safari, and Opera all ignore XSLT files and do their own thing with RSS. In fact, Google Chrome is the \*only\* browser I tested that got it right without tinkering.

To their credit, Microsoft at least gave their users the option to turn off the &#8220;feature&#8221;. No other browser even gives this option.

During my tests, I have found a way to &#8220;trick&#8221; Firefox into rendering RSS with XSLT correctly. Currently there seems to be no solution for other browsers except to try and detect them on the server and send the user an HTML file if they&#8217;re in a browser that doesn&#8217;t work properly.

### Internet Explorer

IE requires that the user specifically choose to disable their take-liberties-with-rss &#8220;feature&#8221;. I would point out that this really isn&#8217;t good enough because 99% of users will never get that far, but sadly, it&#8217;s the closest thing to getting it right out of any browser on the market! (Aside from Google Chrome.)

Here&#8217;s how:

1.  Click on the **Tools** menu,
2.  Click on the **Internet Options** sub-menu,
3.  Click on the **Content** tab,
4.  Click on the **Settings** button of the **Feed** section to bring up Feed Settings dialog box,
5.  Un-check the **Turn On Feed Reading View** option.
6.  Click OK all the way to close all opened dialog boxes.
7.  Restart Internet Explorer

### [<img class="alignright" src="https://farm3.static.flickr.com/2172/2240065731_86c22f48c1_m.jpg" alt="Transform!" />][2]Firefox

Firefox can be tricked into working because it decides fairly early on in the rendering process whether to treat the page in a standard way or to fly off the handle with it. In fact, it makes this decision before even completely downloading the RSS file.

Because of the early decision process, we can insert 512 characters of white space in between the `<?xml ?>` declaration and the opening `<rss>` tag. Firefox is then &#8220;tricked&#8221; into doing the right thing and rendering the feed correctly.

## Working around it

Although not practical in most cases currently, I&#8217;ve included an example of a script that will take any RSS feed and add a style sheet to it.  It includes the hack to work in firefox and instructions for enabling it in Internet Explorer.

<https://github.com/nfriedly/rss-xslt>

Code for index.php:

``` php
<?php

// grab the url
if(isset($_REQUEST['url'])) $url = $_REQUEST['url'];
else $url = false;

// make sure the url is good (no local files)
if ($url && substr($url,0,7) != "http://") exit("Please start urls with 'http://'");

// make the stylesheet link
$xsl_file = 'xsl.php';

if($url) $xsl_file .= '?url='.urlencode($url);

define('XSL_LINK','<?xml-stylesheet href="'.$xsl_file.'" type="text/xsl" ?>');

// if we don't have a url, use the home page
if(!$url) $url = "home.xml";

// download the rss feed
$rss = file_get_contents($url);

// xml header so firefox doesn't decide it's text
header('content-type: text/xml');

//echo out the header right away, if there is one
if(substr($rss,0,6) == '<?xml '){
	$header_end = strpos($rss,'?>') +2;
	echo substr($rss,0,$header_end);
	$rss = substr($rss,$header_end);
}

//otherwise echo a default header:
else echo '<?xml version="1.0" ?'.'>';

// remove any existing stylesheet
$rss = preg_replace('/<\?xml-stylesheet([^?]|\?(?!>))*\?'.'>/','',$rss);  // uses lookahead

// add in our stylesheet
echo "\r\n" . XSL_LINK . "\r\n";

// toss in 512 bytes of nothing to throw off firefox
echo "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ";

//finally, pass along the content
echo $rss;

?>
```

The xsl.php file is only php to allow for setting the current url in the feed url input box. Ignoring that, you can view it&#8217;s source. You could simply save that as an .xml file and have a working copy.

You can also view the [CSS][3] and [Javascript][4] used to make everything look nice.

## Hire me for web development

Need an [expert web programmer][5] to research and solve some off-the-wall problem like this? I&#8217;m available. I&#8217;m good solving run-of-the-mill problems too &#8211; [Javascript and AJAX development][6] is my specialty. [Get in touch with me][7] for more information and a free quote.

 [1]: http://www.flickr.com/photos/gogdog/2240855570/
 [2]: http://www.flickr.com/photos/gogdog/2240065731/
 [3]: /stuff/rss/theme/style.css
 [4]: /stuff/rss/scripts.js
 [5]: /portfolio
 [6]: /portfolio/#javascript
 [7]: #contact

 *[XSLT]: Extensible Stylesheet Language Transformations
