require("dotenv").config()
const http = require("http");
const PORT = process.env.PORT

const get = require("./controllers/getController");
const post = require("./controllers/postController");
const put = require("./controllers/putController");
const del = require("./controllers/deleteController");
const movies = require("./data/movies.json");
const resolveDefault = require("./controllers/resolveDefaultController");

const server = http.createServer((req, res) => {
    req.movies = movies
    res.writeHead(200, {"Content-Type": "application/json"});
    switch (req.method) {
        case "GET":
            get(req, res);
            break;
        case "PUT":
            put(req, res);
            break;
        case "POST":
            post(req, res);
            break;
        case "DELETE":
            del(req, res);
            break;
        default:
            resolveDefault(req, res);
    }
});

server.listen(PORT);

