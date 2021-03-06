---
title: 'Search Engine Optimization and Marketing (SEO & SEM)'
author: nFriedly

url: /techblog/2009/06/users-cant-see-https-website//2009/06/search-engine-optimization-and-marketing-seo-sem/
urls:
    - /2009/06/users-cant-see-https-website//2009/06/search-engine-optimization-and-marketing-seo-sem/
headerImage: https://farm6.staticflickr.com/5550/9195944224_611dc4dc79_b.jpg
imageCredits: 
	"Header crown photo by jason train" : http://www.flickr.com/photos/98004108@N03/9195944224/
categories:
  - Web Development
tags:
  - marketing
  - sem
  - seo
---
<p><img class="size-thumbnail wp-image-78 alignright" title="King Philip III of Spain" src="/techblog/wp-content/uploads/2009/06/king_felipe_iii-150x150.jpg" alt="King Philip III of Spain" width="150" height="150" />SEO and SEM is all the rage these days.  You can do all kinds of modifications to your website, but the age-old adage still holds true:</p>
<h2>Content is king.</h2>
<p>Unique, interesting, well-written content is what makes your site stand out. Well written content will have key words, but won&#8217;t feel spammy. It will naturally attract high quality links back to it.</p>
<p>That said, there are <strong>several factors you can keep in mind while writing your content</strong>&#8230;</p>
<p><!--more--></p>
<h2>When it comes to SEM, links rule the roost.</h2>
<p>One high quality link to your website is more valuable than 100 directory listings. (With a couple of specific exceptions, more on that below.) When you write fresh quality content, people will link to you and search engines will like you.  Writing on interesting topics and linking to others will often encourage links back to your site.</p>
<h3>Most directories and link exchanges are worthless.</h3>
<p>The few exceptions include <a href="http://www.dmoz.org/">DMOZ</a>, <a href="http://www.lii.org/">LII</a>, and <a href="http://dir.yahoo.com/">Yahoo Directory</a>.  The others might bring in a visitor every once in a while, but by and large get completely ignored.</p>
<h3>How to get high-quality incoming links?</h3>
<p>Back to the first point: content is king. I think LifeDev.net said it best:</p>
<p><a href="http://lifedev.net/2011/03/shortest-seo-guide/"><img src="https://s3.amazonaws.com/static.lifedev.net/media/images/Shortest+Guide+To+Seo+-+create+something+worth+linking+to.jpeg" alt="Create something that people will want to link to. Repeat." /></a> </p>
<h2>Make the most of those incoming links.</h2>
<p>Ideally, you want to get these items in place before people start linking to you. Otherwise there&#8217;s a lot more work on the juicy links step.</p>
<h3>Interlink your content.</h3>
<p>This may sound obvious, but many sites do a poor job of connecting their content. Linking to relevant content on your own site keeps visitors there and makes it appeal more to search engines to boot! </p>
<h3>Search Engine Friendly URLs</h3>
<p>People and search engines both like pretty URLs. Here is an ugly URL:</p>
<p><code>http://example.com/index.php?p=product&amp;product_code=1234&amp;categroy=2</code> </p>
<p>A prettier, friendlier version would be:</p>
<p><code>http://example.com/products/blue-widgets/fast-install-blue-widget-2-1234/</code></p>
<p>To accomplish this, you can use an Apache module named <a href="http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html"><strong><code>mod_rewrite</code></strong></a>. There are similar modules for <a title="IIS 7 URL Rewrite Module" href="http://blogs.iis.net/bills/archive/2008/05/31/urlrewrite-module-for-iis7.aspx">other</a> <a title="NginX Rewrite Module" href="http://wiki.nginx.org/NginxHttpRewriteModule">web</a> <a title="Lighttpd mod_rewrite" href=http://redmine.lighttpd.net/wiki/lighttpd/Docs:ModRewrite">servers</a>.</p>
<h3>Use with either www.site.com or just site.com but not both.</h3>
<p>You don&#8217;t want positions 2 and 3 when you could have position 1. Choose whichever you prefer, and make the other have a HTTP 301 permanent redirect.</p>
<h3>Don&#8217;t loose juicy links.</h3>
<p>Look for links that go to pages you no longer have and either put something there or have those links 301 redirect to a page you do have. Don&#8217;t let them go to waste. The <a href="https://www.google.com/webmasters/tools/">Google Webmaster Tools</a> are great for finding these.</p>
<p>Obviously, you would need to have descriptive category and product names for this to give the most benefit. I have heard people claim that using .html on the end of your files gets a better ranking than using .php, but my experience shows that there is no difference.  </p>
<h2>It is what you say, but how you say it matters too.</h2>
<h3><img class="alignleft size-thumbnail wp-image-83" title="It's what you say AND how you say it." src="/techblog/wp-content/uploads/2009/06/80s_phone_call-150x150.jpg" alt="It's what you say AND how you say it." width="150" height="150" />Use Keyword Targeting on each page.</h3>
<p>Target each page on your site to a few or even a single specific keyword or phrases. The free <a href="https://adwords.google.com/select/KeywordToolExternal">Google Adwords Keyword Tool </a>can help you find related keywords that will be worth targeting.</p>
<p>You don&#8217;t always have to go for the big ones either, targeting some of the smaller keywords can actually bring in more business than the bigger ones because you&#8217;ll be higher ranked.</p>
<h3>Have a good keyword density in your content.</h3>
<p>Try to use the keywords naturally in your content, for example, change &#8220;our office&#8221; to &#8220;our Cincinnati office.&#8221; Don&#8217;t overdo it and sound spammy though. Remember, you&#8217;re writing for users first.</p>
<h4>Title &amp; Meta Tags</h4>
<p>Each page should have unique and relevant <code>&lt;title&gt;</code> and <code>&lt;meta&gt;</code> tags. In general, you do not want to include your business name in your title tag, and you most certainly do not want to have it at the beginning.</p>
<p>You have about 65 characters you can work with in the title tag, and the rest gets lost by Google and others.</p>
<h4>Heading Tags</h4>
<p>Definitely use keywords in your <code>&lt;h1&gt;</code> tags.  And for that matter, use <code>&lt;h1&gt;</code> tags in the first place. Many sites nowadays are using all divs &amp; css which is great for style, but search engines can&#8217;t tell what&#8217;s important.</p>
<p>(And neither can screen readers, for that matter. )</p>
<h4>Bold</h4>
<p>Making a keyword <strong>bold </strong>once or twice is ok, especially if you can&#8217;t work it into the title tag.  Don&#8217;t overdo it, once is enough and twice is plenty.</p>
<h2>Try adding a blog.</h2>
<p><img class="alignright size-thumbnail wp-image-86" title="young businessman" src="/techblog/wp-content/uploads/2009/06/young_businessman-150x150.jpg" alt="young businessman" width="150" height="150" />Search engines love fresh unique content, so if your site doesn&#8217;t get a lot of that then you want a blog.  Even if you do get a lot of fresh content, a blog might be good for your business.</p>
<h3>Get the CEO to post blogs, read comments, and respond to comments.</h3>
<p>People LOVE it when the President of a company takes time to respond to their blog comments. This will help you get those valuable incoming links.</p>
<h3>Use Social Media and viral marketing.</h3>
<p>Most blog posts don&#8217;t get bookmarked or posted to any social sites, except perhaps by the writers. But don&#8217;t let the fact that you didn&#8217;t have an icon at the end of your post be what stops your blog from going viral.</p>
<h2>People like pictures.</h2>
<p>Search engines like pictures with an alt attribute to describe the image.</p>
<p>Having pictures on your website is a great thing as long as you account for them by adding alt text. Also, try to avoid using images for your site navigation and other important links.</p>
<p>I always try to add at least one image to each blog post. Studies have shown that blogs with images get more readers.</p>
<p>Some great sources for free images include <a href="http://www.sxc.hu/">sxc.hu</a> and <a href="http://www.flickr.com/creativecommons/">Flickr&#8217;s Creative Commons search</a>.</p>
<h3>Flash, frames, and AJAX are like pictures, but worse.</h3>
<p><img class="size-thumbnail wp-image-77 alignleft" title="Content is king" src="/techblog/wp-content/uploads/2009/06/three_diamonds-150x150.jpg" alt="Content is king" width="150" height="150" />Flash, frames, and AJAX don&#8217;t have an alt tag, so a search engine has no idea what they&#8217;re there for.</p>
<p>If you use flash, try to have a reasonable amount of text around it to explain what&#8217;s going on.</p>
<p>Don&#8217;t use frames unless you really have to.</p>
<p>AJAX is great, but it breaks the way browsers traditionally work. You need to realize this and account for it in your site design and SEO plans. Also, you alienate some portion of your visitors when your site requires JavaScript and AJAX to work.</p>
<p>Google now has <a href="http://code.google.com/web/ajaxcrawling/">some support</a> for properly AJAX sites, but a site that still works without JavaScript is always preferable.</p>
<h2>Other Useful Tips</h2>
<h3>Have two sitemaps.</h3>
<p>On any site with 5 or more pages, you want to have a regular HTML sitemap page that indexes every page on your site to help visitors find their way around.</p>
<p>You also want to have an <a href="http://sitemaps.org/">XML Sitemap </a>to help search engines find your content and have an idea of how often to scan it for changes.</p>
<h3>Speed Counts</h3>
<p>It&#8217;s official: <a href="http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html">Google now uses the speed of the web server</a> in determining search result rankings. Optimized pages not only save costs and make customers more happy, they also boost your search rankings.</p>
<h3>If content is King, links are Queen</h3>
<p>Your PageRank is determined by the number and quality of links coming to your page. It does not alone determine rankings, but it does have an impact. I developed a <a href="/pagerank">free tool to check the PageRank of any page</a>. </p>
<p>(This is left in the tips section because you as the site owner have less direct control over this; but it&#8217;s still good to keep in mind.)</p>
<h3>Use analytics from day 1.</h3>
<p>Things that get measured tend to get improved. Measure your website statistics.</p>
<p>I use <a href="http://www.google.com/analytics/">Google Analytics</a> and <a href="http://www.analog.cx/">analog</a>. Google Analytics gives some amazingly in-depth reports, but it can&#8217;t catch everything. PDF&#8217;s, Images, and Users with javascript disabled all slip right past Google Analytics, but nothing gets past analog.</p>
<h3>Finally, have a call to action.</h3>
<p>All the marketing in the world doesn&#8217;t get you a thing if visitors see your website and say &#8220;meh.&#8221; Use A/B testing and other methods to optimize your site&#8217;s call to action. The goal is to convert the largest number of visitors into sales as possible.</p>
<h2><a href="/webdev">Search Engine Optimization</a></h2>
<p>nFriedly Web Development has years of experience with SEO &amp; SEM as well as other forms of marketing including Pay Per Click (PPC) campaigns, newsletters, and branding. <a href="/contact">Get in touch</a> for a free quote on how I can help you <strong>get a good google ranking and take your traffic through the roof</strong>.</p>
