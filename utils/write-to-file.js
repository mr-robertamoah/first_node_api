const fs = require("fs")
const path = require("path")

module.exports = async (req, res) => {

    try {
        await fs.writeFileSync(
            path.join(__dirname, "..", "data", 'movies.json'), 
            JSON.stringify(req.movies),
            "utf-8"
        )
    } catch (e) {
        res.statusCode = 500
        res.end(
            JSON.stringify({
                message: "An internal error occurred. Please try again later."
            })
        )
    }
}