import LinkedList from './LinkedList.js';
import HashMap from './HashMap.js';
import assert from 'assert';

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
    } catch (err) {
        console.error(`❌ ${name}`);
        console.error(err);
    }
}

test("set and get a value", () => {
    const map = new HashMap();
    map.set("key1", "value1");
    assert.strictEqual(map.get("key1"), "value1");
});

test("get returns null for nonexistent key", () => {
    const map = new HashMap();
    assert.strictEqual(map.get("nope"), null);
});

test("has returns correct boolean", () => {
    const map = new HashMap();
    map.set("exists", 42);
    assert.strictEqual(map.has("exists"), true);
    assert.strictEqual(map.has("missing"), false);
});

test("overwrite existing key", () => {
    const map = new HashMap();
    map.set("key", "value1");
    map.set("key", "value2");
    assert.strictEqual(map.get("key"), "value2");
});

test("remove deletes key and returns true", () => {
    const map = new HashMap();
    map.set("toRemove", "yes");
    assert.strictEqual(map.remove("toRemove"), true);
    assert.strictEqual(map.has("toRemove"), false);
});

test("remove returns false for nonexistent key", () => {
    const map = new HashMap();
    assert.strictEqual(map.remove("ghost"), false);
});

test("length counts correct number of entries", () => {
    const map = new HashMap();
    map.set("a", 1);
    map.set("b", 2);
    map.set("c", 3);
    assert.strictEqual(map.length(), 3);
});

test("clear empties the map", () => {
    const map = new HashMap();
    map.set("one", 1);
    map.set("two", 2);
    map.clear();
    assert.strictEqual(map.length(), 0);
    assert.strictEqual(map.get("one"), null);
});

test("keys returns all keys", () => {
    const map = new HashMap();
    map.set("apple", 10);
    map.set("banana", 20);
    const keys = map.keys();
    assert.deepStrictEqual(keys.sort(), ["apple", "banana"].sort());
});

test("values returns all values", () => {
    const map = new HashMap();
    map.set("x", "foo");
    map.set("y", "bar");
    const values = map.values();
    assert.deepStrictEqual(values.sort(), ["foo", "bar"].sort());
});

test("entries returns all key-value pairs", () => {
    const map = new HashMap();
    map.set("id", 123);
    map.set("name", "Alice");
    const entries = map.entries();
    const expected = [["id", 123], ["name", "Alice"]];
    assert.deepStrictEqual(entries.sort(), expected.sort());
});

test("handles hash collisions via chaining", () => {
    const map = new HashMap(0.8, 2); // small capacity to force collision
    map.set("ab", 1);
    map.set("ba", 2); // many hash algorithms hash these to same bucket
    assert.strictEqual(map.get("ab"), 1);
    assert.strictEqual(map.get("ba"), 2);
});

test("triggers resize when load factor exceeded", () => {
    const map = new HashMap(0.5, 2); // force resize quickly
    map.set("a", 1);
    map.set("b", 2); // should trigger resize
    map.set("c", 3);
    assert.strictEqual(map.get("a"), 1);
    assert.strictEqual(map.get("b"), 2);
    assert.strictEqual(map.get("c"), 3);
});

test("keys/values/entries respect resized map", () => {
    const map = new HashMap(0.5, 2);
    map.set("foo", 100);
    map.set("bar", 200);
    map.set("baz", 300); // triggers resize
    assert.strictEqual(map.keys().length, 3);
    assert.strictEqual(map.values().length, 3);
    assert.strictEqual(map.entries().length, 3);
});

test("stress test with 1000 entries", () => {
    const map = new HashMap();
    for (let i = 0; i < 1000; i++) {
        map.set(`key${i}`, i);
    }
    for (let i = 0; i < 1000; i++) {
        assert.strictEqual(map.get(`key${i}`), i);
    }
    assert.strictEqual(map.length(), 1000);
});
