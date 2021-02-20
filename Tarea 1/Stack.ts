import { Node } from "./Node.ts";

/**
 * Implementation of stacks, first-in last-out containers
 */
export class Stack<T> {
  private topNode?: Node<T> | null;
  private size: number;

  /**
   * Create a Stack, a FILO container
   */
  constructor() {
    this.topNode = null;
    this.size = 0;
  }

  /**
   * Returns whether the stack is empty: i.e. whether its size is zero.
   * @returns `true` if the stacks's size is `0`, `false` otherwise.
   */
  isEmpty(): boolean {
    return this.topNode === null;
  }

  /**
   * The number of elements in the stack.
   */
  get length(): number {
    return this.size;
  }

  /**
   * Returns the next element in the stack.
   * @returns The next element in the stack.
   */
  get top(): T | null {
    return this.topNode?.value ?? null;
  }

  /**
   * Removes the next element in the queue, effectively reducing its size by one.
   * @returns The removed element from the queue; `null` if the queue is empty.
   */
  pop(): T | null {
    let curr = this.topNode;
    this.topNode = curr?.next;
    this.size--;

    return curr!.value ?? null;
  }

  /**
   * Inserts a new element at the top of the stack, above its current top
   * element.
   * @param value Value to which the inserted element is initialized.
   * @returns The new `length` property of the stack.
   */
  push(value: T): T {
    this.topNode = new Node(value, this.topNode);
    this.size++;

    return this.topNode.value;
  }
}
