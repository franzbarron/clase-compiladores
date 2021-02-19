import { Stack } from "../Stack.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("Stack creation", () => {
  const s = new Stack<number>();
  assertExists(s);
});

Deno.test("Stack empty", () => {
  const s = new Stack<number>();
  assertEquals(s.isEmpty(), true);
});

Deno.test("Stack of length 0", () => {
  const s = new Stack<number>();
  assertEquals(s.length, 0);
});

Deno.test("Stack push", () => {
  const s = new Stack<number>();
  assertEquals(s.push(1), 1);
});

Deno.test("Stack with length greater that 0", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  assertEquals(s.length, 4);
});

Deno.test("Stack not empty", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  assertEquals(s.isEmpty(), false);
});

Deno.test("Stack top", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  assertEquals(s.top, 4);
});

Deno.test("Empty stack top", () => {
  const s = new Stack<number>();
  assertEquals(s.top, null);
});

Deno.test("Stack pop", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  assertEquals(s.pop(), 4);
});

Deno.test("Stack length after pop", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  s.pop();
  assertEquals(s.length, 3);
});
