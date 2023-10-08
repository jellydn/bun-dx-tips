import logger from "@productsway/logger";
import express from "express";

const app = express();
const port = Bun.env.PORT ?? 8080;
const hostname = Bun.env.HOSTNAME ?? "localhost";

app.get("/", (_req: express.Request, res: express.Response) => {
  logger.info("Hello World!");
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  logger.info(
    `Server started at ${Bun.env.SERVER_URL ?? `http://${hostname}:${port}`}`,
  );
});
