# DocPad Configuration File
# http://docpad.org/docs/config
notIndex = (model, cleanedSearchString) ->
	model.get("filename").substr(0, 6) isnt "index."
_ = require("underscore")
path = require("path")
reImages = /<img [^>]+>/g
reHW = /(height|width)="\d+"/g
reClass = /class="[^"]+"/
reHeadings = /<h\d>(.*)<\/h\d>/g
reLinks = /<a[^>]+>|<\/a>/g
module.exports =

	# the default worked great until I went from 178 to 267 files by adding my "stuff" directory.
	# I might yet try and move it off site.
	# Until then, this makes dp run locally without hanging on "Watching setup starting..."
	watchOptions:
		preferredMethods: [
			"watchFile"
			"watch"
		]

	plugins:
		ghpages:
			quiet: true

		thumbnails:
			imageMagick: true

		sitemap:
			cachetime: 600000
			changefreq: "monthly"
			priority: 0.5
			hostname: "http://nfriedly.com"

		redirector:
			redirects:
				"/eoc": "http://folding.extremeoverclocking.com/?nav=IMAGES"
				"/pagerank": "http://pagerank.nfriedly.com"
				"/pagerank.js": "http://pagerank.nfriedly.com"
				"stuff/afgame": "http://air-force-game.nfriedly.com/"
				"stuff/afgame/index.php": "http://air-force-game.nfriedly.com/"
				"stuff/arcade.php": "http://air-force-game.nfriedly.com/"
				"/stuff/ddgg-da": "http://ddgg.nfriedly.com/"
				"/stuff/duckduckgoogle": "http://ddgg.nfriedly.com/"
				"/stuff/rss-xslt": "http://rss-xslt.herokuapp.com/"
				"/stuff/jquery-requirejs-noconflict-issue/": "https://github.com/nfriedly/nfriedly.com-v4/tree/master/stuff/jquery-requirejs-noconflict-issue"
				"/px": "http://nodeunblocker.com/"
				"/px/index.php": "http://nodeunblocker.com/"
				"/px/poxy/": "http://nodeunblocker.com/"
				"/px/poxy/index.php": "http://nodeunblocker.com/"
				"/px/a2/": "http://nodeunblocker.com/"
				"/px/a2/index.php": "http://nodeunblocker.com/"
				"/px/invisiproxy": "http://nodeunblocker.com/"
				"/px/invisiproxy/index.php": "http://nodeunblocker.com/"
				"/px/phpr0xi": "http://nodeunblocker.com/"
				"/px/phpr0xi/index.php": "http://nodeunblocker.com/"
				"/stuff/africa/": "https://nfriedly.github.io/africa/"
				"/stuff/bubblegum/": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step1.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step2.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step3.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step4.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step5.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum/step6.htm": "https://github.com/nfriedly/bubblegum"
				"/stuff/bubblegum_pub/": "https://github.com/nfriedly/bubblegum"

			# onsite, but easier this way
				"/files/Nathan-Friedly-Resume.pdf": "http://nfriedly.com/Nathan-Friedly-Resume.pdf"

		cleanurls:
			trailingSlashes: true # this is to avoid having github pages redirect users from the cloudfront domain to the github domain just to add the slash to the end of the url.

		jshint:
			ignorePaths: ['scripts/lightbox/', 'stuff/jquery-requirejs-noconflict-issue', 'bower_components/']

	collections:
		techblog: ->
			@getCollection("documents").findAllLive(
				relativeOutDirPath: "techblog"
			, [filename: -1]).setFilter("notIndex", notIndex).on "add", (model) ->
				model.setMetaDefaults
					cssClass: "post"
					layout: "main"



		projects: ->
			projects = @getFilesAtPath("projects", [filename: 1])
			projects.each (project) ->
				project.setMetaDefaults write: "false"
				return

			projects.on "add", (model) ->
				model.setMetaDefaults write: "false"
				return

			projects

	templateData:
		activeAttrIf: (menuSection) ->
			'class="active"' if @document.section is menuSection

		getFirstImage: (post) ->
			images = post.contentRenderedWithoutLayouts.match(reImages)
			return ""  unless images
			img = images[0]
			img.replace(reHW, "").replace reClass, ""

		getPreview: (post) ->
			return ""  unless post.contentRenderedWithoutLayouts
			sections = post.contentRenderedWithoutLayouts.split("<!--more-->")
			return ""  unless sections.length is 2
			sections[0].replace reHeadings, "<p>$1</p>"

		getStrippedPreview: (post) ->
			@getPreview(post).replace(reLinks, "").replace reImages, ""

		linkTags: (tags) ->
			self = this
			_(tags).map((tag) ->
				"<a href=\"#" + self.normalizeTag(tag) + "\">" + tag + "</a>"
			).join ", "

		normalizeTag: (tag) ->
			tag.toLowerCase().replace('++', 'pp').replace('#', '-sharp').replace(/[^a-z0-9]/g, " ").trim().replace RegExp(" +", "g"), "-"

		linkPhotoCredits: (links) ->
			# turn the object into an array
			# end the chain and get a regular array back
			_.chain(links).map((url, text) ->
				"<a href=\"" + url + "\">" + text + "</a>"
			).values().value().join ", "

		generateTagCloud: (projects) ->

			# pre-fill the hits collection to emphasize/de-emphasize the items I'd like to do more/less work with
			hits =
				React: 15
				"Node.js": 5
				AngularJS: 5
				"Mobile First": 4
				"Flash / ActionScript": -1
				Twitter: -1
				WordPress: -1
				CodeIgniter: -2
				SEO: -2
				CoffeeScript: -3 # ironic, I know
				"e-Commerce": -4
				CSS: -5
				HTML: -5
				PHP: -13


			# build a map of name -> usage count
			_.each projects, (project) ->
				_.each project.tags or [], (tag) ->
					hits[tag] = hits[tag] or 0
					hits[tag]++
					return

				return


			# figure out our multiplier to get relative sizes
			counts = _.values(hits)
			min = _.min(counts)
			max = _.max(counts)
			multiplier = 1 / (max - min)

			# use the multiplier to normalize the counts
			# and convert the map into a list of objects
			results = []
			_.each hits, (count, tag) ->
				results.push
					tag: tag
					count: count
					size: count * multiplier

				return

			results.sort (a, b) ->
				(if a.tag is b.tag then 0 else (if a.tag > b.tag then 1 else -1))


		site:
			url: "http://nfriedly.com"

#
#			posts.renderPreviews = function() {
#				posts.each(function(post) {
#					post.getOutContent();
#					console.dir(post);
#					var sections = post.contentRenderedWithoutLayouts.split('<!--more-->');
#					console.log(sections.length);
#					var preview = (sections.length != 2) ? preview = "" : sections[0]; //.replace(reImages, '');
#					post.set('preview', preview);
#				});
#				return posts;
#			}
#			return posts;
#
