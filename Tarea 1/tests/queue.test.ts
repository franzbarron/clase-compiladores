import { Queue } from "../Queue.ts";
import {
  assert,
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("Queue creation", () => {
  const q = new Queue<number>();
  assertExists(q);
});

Deno.test("Queue is empty", () => {
  const q = new Queue<number>();
  assert(q.isEmpty());
});

Deno.test("Queue of length 0", () => {
  const q = new Queue<number>();
  assertEquals(q.length, 0);
});

Deno.test("Pushing to queue", () => {
  const q = new Queue<number>();
  assertEquals(q.push(1), 1);
});

Deno.test("Queue of length greater that 0", () => {
  const q = new Queue<number>();
  q.push(4);
  q.push(5);
  q.push(6);
  q.push(7);
  assertEquals(q.length, 4);
});

Deno.test("Queue is not empty", () => {
  const q = new Queue<number>();
  q.push(5);
  q.push(8);
  q.push(7);
  q.push(6);
  assertEquals(q.isEmpty(), false);
});

Deno.test("Getting front of queue", () => {
  const q = new Queue<number>();
  q.push(5);
  q.push(8);
  q.push(7);
  q.push(6);
  assertEquals(q.front, 5);
});

Deno.test("Top of empty queue", () => {
  const q = new Queue<number>();
  assertEquals(q.front, null);
});

Deno.test("Queue pop", () => {
  const q = new Queue<number>();
  q.push(5);
  q.push(8);
  q.push(7);
  q.push(6);
  assertEquals(q.pop(), 5);
});

Deno.test("Length of queue after poping", () => {
  const q = new Queue<number>();
  q.push(5);
  q.push(8);
  q.push(7);
  q.push(6);
  q.pop();
  assertEquals(q.length, 3);
});
