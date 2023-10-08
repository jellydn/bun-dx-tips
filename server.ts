import { Database, closeDB, createDB } from "@productsway/db";
import logger from "@productsway/logger";
import closeWithGrace from "close-with-grace";
import express from "express";

const app = express();
const port = Bun.env.PORT ?? 8080;
const hostname = Bun.env.HOSTNAME ?? "localhost";

app.get("/", (_req: express.Request, res: express.Response) => {
  logger.info("Hello World!");
  res.send("Hello World!");
});

app.get("/health-check", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok" });
});

app.post("/halt", (_req: express.Request, res: express.Response) => {
  logger.info("Halt!");
  res.json({ status: "halt" });
  process.kill(process.pid, "SIGTERM");
});

let db: Database;
const server = app.listen(port, hostname, () => {
  logger.info(
    `Server started at ${Bun.env.SERVER_URL ?? `http://${hostname}:${port}`}`,
  );
  createDB();
});

closeWithGrace(
  {
    delay: 500,
  },
  async ({ signal, err }) => {
    if (signal) {
      logger.info(`Received signal to terminate: ${signal}`);
    }

    if (err) {
      logger.error(`Graceful shutdown failed: ${err.message}`);
    }

    logger.info("Closing server");
    closeDB(db);
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    logger.info("Server closed");
  },
);
