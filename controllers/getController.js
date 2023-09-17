const resolveDefault = require("./resolveDefaultController");

module.exports = (req, res) => {
    let [, , id] = req.url.split("/").filter((val) => val.length)
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    if (id && baseUrl == "/api/movies") {
        let movie = req.movies.find((value) => value.id == id)

        data = {}
        if (movie) {
            data.movie = movie
        } else {
            data.message = `no message with id ${id} was found.`
        }
        
        res.end(
            JSON.stringify(data)
        )
    } else if (req.url == "/api/movies") {
        res.end(
            JSON.stringify({
                movies: req.movies
            })
        )
    } else {
        resolveDefault(req, res);
    }
}