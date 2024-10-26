import cron from "node-cron";
import Logger from "../utils/Logger.js";
import TaskManager from "./TaskManager.js";

const logger = new Logger("Cron");
const manager = new TaskManager(logger);

export function schedule() {
  if (manager.hasTasks()) {
    cron.schedule(
      "*/20 * * * * *",
      async () => {
        await randomSleep(); // Fuzz
        logger.debug("Running scheduled tasks...");
        await manager.runTasks();
      },
      { runOnInit: false },
    );
    logger.debug("Scheduled tasks");
  } else {
    logger.debug("No tasks to schedule");
  }
}

function randomSleep(maxMilliseconds = 3000): Promise<void> {
  const delay = Math.floor(Math.random() * maxMilliseconds);
  return new Promise((resolve) => setTimeout(resolve, delay));
}
