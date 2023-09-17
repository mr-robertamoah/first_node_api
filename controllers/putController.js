const resolveDefault = require("./resolveDefaultController");
const writeToFile = require("../utils/write-to-file")
const streamBodyFromRequest = require("../utils/stream-body-from-request")

let isEmpty = (data) => {
    if (
        data.hasOwnProperty("genre") ||
        data.hasOwnProperty("title") ||
        data.hasOwnProperty("director") ||
        data.hasOwnProperty("year")
    ) {
        return false
    }

    return true
}

module.exports = async (req, res) => {
    let [, , id] = req.url.split("/").filter((val) => val.length)
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    if (id && baseUrl == "/api/movies") {
        let index = req.movies.findIndex((value) => value.id == id)
        let data = {}
        if (index != -1) {
            let body = await streamBodyFromRequest(req, res)

            if (!body) {
                res.writeHead(400)
                res.end(
                    JSON.stringify({
                        message: "Invalid data was sent."
                    })
                )
                return
            }

            if (isEmpty(data)) {
                res.writeHead(400)
                res.end(
                    JSON.stringify({
                        message: "No data was sent."
                    })
                )
                return
            }

            body = {...req.movies[index], ...body}
            req.movies.splice(index, 1, body)
            data.message = `movie with id ${id} has been updated`

            await writeToFile(req, res)
        } else {
            data.message = `no message with id ${id} was found.`
        }
        
        res.end(
            JSON.stringify(data)
        )

        await writeToFile(req, res)
        
        res.writeHead(204)
        res.end()
    } else {
        resolveDefault(req, res);
    }   
}