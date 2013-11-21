---
id: 'work-intro'
cleanurl: false
write: false
ignored: true
---

Nathan Friedly
==============

Smart, driven web developer with a focus on results and a passion for simplicity and user experience.

More than a decade of experience working on hundreds of websites from Sunny-D to Ticketmaster to NFL.

Shipped software that runs on millions of computers daily.

Willing to do whatever job needs done, shipping features, fixing bugs, or just answering the phone.

Knows JavaScript
================

Built AJAX-driven web apps before jQuery was released (and many more since then). 

Worked with Node.js since version 0.2 and contributed code to Node.js core. Shipped more than a dozen node.js-based apps and libraries. 

Ranked in the top 1% of developers worldwide by elance.com.

Experience with a wide range of JS libraries from Backbone to Jasmine to Express.


Works Full Stack
================

Past and recent projects using Java (including a little bit of Android), Ruby, C#, PHP, and Flash/ActionScript. Some familiarity with Python, Go, Scala, and other languages. 

Experience managing Linux servers on Heroku, EC2, and other providers. 

Knowledge of a range of databases and data-stores including PostgreSQL, MySQL, SQLite, MongoDB, Memcache, and Redis.




<div class="work-intro">
    <%- @getFileById('work-intro').get('contentRenderedWithoutLayouts')  %>
</div>



.work-intro { 
    columns: 3; -webkit-columns: 3; -moz-columns: 3;
    h1, h2 {margin-top: 0;}
    margin: 20px 0;
}
