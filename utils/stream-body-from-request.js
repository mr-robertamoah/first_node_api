module.exports = async (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
    
            req.on("end", () => {
                resolve(JSON.parse(data))
            })
        } catch (e) {
            res.writeHead(500)
            res.end(
                JSON.stringify({
                    message: "An internal error occurred. Please try again later."
                })
            )
            reject()
        }
    })
}