var trie = require("trie-map");

var root = trie.createNode();

trie.setValue(root, "key1", "Hello World");
trie.setValue(root, "key2", "Hello Universe");
trie.setValue(root, "key3", "Hello Earth");

console.log("the value for 'key2' is", trie.getValue(root, "key2"));
