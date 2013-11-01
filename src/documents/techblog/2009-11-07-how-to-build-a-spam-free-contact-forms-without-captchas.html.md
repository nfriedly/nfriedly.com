---
title: How to build a spam-free contact form without captchas
author: nFriedly
layout: post
url: /2009/11/how-to-build-a-spam-free-contact-forms-without-captchas/
headerImage: http://farm9.staticflickr.com/8007/7489893336_c5b3011e15_b.jpg
imageCredits: 
	"Telephone cord by Pete" : http://www.flickr.com/photos/comedynose/7489893336/
tags:
  - antispam
  - howto
  - javascript
  - php
  - security
  - ux
featured: true
---
<img class="alignright size-thumbnail wp-image-39" title="data_security_3" alt="data_security_3" src="http://nfriedly.com/techblog/wp-content/uploads/2009/06/data_security_3-150x150.jpg" width="150" height="150" />Most anti-spam methods used by websites today are annoying at best. They use impossible-to-read captcha images, or they make users jump through some kind of hoop to get the email address instead of just clicking on it. **This can mean lost sales and opportunities for you, because each hurdle turns away more users. **

This article looks at how to use some simple HTML, CSS, & Javascript to protect your private information without making your guests jump through hoops.

<!--more-->

  
[<img class="alignleft" alt="" src="/img/application_put.png" /> Download a working copy of the contact form discussed here.][1]

## The Goal

I want users to be able to contact me simple and easy, no captchas, no math problems, just a regular contact form, clickable email address, and everything copy-paste-able.

## The Problem

Spammers love captcha-free forms and clickable email addresses. I do not want to receive a ton of spam!

## The Solution

With a little bit of CSS and JavaScript wizardry, we can make a simple, easy-to-use contact page that will block almost all automated contact form spam.

### Part 1: The Contact Form

We are going to make a standard contact form with one extra feature: an input named &#8220;url&#8221; and a note beside it that says &#8220;Don&#8217;t type anything here!&#8221;

The HTML:

``` html

<form action="/submit.php" method="post">

	<p>Your name: <input type="text" name="name" /></p>

	<p>Your email: <input type="text" name="email" /></p>

	<p class="antispam">Leave this empty: <input type="text" name="url" /></p>

	<p><textarea name="message"></textarea></p>

	<p><input type="submit" value="Send" /></p>

</form>
```

Then we use CSS to hide the input and the note.

The CSS:

``` css
.antispam { display:none;}
```

Then we make a rule in the server that says &#8216;if the user typed anything in the &#8220;url&#8221; box, then throw it out.&#8217;

The PHP:

``` php
<?php 
// if the url field is empty 
if(isset($_POST['url']) && $_POST['url'] == ''){
 	// then send the form to your email
 	 	mail( 'you@yoursite.com', 'Contact Form', print_r($_POST,true) ); 
} 
// otherwise, let the spammer think that they got their message through
?>

<h1>Thanks</h1>

We'll get back to you as soon as possible
```

A regular person won&#8217;t even see the box normally, and will therefore leave it blank without even thinking about it. If the CSS fails to load, they get a note explaining what to do.

However, when a spam bot looks at this, it sees a good spot to stick whatever spammy url they&#8217;re trying to advertise.

Now the php script on the server can tell who is a spammer and who isn&#8217;t. The regular people get sent to your email, the spammers get ignored!

### Part 2:  Click-able Email Address

Spammers steal your email address by scanning through the source code of the site and grabbing anything that looks like an email address. So we&#8217;re going to make sure that there is no email address in the source code and instead generate it by JavaScript.

The Javascript:

``` js
var first = "yourname";

var last = "yoursite.com";
```

The HTML:

``` html
My e-mail address:

<script type="text/javascript">
document.write('<a href="mailto:'+first + '@' + last+'">'+first + '@' + last+'<\/a>');
</script>

<noscript>
Please enable javascript or use my <a href="/contact.php">contact form</a>
</noscript>
```

A regular user will see a regular email address and things just work. A user who happens to have javascript disabled will see an explanation and an alternative solution. And a spammer won&#8217;t see a thing!

This method can easily be extended to phone numbers and other personal information.

## Advanced version: Prettier message body and a proper `From:` field

These were the most commonly requested features, so I added an advanced version that changes the `From:` field of the email to whatever the user typed in the box, and removes all of the `Array` brackets from the body of the message:

``` php
<?php 
// if the url field is empty 
if(isset($_POST['url']) && $_POST['url'] == ''){

 	// put your email address here 	
 	$youremail = 'you@yoursite.com';
 	
 	// prepare a "pretty" version of the message
 	$body = "This is the form that was just submitted: 	
Name:  $_POST[name]
E-Mail: $_POST[email]
Message: $_POST[message]"; 
 		
 	// Use the submitters email if they supplied one 	
 	// (and it isn't trying to hack your form). 	
 	// Otherwise send from your email address. 	
 	
 	if( $_POST['email'] && !preg_match( "/[\r\n]/", $_POST['email']) ) {
 		$headers = "From: $_POST[email]"; 	
 	} else {
 		$headers = "From: $youremail"; 
 	}
 	
 	// finally, send the message 	
 	mail($youremail, 'Contact Form', $body, $headers ); } // otherwise, let the spammer think that they got their message through ?>
```

The `preg_match()` is there to make sure spammers can&#8217;t abuse your server by injecting extra fields (such as CC and BCC) into the header. Take a look at <http://www.thesitewizard.com/php/protect-script-from-email-injection.shtml> for more info.

Be sure to check the comments below for several other variations.

## Complete Examples

<img class="alignleft" alt="" src="/img/application_put.png" /> A complete working copy of the code is available to [browse on Github][2]  and you can also [download a .zip file of the code][1]

For a live demo, see <http://spam-free-contact-example.herokuapp.com/simple/contact.htm>

### WordPress version

I found that there is an anti-spam plugin for WordPress that uses similar methods to the ones I describe here: <http://wordpress.org/extend/plugins/nospamnx/> &#8211; I installed it on this blog and it&#8217;s stopped nearly 30,000 spam comments so far.

## About the Author

[<img class=" wp-image-549 alignleft" alt="Nathan Friedly in Cincinnati during the winter" src="http://nfriedly.com/techblog/wp-content/uploads/2009/11/Nathan-Cincinnati-winter.jpg" width="131" height="175" />][3] [Nathan][3] is an experienced Web Developer with a sharp eye for security and a zeal for User Experience. He currently works primarily on JavaScript and Node.js.

However, the focus has never been on the technology &#8211; it&#8217;s about solving problems and meeting needs. &#8220;Computers work for us, not the other way around.&#8221;

 [1]: https://github.com/nfriedly/spam-free-php-contact-form/archive/master.zip
 [2]: https://github.com/nfriedly/spam-free-php-contact-form
 [3]: http://nfriedly.com/
