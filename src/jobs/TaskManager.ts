import PQueue from "p-queue";
import type Logger from "../utils/Logger.js";

export abstract class Task {
  public abstract name: string;
  public abstract run(): Promise<void>;
}

export default class TaskManager {
  private queue: PQueue;
  private tasks: Task[] = [];
  private logger: Logger;

  public constructor(parentLogger: Logger) {
    this.logger = parentLogger.extend("TaskManager");
    this.queue = new PQueue({ concurrency: 1 });
  }

  public addTask(factory: (logger: Logger) => Task): void {
    this.tasks.push(factory(this.logger));
  }

  public hasTasks(): boolean {
    return this.tasks.length > 0;
  }

  public async runTasks(): Promise<void> {
    for (const task of this.tasks) {
      this.queue.add(async () => {
        try {
          this.logger.debug(`Running task: ${task.name}`);
          await task.run();
        } catch (err) {
          this.logger.error(`Error running task: ${task.name}`, err);
        }
      });
    }
  }
}
