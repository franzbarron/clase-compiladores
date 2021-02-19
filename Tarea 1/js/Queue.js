class Node1 {
    constructor(value1, next){
        this.value = value1;
        this.next = next ?? null;
    }
}
const Node2 = Node1;
class Queue1 {
    constructor(){
        this.back = null;
        this.size = 0;
    }
    isEmpty() {
        return this.back === null;
    }
    get length() {
        return this.size;
    }
    get front() {
        return this.back?.next?.value ?? null;
    }
    pop() {
        let curr = this.back?.next;
        if (this.back?.next == this.back) this.back = null;
        else this.back.next = curr?.next;
        this.size--;
        return curr?.value ?? null;
    }
    push(value) {
        if (this.back === null) {
            this.back = new Node2(value);
            this.back.next = this.back;
        } else {
            this.back.next = new Node2(value, this.back?.next);
            this.back = this.back?.next;
        }
        this.size++;
        return this.back.value;
    }
}
export { Queue1 as Queue };
