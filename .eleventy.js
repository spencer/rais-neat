const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  //CurrentYear
  eleventyConfig.addShortcode("currentYear", function(){
    return new Date().getFullYear();
  });

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });
  
  eleventyConfig.addFilter("ukDate", (dateObj) => {
    return DateTime.fromISO(dateObj).toFormat(
      "dd/MM/yy"
    );
  });
  
  eleventyConfig.addFilter("year", (dateObj) => {
    return DateTime.fromISO(dateObj).toFormat(
      "yyyy"
    );
  });
  
  eleventyConfig.addFilter("pluck", function (arr, selections, attr) {
    // Assumes this is receiving a collection, hence the `data`
    return arr.filter((item) => selections.includes(item.data[attr]));
  });

  eleventyConfig.addFilter("pluckFromData", function (arr, selections, attr) {
    // custom array from _data, update accordingly
    return arr.filter((item) => selections.includes(item[attr]));
  });
  
  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./src/static/js/app.js":"./static/js/app.js"
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // // Minify HTML
  // eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
  //   // Eleventy 1.0+: use this.inputPath and this.outputPath instead
  //   if (outputPath.endsWith(".html")) {
  //     let minified = htmlmin.minify(content, {
  //       useShortDoctype: true,
  //       removeComments: true,
  //       collapseWhitespace: true,
  //     });
  //     return minified;
  //   }

  //   return content;
  // });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
