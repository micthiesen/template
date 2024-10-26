import { z } from "zod";

const stringInt = z.string().transform((val) => Number.parseInt(val, 10));
const config = z
  .object({
    PORT: stringInt,
    AUTH_TOKEN: z.string(),
    PUSHOVER_USER: z.string(),
    PUSHOVER_TOKEN: z.string(),
  })
  .parse(process.env);
export default config;
