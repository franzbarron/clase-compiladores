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

/**
 * Implementation of hash tables, associative containers that store elements 
 * formed by the combination of a key and a mapped value, and which allows for 
 * fast retrieval of individual elements based on their keys.
 */
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
   * Get the index where a key is or should be stored based on its hash
   * @param key The key of the element to hash
   * @returns The index where a key is or should be stored
   */
  private getBucketIndex(key: K): number {
    let hashCode = new Murmurhash3(key.toString()).result();
    let index = hashCode % this.numBuckets;
    return index;
  }

  /**
   * The number of elements in the hash table
   */
  get length(): number {
    return this.size;
  }

  /**
   * Returns a `boolean` value indicating whether the hash table is empty, i.e. 
   * whether its size is 0.
   * @returns `true` if the container size is `0`, `false` otherwise.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Inserts new elements or upadates existing ones in the hash table.
   * @param key The key of the element to insert
   * @param value The value of the element to insert
   * @returns A `boolean` value indicating whether the element was successfully 
   * inserted or not.
   */
  set(key: K, value: V): boolean {
    try {
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
    } catch {
      return false;
    }
  }

  /**
   * Returns the mapped value of the element with key in the hash table.
   * @param key The key of the element to access
   * @returns The mapped value of the element with a key value, or `null` if the
   * key can't be found.
   */
  get(key: K): V | null {
    let bucketIndex = this.getBucketIndex(key);
    let head = this.bucket[bucketIndex];

    while (head) {
      if (head.key === key) return head.value;

      head = head.next;
    }

    return null;
  }

  /**
   * Removes the specified element from the hash table by key
   * @param key The key of the element to delete
   * @returns `true` if an element in the hash table existed and has been 
   * removed, or `false` if the element does not exist.
   */
  remove(key: K): boolean {
    let bucketIndex = this.getBucketIndex(key);
    let head: Node<K, V> | null = this.bucket[bucketIndex];
    let prev = null;

    while (head) {
      if (head.key === key) break;
      prev = head;
      head = head.next;
    }

    if (!head) return false;

    this.size--;

    if (prev) prev.next = head.next;
    else this.bucket[bucketIndex] = head.next;

    return true;
  }

  /**
   * Drops all the elements from the hash table, leaving it with a size of 0.
   */
  clear(): void {
    this.numBuckets = 8;
    this.bucket = Array(this.numBuckets).fill(null);
    this.size = 0;
  }

  /**
   * Returns a boolean indicating whether an element with the specified key 
   * exists or not.
   * @param key The key of the element to test for presence
   * @returns `true` if an element with the specified key exists in the hash 
   * table; otherwise `false`.
   */
  includes(key: K): boolean {
    let bucketIndex = this.getBucketIndex(key);
    let head = this.bucket[bucketIndex];

    while (head) {
      if (head.key === key) return true;

      head = head.next;
    }

    return false;
  }

  /**
   * Returns a new `Iterator` object that contains the [`key`, `value`] pairs 
   * for each element in the hash table
   * @yields The next [`key`, `value`] pair
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
