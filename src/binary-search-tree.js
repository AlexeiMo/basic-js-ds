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
    if(!this.rootNode) {
      this.rootNode = new Node(data);
      this.currentNode = this.rootNode;
      return;
    }

    if(data > this.currentNode.data) {
      if(!this.currentNode.right) {
        this.currentNode.right = new Node(data);
        this.currentNode = this.rootNode;
        return;
      } else {
        this.currentNode = this.currentNode.right;
        this.add(data);
      }
    } else {
      if(!this.currentNode.left) {
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
    if(!this.rootNode) {
      return null;
    }

    let result;

    if(this.currentNode.data === data) {
      result = this.currentNode;
      this.currentNode = this.rootNode;
    } else {
      if(data > this.currentNode.data) {
        if(!this.currentNode.right) {
          this.currentNode = this.rootNode;
          result = null;
        } else {
          this.currentNode = this.currentNode.right;
          result = this.find(data);
        }
      } else {
        if(!this.currentNode.left) {
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
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  min() {
    if(!this.rootNode) {
      return null;
    }

    let minNode;

    if(!this.currentNode.left) {
      minNode = this.currentNode;
      this.currentNode = this.rootNode;
    } else {
      this.currentNode = this.currentNode.left;
      minNode = this.min();
    }

    return minNode;
  }

  max() {
    if(!this.rootNode) {
      return null;
    }

    let maxNode;

    if(!this.currentNode.right) {
      maxNode = this.currentNode;
      this.currentNode = this.rootNode;
    } else {
      this.currentNode = this.currentNode.right;
      maxNode = this.max();
    }

    return maxNode;
  }
}

module.exports = {
  BinarySearchTree
};