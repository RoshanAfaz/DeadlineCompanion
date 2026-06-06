import http from "node:http";
import { Readable } from "node:stream";
import fs from "node:fs";
import path from "node:path";
import serverEntry from "./dist/server/server.js";

const PORT = process.env.PORT || 3000;

// Simple mime types lookup
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const server = http.createServer(async (req, res) => {
  try {
    // 1. Serve static files from dist/client if they exist
    const cleanPath = req.url.split("?")[0];
    const clientFilePath = path.join(process.cwd(), "dist", "client", cleanPath === "/" ? "index.html" : cleanPath);
    
    if (fs.existsSync(clientFilePath) && !fs.statSync(clientFilePath).isDirectory()) {
      const ext = path.extname(clientFilePath);
      res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      fs.createReadStream(clientFilePath).pipe(res);
      return;
    }

    // 2. Otherwise, delegate to TanStack SSR handler
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["host"] || `localhost:${PORT}`;
    const url = new URL(req.url, `${protocol}://${host}`);

    const webReq = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
      duplex: "half",
    });

    const webRes = await serverEntry.fetch(webReq);

    res.statusCode = webRes.status;
    res.statusMessage = webRes.statusText;
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webRes.body) {
      const readable = Readable.fromWeb(webRes.body);
      readable.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error("Error handling request:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
