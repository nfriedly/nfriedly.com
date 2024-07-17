const Image = require("@11ty/eleventy-img");
// const img2picture = require("eleventy-plugin-img2picture");
const pluginLess = require("eleventy-plugin-less");
const util = require('node:util');

const reImages = /<img [^>]+>/g
const reHW = /(height|width)="\d+"/g
const reClass = /class="[^"]+"/
const reSrc = /src="([^"]+)"/
const reAlt = /alt="([^"]+)"/
const reHeadings = /<h\d>(.*)<\/h\d>/g
const reLinks = /<a[^>]+>|<\/a>/g

module.exports = function (eleventyConfig) {
	const settings = {
		dir: {
		  input: "src",
		  output: "_site"
		}
	  }

	eleventyConfig.addLayoutAlias("main", "layouts/main.ejs");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/bower_components");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy("src/techblog/wp-content/")
	eleventyConfig.addPassthroughCopy("src/stuff");
	
	eleventyConfig.addPlugin(pluginLess);

	// https://www.11ty.dev/docs/plugins/image/
	// widths should be an array, it can contain numbers and null for the original width
	eleventyConfig.addShortcode("projectImage", async function (src, alt="") {
		// 3 different breakpoints (the smallest size just makes it a 1/3 of the width, so use the 210px image for that)
		const widths = [350, 283, 210];

		// the eleventy-img plugin doesn't know about the input dir setting
		if (!src.includes('//')) {
			src = settings.dir.input + '/' + src;
		}

		let metadata = await Image(src, {
			// add in 2x sizes for hi-dpi displays
			widths: widths.concat(widths.map(w => w*2)),
			formats: ["avif", "jpeg"],
			outputDir: settings.dir.output + '/' + 'img/',
		});

		// keep the large 1x jpeg as a fallback, nuke the rest
		metadata.jpeg && (metadata.jpeg = metadata.jpeg?.filter?.(m => m.width === 350));

		let imageAttributes = {
			alt,
			sizes: "auto",
			loading: "lazy",
			decoding: "async",
			class: "img-thumbnail"
		};

		return Image.generateHTML(metadata, imageAttributes);
	});
	// eleventyConfig.addPlugin(img2picture, {
	// 	// Should be same as Eleventy input folder set using `dir.input`.
	// 	eleventyInputDir: settings.dir.input,

	// 	// Output folder for optimized images.
	// 	imagesOutputDir: settings.dir.output + '/img',

	// 	// URL prefix for images src URLS.
	// 	// It should match with path suffix in `imagesOutputDir`.
	// 	// Eg: imagesOutputDir with `_site/images` likely need urlPath as `/images/`
	// 	urlPath: "/",
	// });

	eleventyConfig.addCollection("featuredPosts", function (collectionApi) {
		// get unsorted items
		return collectionApi.getFilteredByTag("techblog").filter(p => p.data.featured).reverse().slice(0,4);
	});
 
	function projectsCollection(collectionApi) {
		// get everything from the projects folder, without changing it's tags
		return collectionApi.getFilteredByGlob("src/projects/*.md");
	}

	eleventyConfig.addCollection("projects", projectsCollection);

	eleventyConfig.addCollection("projectsSorted", function(collectionApi) {
		return projectsCollection(collectionApi).sort((a,b) => a.page.inputPath.localeCompare(b.page.inputPath))
	})

	eleventyConfig.addShortcode("getFirstImage", async function(post, width=200) {

		const img = post?.content?.match(reImages)?.[0];
		if (!img) return "";

		let src = img.match(reSrc)?.pop();
		if (!src) return "";

		// the eleventy-img plugin doesn't know about the input dir setting
		if (!src.includes('//')) {
			src = settings.dir.input + '/' + src;
		}

		const alt = img.match(reAlt)?.pop() || "";

		let metadata = await Image(src, {
			widths: [width*2, width],
			formats: ["avif", "jpeg"],
			outputDir: settings.dir.output + '/' + 'img/',
		});

		// jpeg is the fallback format, so filter out anything but the desired 1x size
		metadata.jpeg && (metadata.jpeg = metadata.jpeg?.filter?.(m => m.width === width));

		let imageAttributes = {
			alt,
			sizes: width + "px", //?
			//loading: "lazy",
			//decoding: "async",
		};

		return Image.generateHTML(metadata, imageAttributes);
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
			badges.push(`<a href="https://npmjs.org/package/${ project.data.npm  }" class="project-badge"><img src="https://badge.fury.io/js/${ project.data.npm  }.svg" alt="${ project.data.title  } on NPM" loading="lazy" decoding="async"></a>`);
			badges.push(`<a href="https://npmjs.org/package/${ project.data.npm  }" class="project-badge"><img src="https://img.shields.io/npm/dm/${ project.data.npm  }.svg" alt="${ project.data.title  } downloads" loading="lazy" decoding="async"></a>`);
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

	return settings;
};