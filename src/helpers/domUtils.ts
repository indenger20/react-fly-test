export const findParent = (node: any, className: string): any => {
  if (!node.parentNode) return null;
  if (!node.parentNode.classList) return null;
  if (node.parentNode.classList.contains(className)) return node.parentNode;
  return findParent(node.parentNode, className);
};
