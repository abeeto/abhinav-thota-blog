module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/styles")
    eleventyConfig.addPassthroughCopy("./src/assets")
    eleventyConfig.addPassthroughCopy("./src/**/*.js")
    return {
        dir : {
            input: "src",
            output: "public",
        }
    }
}