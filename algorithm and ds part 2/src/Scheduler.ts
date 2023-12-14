import { PriorityQueue } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): any;
}

export class Scheduler implements SchedulerI {
  priorityQueue: PriorityQueue<any>;
  constructor() {
    this.priorityQueue = new PriorityQueue()
  }
  async postTask(task: () => Promise<any>, priority: number) {
    this.priorityQueue.enqueue(task, priority);
  }
  async run() {
    while (this.priorityQueue.size() > 0) {
      const value = this.priorityQueue.dequeue();
      await value();
    }

  }
}
