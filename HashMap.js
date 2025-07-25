import LinkedList from "./LinkedList.js";

class HashMap {
    constructor(load = 0.8, capacity = 17){
        this.buckets = Array.from({ length: capacity }, () => new LinkedList());
        this.load_factor = load;
        this.capacity = capacity;
        this.numberOfBuckets = 0;
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 

    set(key, value){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let current = bucket.head;
        while (current) {
            if (current.value.key === key){
                current.value.value = value;
                return;
            }
            current = current.nextNode;
        }

        bucket.append({key, value});
        if(bucket.size() === 1){
            this.numberOfBuckets += 1;
        }

        if(this.numberOfBuckets / this.capacity >= this.load_factor){
            this.resize();
        }

        return;
    }

    get(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let current = bucket.head;
        while (current) {
            if (current.value.key === key){
                return current.value.value;
            }
            current = current.nextNode;
        }

        return null;
    }

    has(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let current = bucket.head;
        while (current) {
            if (current.value.key === key){
                return true;
            }
            current = current.nextNode;
        }

        return false;
    }

    remove(key){
        const index = this.hash(key);
        const bucket = this.buckets[index];

        let current = bucket.head;
        let counter = 0;
        while (current) {
            if (current.value.key === key){
                bucket.removeAt(counter);
                if(bucket.size() === 0){
                    this.numberOfBuckets -= 1;
                }
                return true;
            }
            current = current.nextNode;
            counter += 1;
        }

        return false;
    }

    length(){
        let numberOfStoredKeys = 0;
        for(let i = 0; i < this.capacity - 1; i++){
            let bucket = this.buckets[i];

            numberOfStoredKeys += bucket.size();
        }

        return numberOfStoredKeys;
    }

    clear(){
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
    }

    keys(){
        let keysArray = [];
        for(let i = 0; i < this.capacity - 1; i++){
            let bucket = this.buckets[i];

            let current = bucket.head;
            while(current) {
                keysArray.push(current.value.key);
                current = current.nextNode;
            }
        }

        return keysArray;
    }

    values(){
        let valuesArray = [];
        for(let i = 0; i < this.capacity - 1; i++){
            let bucket = this.buckets[i];

            let current = bucket.head;
            while(current) {
                valuesArray.push(current.value.value);
                current = current.nextNode;
            }
        }

        return valuesArray;
    }

    entries(){
        let entriesArray = [];
        for(let i = 0; i < this.capacity - 1; i++){
            let bucket = this.buckets[i];

            let current = bucket.head;
            while(current) {
                entriesArray.push([current.value.key, current.value.value]);
                current = current.nextNode;
            }
        }

        return entriesArray;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity = this.capacity * 2;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
        this.size = 0; 

        for (const bucket of oldBuckets) {
            let current = bucket.head;
            while (current) {
                const { key, value } = current.value;
                this.set(key, value); 
                current = current.nextNode;
            }
        }
    }
};

export default HashMap;