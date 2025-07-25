import HashSet from "./HashSet.js";
import assert from "assert";

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
    } catch (err) {
        console.error(`❌ ${name}`);
        console.error(err);
    }
}

test("set adds a new key", () => {
    const set = new HashSet();
    set.set("apple");
    assert.strictEqual(set.has("apple"), true);
});

test("has returns false for absent key", () => {
    const set = new HashSet();
    assert.strictEqual(set.has("banana"), false);
});

test("set ignores duplicates", () => {
    const set = new HashSet();
    set.set("a");
    set.set("a");
    assert.strictEqual(set.length(), 1);
});

test("remove deletes a key", () => {
    const set = new HashSet();
    set.set("x");
    assert.strictEqual(set.remove("x"), true);
    assert.strictEqual(set.has("x"), false);
});

test("remove returns false for nonexistent key", () => {
    const set = new HashSet();
    assert.strictEqual(set.remove("ghost"), false);
});

test("length returns number of keys", () => {
    const set = new HashSet();
    set.set("one");
    set.set("two");
    set.set("three");
    assert.strictEqual(set.length(), 3);
});

test("clear empties the set", () => {
    const set = new HashSet();
    set.set("a");
    set.set("b");
    set.clear();
    assert.strictEqual(set.length(), 0);
    assert.strictEqual(set.has("a"), false);
});

test("keys returns all keys", () => {
    const set = new HashSet();
    set.set("alpha");
    set.set("beta");
    const keys = set.keys();
    assert.deepStrictEqual(keys.sort(), ["alpha", "beta"].sort());
});

test("resizes when load factor is exceeded", () => {
    const set = new HashSet(0.5, 2);
    set.set("k1");
    set.set("k2"); // triggers resize
    set.set("k3");
    assert.strictEqual(set.has("k1"), true);
    assert.strictEqual(set.has("k2"), true);
    assert.strictEqual(set.has("k3"), true);
    assert.strictEqual(set.length(), 3);
});

test("handles hash collisions via chaining", () => {
    const set = new HashSet(0.8, 2);
    set.set("ab"); // "ab" and "ba" often collide
    set.set("ba");
    assert.strictEqual(set.has("ab"), true);
    assert.strictEqual(set.has("ba"), true);
    assert.strictEqual(set.length(), 2);
});
