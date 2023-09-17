module.exports = (req, res) => {
    res.statusCode = 404
    res.end(
        JSON.stringify({
            message: "Page not found or wrong method used"
        })
    )
}