const resolveDefault = require("./resolveDefaultController");
const writeToFile = require("../utils/write-to-file")
const streamBodyFromRequest = require("../utils/stream-body-from-request")
const uuid = require("crypto")

module.exports = async (req, res) => {
    if (req.url == "/api/movies") {        
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

        req.movies.push({
            id: uuid.randomUUID(),
            ...body
        })

        await writeToFile(req, res)
        
        res.writeHead(204)
        res.end()
    } else {
        resolveDefault(req, res);
    }   
}