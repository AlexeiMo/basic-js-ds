const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(value = null) {
    this.rootNode = value ? new Node(value) : null;
    this.currentNode = this.rootNode;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if(this.isEmpty(this.rootNode)) {
      this.rootNode = new Node(data);
      this.currentNode = this.rootNode;
      return;
    }

    if(data > this.currentNode.data) {
      if(this.isEmpty(this.currentNode.right)) {
        this.currentNode.right = new Node(data);
        this.currentNode = this.rootNode;
        return;
      } else {
        this.currentNode = this.currentNode.right;
        this.add(data);
      }
    } else {
      if(this.isEmpty(this.currentNode.left)) {
        this.currentNode.left = new Node(data);
        this.currentNode = this.rootNode;
        return;
      } else {
        this.currentNode = this.currentNode.left;
        this.add(data);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    if(this.isEmpty(this.rootNode)) {
      return null;
    }

    let result;

    if(this.currentNode.data === data) {
      result = this.currentNode;
      this.currentNode = this.rootNode;
    } else {
      if(data > this.currentNode.data) {
        if(this.isEmpty(this.currentNode.right)) {
          this.currentNode = this.rootNode;
          result = null;
        } else {
          this.currentNode = this.currentNode.right;
          result = this.find(data);
        }
      } else {
        if(this.isEmpty(this.currentNode.left)) {
          this.currentNode = this.rootNode;
          result = null;
        } else {
          this.currentNode = this.currentNode.left;
          result = this.find(data);
        }
      }
    }

    return result;
  }

  remove(data) {
    if(!this.rootNode) return;

    let nodeToDelete = this.find(data);

    if(!nodeToDelete) return;
    
    if(this.isEmpty(nodeToDelete.left) && this.isEmpty(nodeToDelete.right)) {
      this.deleteNode(nodeToDelete);
      return;
    } 
    
    let replacementNode;

    if(this.isEmpty(nodeToDelete.left)) {
      replacementNode = nodeToDelete;
      nodeToDelete = nodeToDelete.right;

      replacementNode.data = replacementNode.right.data;
      replacementNode.left = replacementNode.right.left;
      replacementNode.right = replacementNode.right.right;

      this.deleteNode(nodeToDelete);
    } else if(this.isEmpty(nodeToDelete.right)) {
      replacementNode = nodeToDelete;
      nodeToDelete = nodeToDelete.left;

      replacementNode.data = replacementNode.left.data;
      replacementNode.left = replacementNode.left.left;
      replacementNode.right = replacementNode.left.right;

      this.deleteNode(nodeToDelete);
    } else {
      replacementNode = nodeToDelete;

      this.currentNode = nodeToDelete.left;
      let valueToReplace = this.max();

      this.currentNode = nodeToDelete.left;
      nodeToDelete = this.find(valueToReplace);

      this.currentNode = this.rootNode;

      replacementNode.data = nodeToDelete.data;

      if(!this.isEmpty(nodeToDelete.left)) {
        nodeToDelete.data = nodeToDelete.left.data;
        nodeToDelete.left = nodeToDelete.left.left;
        nodeToDelete.right = nodeToDelete.left.right;
      } else {
        this.deleteNode(nodeToDelete);
      }

    }
  }

  min() {
    if(this.isEmpty(this.rootNode)) {
      return null;
    }

    let result;

    if(this.isEmpty(this.currentNode.left)) {
      result = this.currentNode.data;
      this.currentNode = this.rootNode;
    } else {
      this.currentNode = this.currentNode.left;
      result = this.min();
    }

    return result;
  }

  max() {
    if(this.isEmpty(this.rootNode)) {
      return null;
    }

    let result;

    if(this.isEmpty(this.currentNode.right)) {
      result = this.currentNode.data;
      this.currentNode = this.rootNode;
    } else {
      this.currentNode = this.currentNode.right;
      result = this.max();
    }

    return result;
  }

  isEmpty(node) {
    return node == null || node.data == undefined;
  }

  deleteNode(node) {
    Object.keys(node).forEach(key => delete node[key]);
  }
}

module.exports = {
  BinarySearchTree
};