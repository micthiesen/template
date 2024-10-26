import { z } from "zod";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

const stringInt = z.string().transform((val) => Number.parseInt(val, 10));
const config = z
  .object({
    PORT: stringInt,
    LOG_LEVEL: z.nativeEnum(LogLevel).optional().default(LogLevel.INFO),
    AUTH_TOKEN: z.string(),
    PUSHOVER_USER: z.string(),
    PUSHOVER_TOKEN: z.string(),
  })
  .parse(process.env);
export default config;
