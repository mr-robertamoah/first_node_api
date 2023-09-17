const resolveDefault = require("./resolveDefaultController");
const writeToFile = require("../utils/write-to-file")

module.exports = async (req, res) => {
    let [, , id] = req.url.split("/").filter((val) => val.length)
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    if (id && baseUrl == "/api/movies") {
        let index = req.movies.findIndex((value) => value.id == id)
        
        let data = {}
        if (index != -1) {
            req.movies.splice(index, 1)
            data.message = `movie with id ${id} has been deleted`

            await writeToFile(req, res)
        } else {
            data.message = `no message with id ${id} was found.`
        }
        
        res.end(
            JSON.stringify(data)
        )
    } else {
        resolveDefault(req, res);
    }   
}