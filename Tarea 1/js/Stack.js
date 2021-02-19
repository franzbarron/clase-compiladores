class Node1 {
    constructor(value1, next){
        this.value = value1;
        this.next = next ?? null;
    }
}
const Node2 = Node1;
class Stack1 {
    constructor(){
        this.topNode = null;
        this.size = 0;
    }
    isEmpty() {
        return this.topNode === null;
    }
    get length() {
        return this.size;
    }
    get top() {
        return this.topNode?.value ?? null;
    }
    pop() {
        let curr = this.topNode;
        this.topNode = curr?.next;
        this.size--;
        return curr?.value ?? null;
    }
    push(value) {
        this.topNode = new Node2(value, this.topNode);
        this.size++;
        return this.topNode.value;
    }
}
export { Stack1 as Stack };
