import LinkedList from "./LinkedList.js";

class HashMap {
    constructor(load = 0.8, capacity = 17){
        this.buckets = Array(capacity).fill(new LinkedList())
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