import { Node } from "./Node.ts";

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
   * Test whether container is empty
   */
  isEmpty() {
    return this.topNode === null;
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
  get top() {
    return this.topNode?.value ?? null;
  }

  /**
   * Remove and return top element. If stack is empty, return `null`
   */
  pop() {
    let curr = this.topNode;
    this.topNode = curr?.next;
    this.size--;

    return curr?.value ?? null;
  }

  /**
   * Insert element
   * @param value Value to which the inserted element is initialized.
   */
  push(value: T) {
    this.topNode = new Node(value, this.topNode);
    this.size++;

    return this.topNode.value;
  }
}
