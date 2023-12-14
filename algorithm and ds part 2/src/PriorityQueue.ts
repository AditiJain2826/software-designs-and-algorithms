interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | string;
  size(): number;
}

export class Node {
  value: any;
  priority: number;
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  heap: Node[];

  constructor() {
    this.heap = [];
  }

  size(): number {
    return this.heap.length;
  }

  enqueue(value: T, priority: number): void {
    const node = new Node(value, priority);
    this.heap.push(node);
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  swap(i1: number, i2: number) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()?.value;

    const top = this.heap[0].value;
    this.heap[0] = this.heap.pop()!;
    let currentIndex = 0;
    while (true) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let smallestChildIndex = null;

      if (leftChildIndex < this.heap.length) {
        if (this.heap[leftChildIndex].priority < this.heap[currentIndex].priority) {
          smallestChildIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < this.heap.length) {
        if (
          this.heap[rightChildIndex].priority < this.heap[currentIndex].priority &&
          this.heap[rightChildIndex].priority < this.heap[leftChildIndex].priority
        ) {
          smallestChildIndex = rightChildIndex;
        }
      }

      if (smallestChildIndex === null) break;

      this.swap(currentIndex, smallestChildIndex);
      currentIndex = smallestChildIndex;
    }
    return top;
  }
}