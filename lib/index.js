var NODE_VALUE_INDEX = 0;
var NODE_EDGES_INDEX = 1;
var EDGE_LABEL_INDEX = 0;
var EDGE_NODE_INDEX = 1;

function createNode() {
  return [null, []];
}

function createEdge(label) {
  return [label, createNode()];
}

function setNodeValue(node, value) {
  node[NODE_VALUE_INDEX] = value;
}

function addEdge(edge, node) {
  node[NODE_EDGES_INDEX].push(edge);
}

function getNodeValue(node) {
  return node[NODE_VALUE_INDEX];
}

function getNodeEdges(node) {
  return node[NODE_EDGES_INDEX];
}

function getLabel(edge) {
  return edge[EDGE_LABEL_INDEX];
}

function getNode(edge) {
  return edge[EDGE_NODE_INDEX];
}

function isEdgeHasLabel(edge, label) {
  return getLabel(edge) === label;
}

function getNodeWithEdge(label, node) {
  var edges = getNodeEdges(node),
      length = edges.length,
      result = null,
      i = 0;

  for (; i < length; i++) {
    if (isEdgeHasLabel(edges[i], label)) {
      result = getNode(edges[i]);
      break;
    }
  }

  return result;
}

function addEdgeWithLabelToNode(label, node) {
  var edge = createEdge(label);
  addEdge(edge, node);
  return edge;
}

function buildTrie(node, key) {
  var length = key.length,
      insertMode = false,
      findNode,
      edge,
      i;

  for (i = 0; i < length; i++) {
    if (!insertMode) {
      findNode = getNodeWithEdge(key[i], node);
    }

    if (findNode) {
      node = findNode;
    } else {
      insertMode = true;
      edge = addEdgeWithLabelToNode(key[i], node);
      node = getNode(edge);
    }
  }

  return node;
}

function setValue(root, key, value) {
  node = buildTrie(root, key);
  setNodeValue(node, value);
}

function getValue(node, key) {
  var length = key.length,
      findNode,
      i;

  for (i = 0; i < length; i++) {
    node = getNodeWithEdge(key[i], node);
    if (!node) {
      return false;
    }
  }

  return getNodeValue(node);
}

module.exports = {
  createNode: createNode,
  createEdge: createEdge,
  setNodeValue: setNodeValue,
  addEdge: addEdge,
  getNodeValue: getNodeValue,
  getNodeEdges: getNodeEdges,
  getLabel: getLabel,
  getNode: getNode,
  isEdgeHasLabel: isEdgeHasLabel,
  getNodeWithEdge: getNodeWithEdge,
  addEdgeWithLabelToNode: addEdgeWithLabelToNode,
  buildTrie: buildTrie,
  setValue: setValue,
  getValue: getValue
};
