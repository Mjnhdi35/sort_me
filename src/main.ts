import "reflect-metadata";

import { app } from "./app.js";
import { env } from "./config/env.js";
import { AppDataSource } from "./database/data-source.js";

async function bootstrap() {
  await AppDataSource.initialize();

  console.log("Database connected");

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received. Shutting down...`);

    server.close(async () => {
      await AppDataSource.destroy();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start application", error);
  process.exit(1);
});
