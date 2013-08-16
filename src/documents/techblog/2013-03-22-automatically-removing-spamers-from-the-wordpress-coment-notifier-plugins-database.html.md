---
title: 'Automatically removing spamers from the WordPress Coment Notifier Plugin&#8217;s Database'
author: nFriedly
layout: post
permalink: /2013/03/automatically-removing-spamers-from-the-wordpress-coment-notifier-plugins-database/
categories:
  - Web Development
tags:
  - antispam
  - howto
  - MySQL
  - WordPress
---
[<img src="https://farm1.staticflickr.com/216/512562593_33dcb600f2_m.jpg" width="240" height="180" alt="Beach" class="right" title="Spam? Not anymore! Now all I do is relax and enjoy :)" />][1] <small class="right" style="clear:right"><a href="https://secure.flickr.com/photos/8438819@N03/512562593/">Photo by anda (:</a></small> There&#8217;s an awesome [WordPress][2] plugin called [Comment Notifier][3] &#8211; what it does is add that check box at the bottom of the comments section. If you leave it checked when you add a comment, then it will automatically email you with anyone ease&#8217;s comments in the future.

However, it has a slight problem with spam. When spammers leave comments, my combination of [Akismet][4] and [NoSpamNX][5] do a pretty good job of keeping spam comments of of the site, but not before their (usually fake) email gets added to the Comment Notifier database. 

Recently, I realized that my server was trying to send out several hundred failing emails any time someone left a comment. I shot a short feature request (and a small donation) to the Comment Notifier plugin&#8217;s author, but then decided that this was one I could take on myself. Here&#8217;s how I did it:

<!--more-->

## Step 1: BACK UP YOUR DATABASE

I&#8217;m using the [BackUpWordPress][6] so this happens automatically, but I went and ran an extra backup and downloaded the files to my laptop just to be safe.

## Stem 2: Clean up the old data

This SQL query deletes every email in the `comment_notifier` table that doesn&#8217;t have a corresponding comment. (Most likely because the comment was already deleted as spam.)

<pre class="brush: sql; title: ; notranslate" title="">DELETE FROM `wp_YOUR_PREFIX_comment_notifier`
WHERE email NOT IN (
  SELECT comment_author_email FROM `wp_YOUR_PREFIX_comments`
);
</pre>

Obviously, you&#8217;ll need to change the table name prefix (`wp_YOUR_PREFIX_`) to whatever your install of WP uses.

## Step 3: Add an [index][7] on the `comments.comment_author_email` column

This is required in order to add the Foreign Key constraint in next step. It makes MySQL keep a sorted list of emails in the comments table and automatically update it any time a comment is added or deleted.

<pre class="brush: sql; title: ; notranslate" title="">ALTER TABLE `wp_YOUR_PREFIX_comments` ADD INDEX ( `comment_author_email` );
</pre>

## Step 4: Add a [Foreign Key][8] constraint that automatically deletes spammers from the `comment_notifier` table

This instructs MySQL to enforce a link between the `comment_notifier` table and the `comments` table so that any email address in the `comment_notifier` table must also be in the comments table, and if it gets deleted from the `comments` table, then automatically delete it from the `comment_notifier` table also.

<pre class="brush: sql; title: ; notranslate" title="">ALTER TABLE `wp_YOUR_PREFIX_comment_notifier` 
  ADD CONSTRAINT `auto_delete_spammers` 
    FOREIGN KEY (`email`) 
    REFERENCES `wp_YOUR_PREFIX_comments` (`comment_author_email`) 
    ON DELETE CASCADE;
</pre>

## Step 5: Relax and enjoy

Any time a comment is deleted as spam (or for any other reason), your Comment Notifier will no longer try to send emails to that comment&#8217;s author. Your email server will thank you.

 [1]: http://nfriedly.com/techblog/2013/03/automatically-removing-spamers-from-the-wordpress-coment-notifier-plugins-database/
 [2]: http://wordpress.org/
 [3]: http://www.satollo.net/plugins/comment-notifier
 [4]: http://akismet.com/
 [5]: http://wordpress.org/extend/plugins/nospamnx/
 [6]: http://hmn.md/backupwordpress/
 [7]: http://dev.mysql.com/doc/refman/5.6/en/glossary.html#glos_index
 [8]: http://dev.mysql.com/doc/refman/5.6/en/glossary.html#glos_foreign_key