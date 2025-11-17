module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/styles")
    eleventyConfig.addPassthroughCopy("./src/styles/page.css")

    return {
        dir : {
            input: "src",
            output: "public",
        }
    }
}