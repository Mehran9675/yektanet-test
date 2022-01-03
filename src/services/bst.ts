import { Entry } from "@/common/types";

type Data = string | number;

class BTSNode {
  constructor(data: Data, entry: Entry) {
    this.data = data;
    this.entry = entry;
    this.left = null;
    this.right = null;
  }
  data: string | number;
  left: BTSNode | null;
  right: BTSNode | null;
  entry: Entry | null;
}

export default class BST {
  constructor() {
    this.root = null;
    this.inOrder = [];
  }

  private root: BTSNode | null;
  private inOrder: Data[];

  async insert(data: Data, entry: Entry) {
    const newNode = new BTSNode(data, entry);
    if (!this.root) return (this.root = newNode);
    else return this.insertNode(this.root, newNode);
  }

  search(node: BTSNode | null, data: Data): BTSNode | null {
    if (!node) return null;
    if (node.data === data) return node;
    if (data < node.data) return this.search(node.left, data);
    if (data > node.data) return this.search(node.right, data);
    return node;
  }
  getOrderedItems() {
    if (!this.root) return null;
    this.inorder(this.root);
    return this.inOrder;
  }

  private insertNode(node: BTSNode, newNode: BTSNode) {
    if (newNode.data < node.data) {
      if (node.left) this.insertNode(node.left, newNode);
      else node.left = newNode;
    } else {
      if (node.right) this.insertNode(node.right, newNode);
      else node.right = newNode;
    }
  }

  private inorder(node: BTSNode | null) {
    if (node !== null) {
      this.inorder(node.left);
      this.inOrder.push(node.data);
      this.inorder(node.right);
    }
  }
}
