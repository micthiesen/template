import { type HttpBindings, serve as honoServe } from "@hono/node-server";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";
import { timeout } from "hono/timeout";
import config from "../utils/config.js";
import Logger from "../utils/Logger.js";

const logger = new Logger("App");

const app = new Hono<{ Bindings: HttpBindings }>();
app.use(honoLogger(logger.debug.bind(logger)), timeout(15000));
app.use(async (ctx, next) => {
  const token = ctx.req.query("token");
  if (token !== config.AUTH_TOKEN) return ctx.text("Unauthorized", 401);
  return next();
});
app.onError(async (err, ctx) => {
  return ctx.text(`Error: ${err.message}`);
});

app.get("ping", async (ctx) => {
  return ctx.text("Hello World");
});

export function serve() {
  honoServe({ fetch: app.fetch, port: config.PORT }, (info) => {
    logger.info(`Listening on http://localhost:${info.port}`);
  });
}
