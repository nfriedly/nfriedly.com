// DocPad Configuration File
// http://docpad.org/docs/config

var _ = require('underscore');

var reImages = /<img [^>]+>/g;
var reHW = /(height|width)="\d+"/g;
var reClass = /class="[^"]+"/;
var reHeadings = /<h\d>(.*)<\/h\d>/g;
var reLinks = /<a[^>]+>|<\/a>/g

module.exports = {
	collections: {
		techblog: function() { 
			return this.getCollection("html").findAllLive({relativeOutDirPath:'techblog'}, [{filename:-1}]);
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
			return sections[0].replace(reHeadings, "<p><b>$1</b></p>");
		},
		getStrippedPreview: function(post) {
			return this.getPreview(post)
				.replace(reLinks, '')
				.replace(reImages, '');
		},
		linkTags: function(tags) {
			return _(tags)
				.map(function(tag) { 
					return '<a href="#' +  tag + '">' +  tag + '</a>'; 
				})
				.join(', ');
		}
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