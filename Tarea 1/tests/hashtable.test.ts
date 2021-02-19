import { HashTable } from "../HashTable.ts";
import {
  assert,
  assertEquals,
  assertExists,
  assertNotEquals,
} from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("Hash table creation", () => {
  const ht = new HashTable<string, string>();
  assertExists(ht);
});

Deno.test("Length of empty hash table", () => {
  const ht = new HashTable<string, string>();
  assertEquals(ht.length, 0);
});

Deno.test("Hash table is empty", () => {
  const ht = new HashTable<string, string>();
  assert(ht.isEmpty());
});

Deno.test("Insertion to hash table", () => {
  const ht = new HashTable<string, string>();
  assert(ht.set("white", "#FFFFFF"));
});

Deno.test("Length of non empty hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("silver", "#C0C0C0");
  ht.set("gray", "#808080");
  assertEquals(ht.length, 2);
});

Deno.test("Hash table is not empty", () => {
  const ht = new HashTable<string, string>();
  ht.set("black", "#000000");
  ht.set("red", "#FF0000");
  ht.set("maroon", "#800000");
  assertEquals(ht.isEmpty(), false);
});

Deno.test("Hash table includes a key", () => {
  const ht = new HashTable<string, string>();
  ht.set("yellow", "#FFFF00");
  ht.set("olive", "#808000");
  ht.set("lime", "#00FF00");
  ht.set("green", "#008000");
  assert(ht.includes("lime"));
});

Deno.test("Hash table does not include a key", () => {
  const ht = new HashTable<string, string>();
  ht.set("aqua", "#00FFFF");
  assertEquals(ht.includes("white"), false);
});

Deno.test("Getting value of existing key in hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("teal", "#008080");
  ht.set("blue", "#0000FF");
  assertEquals(ht.get("blue"), "#0000FF");
});

Deno.test("Getting value of a key not existing in hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("navy", "#000080");
  ht.set("fuchsia", "#FF00FF");
  ht.set("purple", "#800080");
  assertEquals(ht.get("silver"), null);
});

Deno.test("Insertion with existing key updates value", () => {
  const ht = new HashTable<string, string>();
  ht.set("white", "#FFFFFF");
  ht.set("silver", "#C0C0C0");
  ht.set("gray", "#808080");
  ht.set("gray", "#A9A9A9");
  assertEquals(ht.get("gray"), "#A9A9A9");
});

Deno.test("Insertion with existing key does not increase length", () => {
  const ht = new HashTable<string, string>();
  ht.set("black", "#000000");
  const originalLength = ht.length;
  ht.set("black", "#010101");
  const newLength = ht.length;
  assert(originalLength === newLength);
});

Deno.test("Removal of element from hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("red", "#FF0000");
  ht.set("maroon", "#800000");
  assertNotEquals(ht.remove("maroon"), null);
});

Deno.test("Removal of element with non existing key on hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("yellow", "#FFFF00");
  ht.set("olive", "#808000");
  ht.set("lime", "#00FF00");
  assertEquals(ht.remove("gray"), null);
});

Deno.test("Existance of removed element from hash table", () => {
  const ht = new HashTable<string, string>();
  ht.set("green", "#008000");
  ht.set("aqua", "#00FFFF");
  ht.set("teal", "#008080");
  ht.set("blue", "#0000FF");
  ht.remove("teal");
  assertEquals(ht.includes("teal"), false);
});

Deno.test("Length of hash table after removal of element", () => {
  const ht = new HashTable<string, string>();
  ht.set("navy", "#000080");
  ht.set("fuchsia", "#FF00FF");
  ht.remove("fuchsia");
  assertEquals(ht.length, 1);
});

Deno.test("Length of hash table after clear", () => {
  const ht = new HashTable<string, string>();
  ht.set("purple", "#800080");
  ht.set("white", "#FFFFFF");
  ht.set("silver", "#C0C0C0");
  ht.clear();
  assertEquals(ht.length, 0);
});

Deno.test("Existance of key in hash table after clear", () => {
  const ht = new HashTable<string, string>();
  ht.set("gray", "#808080");
  ht.set("black", "#000000");
  ht.set("red", "#FF0000");
  ht.set("maroon", "#800000");
  ht.clear();
  assertEquals(ht.get("gray"), null);
});
