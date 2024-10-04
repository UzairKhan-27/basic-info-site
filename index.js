let http = require("http");
let url = require("url");
let fs = require("fs");
let addr = "http://localhost:9090/";
http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename =
      q.pathname === "/" ? "index.html" : q.pathname.substring(1) + ".html";

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(9090);
