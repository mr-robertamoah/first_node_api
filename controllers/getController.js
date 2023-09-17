const resolveDefault = require("./resolveDefaultController");

module.exports = (req, res) => {
    let [, , id] = req.url.split("/").filter((val) => val.length)
    let url = req.url
    if (id) {
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
    } else if (url == "/api/movies") {
        res.end(
            JSON.stringify({
                movies: req.movies
            })
        )
    } else {
        resolveDefault(req, res);
    }
}