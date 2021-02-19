// This code is based on that found and explained on https://www.geeksforgeeks.org/implementing-our-own-hash-table-with-separate-chaining-in-java/

import Murmurhash3 from "https://deno.land/x/murmurhash/mod.ts";

class Node<K, V> {
  key: K;
  value: V;
  next: Node<K, V> | null = null;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

interface KeyType {
  toString(): string;
}

export class HashTable<K extends KeyType, V> {
  private bucket: Node<K, V>[] | null[];
  private numBuckets: number;
  private size: number;

  /**
   * Create a Hash Table
   */
  constructor() {
    this.numBuckets = 8;
    this.size = 0;
    this.bucket = Array(this.numBuckets).fill(null);
  }

  /**
   * Get the index where a key is stored based on its hash
   * @param key The key of the element to hash
   */
  private getBucketIndex(key: K) {
    let hashCode = new Murmurhash3(key.toString()).result();
    let index = hashCode % this.numBuckets;
    return index;
  }

  /**
   * Return container size
   */
  get length() {
    return this.size;
  }

  /**
   * Test whether container is empty
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Insert elements
   * @param key The key of the element to insert
   * @param value The value of the element to insert
   */
  set(key: K, value: V) {
    let bucketIndex = this.getBucketIndex(key);
    let head: Node<K, V> | null = this.bucket[bucketIndex];

    while (head) {
      if (head.key === key) {
        head.value = value;
        return true;
      }
      head = head.next;
    }

    this.size++;

    head = this.bucket[bucketIndex];
    let newNode = new Node<K, V>(key, value);
    newNode.next = head;
    this.bucket[bucketIndex] = newNode;

    if (this.size / this.numBuckets >= 0.7) {
      let temp = this.bucket;
      this.numBuckets *= 2;
      this.size = 0;
      this.bucket = Array(this.numBuckets).fill(null);

      for (let headNode of temp) {
        while (headNode) {
          this.set(headNode.key, headNode.value);
          headNode = headNode.next;
        }
      }
    }
    return true;
  }

  /**
   * Access value associated with a key
   * @param key The key of the element to access
   */
  get(key: K) {
    let bucketIndex = this.getBucketIndex(key);
    let head = this.bucket[bucketIndex];

    while (head) {
      if (head.key === key) return head.value;

      head = head.next;
    }

    return null;
  }

  /**
   * Erase elements
   * @param key The key of the element to delete
   */
  remove(key: K) {
    let bucketIndex = this.getBucketIndex(key);
    let head: Node<K, V> | null = this.bucket[bucketIndex];
    let prev = null;

    while (head) {
      if (head.key === key) break;
      prev = head;
      head = head.next;
    }

    if (!head) return null;

    this.size--;

    if (prev) prev.next = head.next;
    else this.bucket[bucketIndex] = head.next;

    return head.value;
  }

  /**
   * Removes all key-value pairs from the hash table
   */
  clear() {
    this.numBuckets = 8;
    this.bucket = Array(this.numBuckets).fill(null);
    this.size = 0;
  }

  /**
   * Test wether a key is present in the hash table
   * @param key The key of the element to test for presence
   */
  includes(key: K) {
    let bucketIndex = this.getBucketIndex(key);
    let head = this.bucket[bucketIndex];

    while (head) {
      if (head.key === key) return true;

      head = head.next;
    }

    return false;
  }

  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the Hash Table
   */
  *[Symbol.iterator]() {
    let bucketIndex = 0;

    do {
      let head = this.bucket[bucketIndex];
      while (head) {
        yield [head.key, head.value];
        head = head.next;
      }
      bucketIndex++;
    } while (bucketIndex < this.bucket.length);
  }
}
