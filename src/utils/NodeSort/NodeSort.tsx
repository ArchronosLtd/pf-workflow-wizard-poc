import { Node } from 'react-flow-renderer';

const NodeSort = (nodes: Node[]): Node[] => {
  const sortedNodes = nodes.sort((a, b) => {
    if (a.position.y > b.position.y) {
      return -1;
    }

    if (a.position.y > b.position.y) {
      return 1;
    }

    return 0;
  });

  return sortedNodes;
}

export default NodeSort;