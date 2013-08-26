// DocPad Configuration File
// http://docpad.org/docs/config

var reImages = /<img [^>]+>/g;
var reHW = /(height|width)="\d+"/g;

module.exports = {
	collections: {
		techblog: function() { 
			return this.getCollection("html").findAllLive({relativeOutDirPath:'techblog'}, [{filename:-1}]);
		}
	},
	templateData: {
		getFirstImage: function(post) { 
			var images = post.get('body').match(reImages);
			if (!images) return "";
			var img = images[0];
			return img.replace(reHW, '');
		},
		getPreview: function(post) {
			var sections = post.contentRenderedWithoutLayouts.split('<!--more-->');
			if (sections.length != 2) return "";
			return sections[0]; //.replace(reImages, '');
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