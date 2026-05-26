const ejsPlugin = require("@11ty/eleventy-plugin-ejs");
const Image = require("@11ty/eleventy-img");
// const img2picture = require("eleventy-plugin-img2picture");
const pluginLess = require("eleventy-plugin-less");
const redirectsPlugin = require('eleventy-plugin-redirects');
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
	eleventyConfig.addPassthroughCopy("src/CNAME");
	eleventyConfig.addPassthroughCopy("src/Nathan-Friedly-Resume.pdf");
	
	eleventyConfig.addPlugin(ejsPlugin);
	eleventyConfig.addPlugin(pluginLess);
	eleventyConfig.addPlugin(redirectsPlugin, {
		template: 'clientSide', // netlify, vercel or clientSide
		redirects: {
			"/eoc": "http://folding.extremeoverclocking.com/?nav=IMAGES",
			"/pagerank": "http://incline.digital",
			"/pagerank.js": "http://incline.digital",
			"stuff/afgame": "http://air-force-game.nfriedly.com/",
			"stuff/afgame/index.php": "http://air-force-game.nfriedly.com/",
			"stuff/arcade.php": "http://air-force-game.nfriedly.com/",
			"/stuff/ddgg-da": "http://ddgg.nfriedly.com/",
			"/stuff/duckduckgoogle": "http://ddgg.nfriedly.com/",
			"/stuff/rss-xslt": "http://rss-xslt.herokuapp.com/",
			"/stuff/jquery-requirejs-noconflict-issue/": "https://github.com/nfriedly/nfriedly.com-v4/tree/master/stuff/jquery-requirejs-noconflict-issue",
			"/px": "https://github.com/nfriedly/node-unblocker",
			"/px/index.php": "https://github.com/nfriedly/node-unblocker",
			"/px/poxy/": "https://github.com/nfriedly/node-unblocker",
			"/px/poxy/index.php": "https://github.com/nfriedly/node-unblocker",
			"/px/a2/": "https://github.com/nfriedly/node-unblocker",
			"/px/a2/index.php": "https://github.com/nfriedly/node-unblocker",
			"/px/invisiproxy": "https://github.com/nfriedly/node-unblocker",
			"/px/invisiproxy/index.php": "https://github.com/nfriedly/node-unblocker",
			"/px/phpr0xi": "https://github.com/nfriedly/node-unblocker",
			"/px/phpr0xi/index.php": "https://github.com/nfriedly/node-unblocker",
			"/stuff/africa/": "https://nfriedly.github.io/africa/",
			"/stuff/bubblegum/": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step1.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step2.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step3.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step4.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step5.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum/step6.htm": "https://github.com/nfriedly/bubblegum",
			"/stuff/bubblegum_pub/": "https://github.com/nfriedly/bubblegum",

			// incline
			"webdev": "http://incline.digital",
			"webdev/javascript": "http://incline.digital/javascript/",
			"webdev/marketing": "http://incline.digital",
			"webdev/php": "http://incline.digital",
			"demos": "http://incline.digital",
			"demos/twitter": "http://incline.digital",
			"quote": "http://incline.digital",
			"estimate": "http://incline.digital",
			"clients": "http://incline.digital",
			"blb": "http://incline.digital",
			"/pagerank": "http://incline.digital",
			"/pagerank.js": "http://incline.digital",

			// onsite, but easier this way
			"/files/Nathan-Friedly-Resume.pdf": "/Nathan-Friedly-Resume.pdf",
		}
	})

	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addShortcode("projectImage", async function (src, alt="") {
		// 3 different breakpoints (the smallest size just makes it a 1/3 of the width, so use the 210px image for that)
		let widths = [350, 284, 210];
		widths = widths.concat(widths.map(w => w*2)); // add in 2x sizes for high-dpi displays

		// the eleventy-img plugin doesn't know about the input & output directories (at least not when used this way)
		if (!src.includes('//')) {
			src = settings.dir.input + '/' + src;
		}
		const outputDir = settings.dir.output + '/' + 'img/';

		let imgAttributes = {
			alt,
			sizes: "auto",
			loading: "lazy",
			decoding: "async",
			class: "img-thumbnail"
		};

		return await Image(src, {
			widths,
			returnType: "html", // Added in v6.0
			outputDir,
			htmlOptions: {
				imgAttributes,
			}
		});
	});

	
	eleventyConfig.addCollection("featuredPosts", function (collectionApi) {
		// get unsorted items
		return collectionApi.getFilteredByTag("techblog").filter(p => p.data.featured).reverse().slice(0,4);
	});
 
	function projectsCollection(collectionApi) {
		// get everything from the projects folder, without changing it's tags
		return collectionApi.getFilteredByGlob("src/projects/*.md");
	}

	eleventyConfig.addCollection("projects", projectsCollection);

	// eleventyConfig.addCollection("projectsSorted", function(collectionApi) {
	// 	return projectsCollection(collectionApi).sort((a,b) => a.page.inputPath.localeCompare(b.page.inputPath))
	// })

	eleventyConfig.addCollection("projectsStart", function(collectionApi) {
		return projectsCollection(collectionApi).sort((a,b) => b.data.index - a.data.index).slice(0,20)
	})

	eleventyConfig.addCollection("projectsEnd", function(collectionApi) {
		return projectsCollection(collectionApi).sort((a,b) => b.data.index - a.data.index).slice(20)
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