import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Node,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection
} from "react-flow-renderer";

import getId from './utils/IdGenerator';
import nodeSort from './utils/NodeSort';

import Sidebar from "./components/Sidebar";

import './App.scss';

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 0, y: 0 }
  }
];

const WorkflowBuilder = () => {
  // TODO: find out typing for these items
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNodes = (newNode: Node) => {
    setNodes((nds) => nds.concat(newNode));
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowInstance && !reactFlowWrapper) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` }
      };

      updateNodes(newNode);
    },
    [reactFlowInstance, setNodes, reactFlowWrapper]
  );

  const addNode = (type: string) => {
    const sortedNodes = nodeSort(nodes);

    const bottomMost = sortedNodes[0];

    updateNodes({
      id: getId(),
      type,
      position: {
        x: bottomMost.position.x,
        y: bottomMost.position.y + (bottomMost?.height ?? 50) + 20
      },
      data: {
        label: `${type} [TODO: a way of adding a state title]`
      }
    });
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar addNode={addNode} />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowBuilder;