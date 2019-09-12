import { BinaryTree, TreeNode } from "../../src/ds/Tree/BinaryTree";


describe('BinaryTree test', () => {
  /**
   *          1
   *        /   \
   *       2     3
   *      / \   / \
   *     4  5  6   7
   */
  const tree = new BinaryTree<number>(1);
  tree.root.left = new TreeNode(2);
  tree.root.right = new TreeNode(3);
  tree.root.left.left = new TreeNode(4);
  tree.root.left.right = new TreeNode(5);
  tree.root.right.left = new TreeNode(6);
  tree.root.right.right = new TreeNode(7);

  const preArr = [1, 2, 4, 5, 3, 6, 7];
  const inArr = [4, 2, 5, 1, 6, 3, 7];
  const postArr = [4, 5, 2, 6, 7, 3, 1];

  test('pre order travers', () => {
    const arr = tree.preOrderTraversArray();
    expect(arr).toEqual(preArr);
  });

  test('in order travers', () => {
    const arr = tree.inOrderTraversArray();
    expect(arr).toEqual(inArr);
  });

  test('post order travers', () => {
    const arr = tree.postOrderTraversArray();
    expect(arr).toEqual(postArr);
  });

  test('pre order with stack', () => {
    const arr = tree.preOrderTraversWithStackArray();
    expect(arr).toEqual(preArr);
  });
});
