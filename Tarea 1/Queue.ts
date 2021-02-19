import { Node } from "./Node.ts";

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
   * Test whether container is empty
   */
  isEmpty() {
    return this.back === null;
  }

  /**
   * Return size
   */
  get length() {
    return this.size;
  }

  /**
   * Access next element
   */
  get front() {
    return this.back?.next?.value ?? null;
  }

  /**
   * Remove and return next element. If queue is empty, return `null`.
   */
  pop() {
    let curr = this.back?.next;

    if (this.back?.next == this.back) this.back = null;
    else this.back!.next = curr?.next;

    this.size--;

    return curr?.value ?? null;
  }

  /**
   * Insert element
   * @param value Value to which the inserted element is initialized.
   */
  push(value: T) {
    if (this.back === null) {
      this.back = new Node(value);
      this.back.next = this.back;
    } else {
      this.back!.next = new Node(value, this.back?.next);
      this.back = this.back?.next;
    }

    this.size++;

    return this.back!.value;
  }
}
