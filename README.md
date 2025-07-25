# hashMap

A JavaScript hash map activity from theodinproject. It showcases a HashMap class that has the following methods:

- **hash(key)**: Takes a key and produces a hash code with it. It uses a polynomial rolling hash with base 31 and modulo capacity.
- **set(key, value)**:  Takes two arguments: the first is a key, and the second is a value that is assigned to this key. It also features doubling the capacity of the hash map when it exceeds its load capacity. 
- **get(key)**: Takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
- **has(key)**: Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
- **remove(key)**: Takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
- **length()**: Returns the number of stored keys in the hash map.
- **clear()**: Removes all entries in the hash map.
- **keys()**: Returns an array containing all the keys inside the hash map.
- **values()**: Returns an array containing all the values.
- **entries()**: Returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

## hashSet

This repository also features a hash set which only stores keys instead of keys and values. Its methods are copied from the HashMap class, removing sections where value is included.