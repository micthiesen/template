import config, { LogLevel } from "./config.js";
import { sendNotification } from "./notifications.js";

const LOG_LEVEL_MAP: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 10,
  [LogLevel.INFO]: 20,
  [LogLevel.WARN]: 30,
  [LogLevel.ERROR]: 40,
};
const LOG_PREFIX_MAP: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: "[DEBUG]",
  [LogLevel.INFO]: " [INFO]",
  [LogLevel.WARN]: " [WARN]",
  [LogLevel.ERROR]: "[ERROR]",
};
const LOG_LEVEL_NUM = LOG_LEVEL_MAP[config.LOG_LEVEL];

export default class Logger {
  public constructor(public name: string) {}

  public extend(name: string): Logger {
    return new Logger(`${this.name}:${name}`);
  }

  public log(level: LogLevel, message: string, ...args: any[]) {
    const levelNum = LOG_LEVEL_MAP[level];
    if (levelNum < LOG_LEVEL_NUM) return;
    const messageFinal = `${LOG_PREFIX_MAP[level]} <${this.name}> ${message}`;
    console[level](messageFinal, ...args);
  }

  public debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  public info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
    (async () => {
      sendNotification({
        title: `Error: ${message}`,
        message: `${args}`,
      });
    })();
  }
}
