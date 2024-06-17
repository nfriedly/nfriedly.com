const _ = require("underscore");

module.exports = {
	eleventyComputed: {
		tagCloud: (data) => {
            const projects =  data.collections.projects;
            console.log('generating tag cloud for %s projects', projects.length)
            var counts, hits, max, min, multiplier, results;
            // pre-fill the hits collection to emphasize/de-emphasize the items I'd like to do more/less work with
            hits = {
              React: 15,
              IoT: 14,
              hardware: 6,
              "Node.js": 5,
              AngularJS: 5,
              "Mobile First": 4,
              Redis: 4,
              "Flash / ActionScript": -1,
              Twitter: -1,
              WordPress: -1,
              CodeIgniter: -2,
              SEO: -2,
              "e-Commerce": -4,
              CSS: -5,
              HTML: -5,
              CoffeeScript: -5, // ironic, I know
              Docpad: -8,
              PHP: -13
            };
            // build a map of name -> usage count
            _.each(projects, function(project) {
              _.each(project.data.tags || [], function(tag) {
                hits[tag] = hits[tag] || 0;
                hits[tag]++;
              });
            });
            // figure out our multiplier to get relative sizes
            counts = _.values(hits);
            min = _.min(counts);
            max = _.max(counts);
            multiplier = 1 / (max - min);
            // use the multiplier to normalize the counts
            // and convert the map into a list of objects
            results = [];
            _.each(hits, function(count, tag) {
              results.push({
                tag: tag,
                count: count,
                size: 70 + (count * multiplier * 100), // should be a reasonable percentage value
                minimize: count < 5
              });
            });
            return results.sort(function(a, b) {
              if (a.tag === b.tag) {
                return 0;
              } else {
                if (a.tag > b.tag) {
                  return 1;
                } else {
                  return -1;
                }
              }
            });
        },
	},
};