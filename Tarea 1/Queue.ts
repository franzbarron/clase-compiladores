import { Node } from "./Node.ts";

/**
 * Implementation of queues, first-in first-out containers
 */
export class Queue<T> {
  private back: Node<T> | null;
  private size: number;

  /**
   * Create a Queue, a FIFO container
   */
  constructor() {
    this.back = null;
    this.size = 0;
  }

  /**
   * Returns whether the queue is empty: i.e. whether its size is zero.
   * @returns `true` if the queue's size is `0`, `false` otherwise.
   */
  isEmpty(): boolean {
    return this.back === null;
  }

  /**
   * The number of elements in the queue.
   */
  get length(): number {
    return this.size;
  }

  /**
   * Returns the next element in the queue.
   * @returns The next element in the queue.
   */
  get front(): T | null {
    return this.back?.next!.value ?? null;
  }

  /**
   * Removes the next element in the queue, effectively reducing its size by one.
   * @returns The removed element from the queue; `null` if the queue is empty.
   */
  pop(): T | null {
    let curr = this.back?.next;

    if (this.back?.next == this.back) this.back = null;
    else this.back!.next = curr?.next;

    this.size--;

    return curr!.value ?? null;
  }

  /**
   * Inserts a new element at the end of the queue, after its current last element.
   * @param value Value to which the inserted element is initialized.
   * @returns The new `length` property of the queue.
   */
  push(value: T): number {
    if (this.back === null) {
      this.back = new Node(value);
      this.back.next = this.back;
    } else {
      this.back!.next = new Node(value, this.back?.next);
      this.back = this.back?.next;
    }

    return ++this.size;
  }
}
