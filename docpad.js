// DocPad Configuration File
// http://docpad.org/docs/config

var reImages = /<img [^>]+>/g;
var reHW = /(height|width)="\d+"/g;

module.exports = {
	collections: {
		techblog: function() { 
			return this.getCollection("html").findAllLive({relativeOutDirPath:'techblog'}, [{date:-1}]);
		}
	},
	templateData: {
		getFirstImage: function(post) { 
			var images = post.body.match(reImages);
			if (!images) return "";
			var img = images[0];
			return img.replace(reHW, '');
		},
		getPreview: function(post) {
			var sections = post.body.split('<!--more-->');
			if (sections.length != 2) return "";
			return sections[0].replace(reImages, '');
		},
	}
};