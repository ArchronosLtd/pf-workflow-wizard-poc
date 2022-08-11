import React from "react";
import { useNodes } from "react-flow-renderer";

import './aside.scss';

export interface ISidebarProps {
  addNode: (type: string) => void;
}

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const nodes = useNodes();

  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onClick={() => {
          props.addNode("input");
        }}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        onClick={() => {
          props.addNode("default");
        }}
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        onClick={() => {
          props.addNode("output");
        }}
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>

      <hr />

      <div>
        You currently have {nodes.length} states.
      </div>
    </aside>
  );
};
export default Sidebar;