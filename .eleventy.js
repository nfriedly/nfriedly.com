const pluginLess = require("eleventy-plugin-less");
const util = require('node:util');

const reImages = /<img [^>]+>/g
const reHW = /(height|width)="\d+"/g
const reClass = /class="[^"]+"/
const reHeadings = /<h\d>(.*)<\/h\d>/g
const reLinks = /<a[^>]+>|<\/a>/g

module.exports = function (eleventyConfig) {
	eleventyConfig.addLayoutAlias("main", "layouts/main.ejs");
	// eleventyConfig.addPassthroughCopy("src/img");
	// eleventyConfig.addPassthroughCopy("src/bower_components");
	// eleventyConfig.addPassthroughCopy("src/scripts");
	// eleventyConfig.addPassthroughCopy("src/techblog/wp-content/")
	// eleventyConfig.addPassthroughCopy("src/stuff");
	
	eleventyConfig.addPlugin(pluginLess);

	eleventyConfig.addCollection("featuredPosts", function (collectionApi) {
		// get unsorted items
		return collectionApi.getFilteredByTag("techblog").filter(p => p.data.featured).reverse().slice(0,6);
	});
 
	function projectsCollection(collectionApi) {
		// get everything from the projects folder, without changing it's tags
		return collectionApi.getFilteredByGlob("src/projects/*.md");
	}

	eleventyConfig.addCollection("projects", projectsCollection);

	eleventyConfig.addCollection("projectsSorted", function(collectionApi) {
		return projectsCollection(collectionApi).sort((a,b) => a.page.inputPath.localeCompare(b.page.inputPath))
	})

	eleventyConfig.addShortcode("getFirstImage", function(post) {
		return post?.content?.match(reImages)?.pop()?.replace(reHW, "").replace(reClass, "");
	});

	function getPreview(post) {
		var sections;
		if (!post.content) {
		  return "";
		}
		sections = post.content.split("<!--more-->");
		if (sections.length !== 2) {
		  return "";
		}
		return sections[0].replace(reHeadings, "<p>$1</p>");
	}

	eleventyConfig.addShortcode("getPreview", getPreview);

	eleventyConfig.addShortcode("getStrippedPreview", function(post) {
		return getPreview(post).replace(reLinks, "").replace(reImages, "");
	});

	eleventyConfig.addShortcode("age", () => {
		const d = new Date();
		let age = d.getFullYear() - 1986;
		if (d.getMonth() < 7) age--; // August 1st birthday means I don't have to check the day-of-month :)
		return age;
	})

	eleventyConfig.addShortcode("latestHeaderImage", (posts) => {
		return posts.slice().reverse().find(post => post.data.headerImage)?.data.headerImage;
	})

	function normalizeTag(tag) {
		return tag.toLowerCase().replace('++', 'pp').replace('#', '-sharp').replace(/[^a-z0-9]/g, " ").trim().replace(RegExp(" +", "g"), "-");
	}

	eleventyConfig.addShortcode("normalizeTag", normalizeTag)

	eleventyConfig.addShortcode("projectBadges", (project) => {
		const badges = [];
		if (project.data.github || (project.data.link && project.data.link.includes('github.com'))) {
			let github = project.data.github || project.data.link;
			if (github.substr(0,4) !== 'http') {
				github = "https://github.com/nfriedly/" + github;
			}
			badges.push(`<a href="${ github }"><i class="fa fa-github"></i></a>`)
		}
		if (project.data.npm) {
			badges.push(`<a href="https://npmjs.org/package/${ project.data.npm  }" class="project-badge"><img src="https://badge.fury.io/js/${ project.data.npm  }.svg" alt="${ project.data.title  } on NPM"></a>`);
			badges.push(`<a href="https://npmjs.org/package/${ project.data.npm  }" class="project-badge"><img src="https://img.shields.io/npm/dm/${ project.data.npm  }.svg" alt="${ project.data.title  } downloads"></a>`);
		}
		if (project.data.bower) {
			badges.push(`<img src="https://badge.fury.io/bo/${ project.data.bower  }.svg" alt="${ project.data.title  } on Bower">`);
		}
		// travis ci badges used to go here, but they stopped working
		// todo: add GH actions CI badge? maybe automatically detect them!?
		return badges.join('\n')
	})

	eleventyConfig.addShortcode("linkTags", (tags) => {
		return (tags?.data?.tags || tags || []).map(function(tag) {
			return "<a href=\"#" + normalizeTag(tag) + "\">" + tag + "</a>";
		  }).join(", ");
	})

	return {
		dir: {
		  input: "src",
		  output: "_site"
		}
	  }
};