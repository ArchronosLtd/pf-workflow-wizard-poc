import React, { ChangeEvent, useEffect, useState } from 'react';
import { Node, useNodes, useReactFlow } from 'react-flow-renderer';

import './node-editor.scss';

interface INodeEditorProps {
  node: Node;
}

const NodeEditor: React.FC<INodeEditorProps> = ({ node }) => {
  const nodes = useNodes();
  const selectedNode = node;
  const [nodeName, setNodeName] = useState<string>(selectedNode.data.label);
  const { addEdges, getEdges, setEdges, setNodes } = useReactFlow();

  useEffect(() => {
    setNodeName(node.data.label);
  }, [node]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  if (!node) {
    return null;
  }

  const addEdge = (id: string) => {
    if (!selectedNode) {
      return;
    }

    addEdges({
      id: `edge-${selectedNode.id}-${id}`,
      source: selectedNode.id,
      target: id,
    });
  };

  const removeEdge = (id: string) => {
    const edges = getEdges();

    setEdges(edges.filter((edges) => {
      return edges.id !== `edge-${selectedNode.id}-${id}`;
    }));
  };

  const toggleEdge = (node: Node, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addEdge(node.id);
    } else {
      removeEdge(node.id);
    }
  };

  return (
    <div className="node-editor">
      <div>
        <label>Name:</label>
        <input value={nodeName} onChange={(e) => setNodeName(e.target.value)} />
      </div>

      <div>
        <label>id:</label>
        <input value={node.id} readOnly />
      </div>

      {selectedNode.type !== 'output' && <div>
        <label>Allowed next states:</label>
        {nodes.filter((n) => {
          return n.id !== node.id && n.type !== 'input'
        }).map((node: Node) => {
          const edges = getEdges();
          const edgeExists = edges.find((edge) => {
            return edge.source === selectedNode.id && edge.target === node.id;
          });

          return <div key={node.id}>
            <input checked={!!edgeExists} type="checkbox" onChange={toggleEdge.bind(null, node)} />
            {node.data.label}
          </div>
        })}
      </div>}
    </div>
  );
};

export default NodeEditor;