import http from "http";
import { URL } from "url";
import { promises as fs } from "fs";

const addr = "http://localhost:9090/";

const server = http.createServer(async (req, res) => {
  try {
    const myUrl = new URL(req.url, addr);
    const filename =
      myUrl.pathname === "/"
        ? "index.html"
        : myUrl.pathname.substring(1) + ".html";

    // Use promises-based readFile with async/await
    const data = await fs.readFile(filename, "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
});

server.listen(9090, () => {
  console.log(`Server running at ${addr}`);
});
