class MurmurHash3 {
    constructor(key1, seed1){
        this.reset(seed1);
        if (typeof key1 === "string" && key1.length > 0) {
            this.hash(key1);
        }
    }
    hash(key) {
        let h1;
        let top;
        let len = key.length;
        this.len += len;
        let k1 = this.k1;
        let i = 0;
        switch(this.rem){
            case 0:
                k1 ^= len > i ? key.charCodeAt(i++) & 65535 : 0;
            case 1:
                k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 8 : 0;
            case 2:
                k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 16 : 0;
            case 3:
                k1 ^= len > i ? (key.charCodeAt(i) & 255) << 24 : 0;
                k1 ^= len > i ? (key.charCodeAt(i++) & 65280) >> 8 : 0;
        }
        this.rem = len + this.rem & 3;
        len -= this.rem;
        if (len > 0) {
            h1 = this.h1;
            while(1){
                k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
                k1 = k1 << 15 | k1 >>> 17;
                k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
                h1 ^= k1;
                h1 = h1 << 13 | h1 >>> 19;
                h1 = h1 * 5 + 3864292196 & 4294967295;
                if (i >= len) {
                    break;
                }
                k1 = key.charCodeAt(i++) & 65535 ^ (key.charCodeAt(i++) & 65535) << 8 ^ (key.charCodeAt(i++) & 65535) << 16;
                top = key.charCodeAt(i++);
                k1 ^= (top & 255) << 24 ^ (top & 65280) >> 8;
            }
            k1 = 0;
            switch(this.rem){
                case 3:
                    k1 ^= (key.charCodeAt(i + 2) & 65535) << 16;
                case 2:
                    k1 ^= (key.charCodeAt(i + 1) & 65535) << 8;
                case 1:
                    k1 ^= key.charCodeAt(i) & 65535;
            }
            this.h1 = h1;
        }
        this.k1 = k1;
    }
    result() {
        let k1 = this.k1;
        let h1 = this.h1;
        if (k1 > 0) {
            k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
            k1 = k1 << 15 | k1 >>> 17;
            k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
            h1 ^= k1;
        }
        h1 ^= this.len;
        h1 ^= h1 >>> 16;
        h1 = h1 * 51819 + (h1 & 65535) * 2246770688 & 4294967295;
        h1 ^= h1 >>> 13;
        h1 = h1 * 44597 + (h1 & 65535) * 3266445312 & 4294967295;
        h1 ^= h1 >>> 16;
        return h1 >>> 0;
    }
    reset(seed) {
        this.h1 = typeof seed === "number" ? seed : 0;
        this.rem = this.k1 = this.len = 0;
    }
}
class Node1 {
    next = null;
    constructor(key2, value1){
        this.key = key2;
        this.value = value1;
    }
}
class HashTable1 {
    constructor(){
        this.numBuckets = 8;
        this.size = 0;
        this.bucket = Array(this.numBuckets).fill(null);
    }
    getBucketIndex(key) {
        let hashCode = new MurmurHash3(key).result();
        let index = hashCode % this.numBuckets;
        return index;
    }
    get length() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    set(key, value) {
        let bucketIndex = this.getBucketIndex(key);
        let head = this.bucket[bucketIndex];
        while(head){
            if (head.key === key) {
                head.value = value;
                return true;
            }
            head = head.next;
        }
        this.size++;
        head = this.bucket[bucketIndex];
        let newNode = new Node1(key, value);
        newNode.next = head;
        this.bucket[bucketIndex] = newNode;
        if (this.size / this.numBuckets >= 0.7) {
            let temp = this.bucket;
            this.numBuckets *= 2;
            this.size = 0;
            this.bucket = Array(this.numBuckets).fill(null);
            for (let headNode of temp){
                while(headNode){
                    this.set(headNode.key, headNode.value);
                    headNode = headNode.next;
                }
            }
        }
        return true;
    }
    get(key) {
        let bucketIndex = this.getBucketIndex(key);
        let head = this.bucket[bucketIndex];
        while(head){
            if (head.key === key) return head.value;
            head = head.next;
        }
        return null;
    }
    remove(key) {
        let bucketIndex = this.getBucketIndex(key);
        let head = this.bucket[bucketIndex];
        let prev = null;
        while(head){
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
    clear() {
        this.numBuckets = 8;
        this.bucket = Array(this.numBuckets).fill(null);
        this.size = 0;
    }
    includes(key) {
        let bucketIndex = this.getBucketIndex(key);
        let head = this.bucket[bucketIndex];
        while(head){
            if (head.key === key) return true;
            head = head.next;
        }
        return false;
    }
}
export { HashTable1 as HashTable };
