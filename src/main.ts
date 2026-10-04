import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  res.end(
    JSON.stringify({
      message: "Hello from Docker!",
    }),
  );
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

const shutdown = () => {
  console.log("Shutting down server...");

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
