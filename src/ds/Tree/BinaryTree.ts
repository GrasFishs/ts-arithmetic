import { LinkedStack } from "../List/Stack/LinkedStack";


export class TreeNode<T> {
  public value: T;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  addLeft(value: T) {
    this.left = new TreeNode(value);
  }

  addRight(value: T) {
    this.right = new TreeNode(value);
  }
}

export class BinaryTree<T> {
  public root: TreeNode<T>;

  public constructor(value: T) {
    this.root = new TreeNode(value);
  }

  private travers(
    type: 'pre' | 'in' | 'post',
    node: TreeNode<T> | null,
    visit: (v: T) => void
  ) {
    function t(node: TreeNode<T> | null) {
      if (node) {
        switch (type) {
          case 'pre': {
            visit(node.value);
            t(node.left);
            t(node.right);
            break;
          }
          case 'in': {
            t(node.left);
            visit(node.value);
            t(node.right);
            break;
          }
          case 'post': {
            t(node.left);
            t(node.right);
            visit(node.value);
            break;
          }
        }
      }
      return null;
    }
    t(node);
  }

  public preOrderTravers(visit: (v: T) => void) {
    this.travers('pre', this.root, visit);
  }

  public preOrderTraversArray(): T[] {
    const arr: T[] = [];
    this.preOrderTravers(value => {
      arr.push(value);
    });
    return arr;
  }

  public inOrderTravers(visit: (v: T) => void) {
    this.travers('in', this.root, visit);
  }

  public inOrderTraversArray(): T[] {
    const arr: T[] = [];
    this.inOrderTravers(value => {
      arr.push(value);
    });
    return arr;
  }

  public postOrderTravers(visit: (v: T) => void) {
    this.travers('post', this.root, visit);
  }

  public postOrderTraversArray(): T[] {
    const arr: T[] = [];
    this.postOrderTravers(value => {
      arr.push(value);
    });
    return arr;
  }

  public preOrderTraversWithStack(visit: (v: T) => void) {
    let node = this.root;
    const stack = LinkedStack.from<TreeNode<T>>([node]);
    while (!stack.isEmpty()) {
      const nv = stack.pop()!;
      visit(nv.value);
      if (nv.right) stack.push(nv.right);
      if (nv.left) stack.push(nv.left);
    }
  }

  public preOrderTraversWithStackArray(): T[] {
    const arr: T[] = [];
    this.preOrderTraversWithStack(v => arr.push(v));
    return arr;
  }
}
