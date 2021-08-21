const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("posts", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("show", "layouts/show.njk");

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  // only content in the `show/` directory
  eleventyConfig.addCollection("show", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/show\//) !== null;
    });
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  
  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("playground");
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("service-worker.js");
  eleventyConfig.addPassthroughCopy("feed.xml");
  eleventyConfig.addPassthroughCopy("netlify.toml");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  //  Syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // RSS
  
  eleventyConfig.addPlugin(pluginRss);

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItOptions = {
    html: true
  };
  let mila = require("markdown-it-link-attributes");
  let milaOptions = {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  };
  let markdownLib = markdownIt(markdownItOptions).use(mila, milaOptions);
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };

};
