import LinkedList from "./LinkedList.js";

class HashMap {
    constructor(load = 0.8, capacity = 17){
        this.buckets = Array.from({ length: capacity }, () => new LinkedList());
        this.load_factor = load;
        this.capacity = capacity;
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
            current = current.next;
        }

        bucket.append({key, value});
        return;
    }

    get(key){

    }

    has(key){

    }

    remove(key){

    }

    length(){

    }

    clear(){

    }

    keys(){

    }

    values(){

    }

    entries(){
        
    }
};