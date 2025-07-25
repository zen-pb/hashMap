class LinkedList {
    constructor(){
        this.head = null;
        this.length = 0;
    }

    append(value) {
        if (this.head == null) {
            this.prepend(value)
        }
        else {
           let temp = this.head;
           while(temp.nextNode != null) {
            temp = temp.nextNode;
           }

           temp.nextNode = new Node(value, null)
           this.length += 1;
        }
    }

    prepend(value){
        this.head = new Node(value, this.head)
        this.length += 1;
    }

    size(){
        return this.length;
    }

    head(){
        return this.head;
    }

    tail(){
        if (!this.head) return null;

        let temp = this.head;
        while(temp.nextNode != null) {
        temp = temp.nextNode;
        }

        return temp;
    }

    at(index){
        if (!this.head) return null;

        if(index < 0){
            index = this.length + index;
        }

        if (index < 0 || index >= this.length) return null

        let counter = 0;
        let temp = this.head;
        while(counter < index){
            temp = temp.nextNode;
            counter++;
        }

        return temp;
    }

    pop(){
        if (!this.head) return null;

        if(this.head.nextNode == null){
            let value = this.head.value;
            this.head = null;
            return value;
        }

        let previous = this.head;
        let current = this.head.nextNode;
        while(current.nextNode != null){
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = null
        this.length -= 1;
        return current.value;
    }

    contains(value){
        let temp = this.head;
        while(temp.nextNode != null){
            if(temp.value === value){
                return true;
            }
            temp = temp.nextNode;
        }

        return false;
    }

    find(value){
        let temp = this.head;
        let counter = 0;
        while(temp != null){
            if(temp.value === value){
               return counter; 
            }
            counter += 1;
            temp = temp.nextNode;
        }

        return null;
    }

    toString(){
        let temp = this.head;
        let content = "";

        while(temp != null){
            content += `( ${temp.value} ) -> `;
            temp = temp.nextNode;
        }
       
        content += "null";
        return content;
    }

    insertAt(value, index){
        if(index < 0) return null;

        if(index == 0){
            this.prepend(value);
            return;
        }

        let previous = null;
        let current = this.head;
        let counter = 0;

        while(current != null && counter < index){
            previous = current;
            current = current.nextNode;
            counter += 1;
        }

        if(counter === index){
            previous.nextNode = new Node(value, current)
            this.length += 1;
            return;
        }
    }

    removeAt(index){
        if (this.head == null) throw new Error("Cannot delete from an empty list");

        if (index === 0) {
        this.head = this.head.nextNode;
        this.length -= 1;
        return;
        }

        let current = this.head;
        let previous = null;
        let counter = 0;

        while (current != null && counter < index){
            previous = current;
            current = current.nextNode;
            counter += 1;
        }

        if(current == null) throw new Error("cannot delete empty list");

        if(counter == index){
            previous.nextNode = current.nextNode;
            this.length -= 1;
            return;
        }
    }
}

class Node {
    constructor(value = null, nextNode = null){
        this.value = value;
        this.nextNode = nextNode;
    }
}

export default LinkedList;