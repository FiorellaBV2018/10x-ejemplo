const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
};

const server = http.createServer((req, res) => {
  let file = req.url === "/" ? "/index.html" : req.url;
  file = path.join(ROOT, file);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("No encontrado");
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
