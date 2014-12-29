// DocPad Configuration File
// http://docpad.org/docs/config

var _ = require('underscore');

var reImages = /<img [^>]+>/g;
var reHW = /(height|width)="\d+"/g;
var reClass = /class="[^"]+"/;
var reHeadings = /<h\d>(.*)<\/h\d>/g;
var reLinks = /<a[^>]+>|<\/a>/g

function notIndex(model, cleanedSearchString) {
	return model.get('filename').substr(0,6) != 'index.';
}

module.exports = {
	// the default worked great until I went from 178 to 267 files by adding my "stuff" directory. 
	// I might yet try and move it off site. 
	// Until then, this makes dp run locally without hanging on "Watching setup starting..."
	watchOptions: {
		preferredMethods: ['watchFile','watch']
	},
	plugins: {
		ghpages: {
			quiet: true
		},
    	thumbnails: {
        	imageMagick: true
        },
        sitemap: {
            cachetime: 600000,
            changefreq: 'monthly',
            priority: 0.5,
            hostname: 'http://nfriedly.com'
        },
        redirector: {
        	redirects: {
        		"/eoc": "http://folding.extremeoverclocking.com/?nav=IMAGES",
        		"/pagerank" : "http://pagerank.nfriedly.com",
        		"/pagerank.js" : "http://pagerank.nfriedly.com",
        		"stuff/afgame" : "http://air-force-game.nfriedly.com/",
        		"stuff/afgame/index.php" : "http://air-force-game.nfriedly.com/",
        		"stuff/arcade.php" : "http://air-force-game.nfriedly.com/",
        		"/stuff/ddgg-da": "http://ddgg.nfriedly.com/",
        		"/stuff/duckduckgoogle": "http://ddgg.nfriedly.com/",
        		"/stuff/rss-xslt": "http://rss-xslt.herokuapp.com/",
        		"/stuff/jquery-requirejs-noconflict-issue/": "https://github.com/nfriedly/nfriedly.com-v4/tree/master/stuff/jquery-requirejs-noconflict-issue",
        		"/px": "http://nodeunblocker.com/",
        		"/px/index.php": "http://nodeunblocker.com/",
        		"/px/poxy/": "http://nodeunblocker.com/",
        		"/px/poxy/index.php": "http://nodeunblocker.com/",
        		"/px/a2/": "http://nodeunblocker.com/",
        		"/px/a2/index.php": "http://nodeunblocker.com/",
        		"/px/invisiproxy": "http://nodeunblocker.com/",
        		"/px/invisiproxy/index.php": "http://nodeunblocker.com/",
        		"/px/phpr0xi": "http://nodeunblocker.com/",
        		"/px/phpr0xi/index.php": "http://nodeunblocker.com/",

        		// onsite, but easier this way
        		"/files/Nathan-Friedly-Resume.pdf" : "http://nfriedly.com/Nathan-Friedly-Resume.pdf",
        	}	
        },
        cleanurls: {
        	trailingSlashes: true // this is to avoid having github pages redirect users from the cloudfront domain to the github domain just to add the slash to the end of the url.
        }
	},
	collections: {
		techblog: function() { 
			return this.getCollection("documents")
				.findAllLive({relativeOutDirPath:'techblog'}, [{filename:-1}])
				.setFilter('notIndex', notIndex)
				.on("add", function (model)  {
                	model.setMetaDefaults({'cssClass': 'post', layout: 'main'})
                });
		},
        projects: function() {
            var projects = this.getFilesAtPath('projects', [{filename:1}]);
            projects.each(function(project) {
                project.setMetaDefaults({'write': 'false'});
            });
            projects.on("add", function (model)  {
                model.setMetaDefaults({'write': 'false'})
            });
            return projects;
        }
	},
	templateData: {
		getFirstImage: function(post) { 
			var images = post.contentRenderedWithoutLayouts.match(reImages);
			if (!images) return "";
			var img = images[0];
			return img.replace(reHW, '').replace(reClass, '');
		},
		getPreview: function(post) {
			if (!post.contentRenderedWithoutLayouts) return '';
			var sections = post.contentRenderedWithoutLayouts.split('<!--more-->');
			if (sections.length != 2) return "";
			return sections[0].replace(reHeadings, "<p>$1</p>");
		},
		getStrippedPreview: function(post) {
			return this.getPreview(post)
				.replace(reLinks, '')
				.replace(reImages, '');
		},
		linkTags: function(tags) {
			var self = this;
			return _(tags)
				.map(function(tag) { 
					return '<a href="#' +  self.normalizeTag(tag) + '">' +  tag + '</a>'; 
				})
				.join(', ');
		},
		normalizeTag: function(tag) {
			return tag.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim().replace(/ +/g, '-')
		},
		linkPhotoCredits: function(links) {
			return _.chain(links)
			.map(function(url, text) {
				return '<a href="' + url + '">' + text + '</a>';
			})
			.values() // turn the object into an array
			.value() // end the chain and get a regular array back
			.join(', ')
		},
		generateTagCloud: function(projects) {
		 	// pre-fill the hits collection to emphasize/de-emphasize the items I'd like to do more/less work with
			var hits = {
				"Node.js": 5,
				"AngularJS": 5,
				"Mobile First": 4,
                "Backbone.js": 4,
				"DocPad": 3,
				"Jasmine": 3,
				"Meteor": 3,
				"Flash / ActionScript": -1,
				"Twitter": -1,
				"WordPress": -1,
				"CodeIgniter": -2,
				"SEO": -2,
                "e-Commerce": -4,
                "CSS": -5,
                "HTML": -5,
				"PHP": -13
			};
			
		 	// build a map of name -> usage count
			_.each(projects, function(project) {
				_.each(project.tags || [], function(tag) {
					hits[tag] = hits[tag] || 0;
					hits[tag]++;
				});
			});
			
			// figure out our multiplier to get relative sizes
			var counts = _.values(hits),
				min = _.min(counts), 
				max = _.max(counts),
				multiplier = 1/(max-min);
				
 			// use the multiplier to normalize the counts
 			// and convert the map into a list of objects
 			var results = []
 			_.each(hits, function(count, tag) {
 				results.push({tag: tag, count: count, size: count * multiplier});
 			});
 			
 			return results.sort(function(a, b) {
 				return a.tag == b.tag ? 0 : a.tag > b.tag ? 1 : -1;
 			});
		},
		site: {url: 'http://nfriedly.com' }
	}
};

/*
			posts.renderPreviews = function() {
				posts.each(function(post) {
					post.getOutContent();
					console.dir(post);
					var sections = post.contentRenderedWithoutLayouts.split('<!--more-->');
					console.log(sections.length);
					var preview = (sections.length != 2) ? preview = "" : sections[0]; //.replace(reImages, '');
					post.set('preview', preview);
				});
				return posts;
			}
			return posts;
*/
