import React from 'react';
import { useNodes } from 'react-flow-renderer';
import Pluralise from '../../utils/Pluralise';

import './node-summary.scss';

const NodeSummary: React.FC = () => {
  const nodes = useNodes();

  const input = nodes.filter((node) => node.type === 'input').length;
  const transition = nodes.filter((node) => node.type === 'default').length;
  const output = nodes.filter((node) => node.type === 'output').length;

  return (
    <div className="node-summary">
      <div>
        You currently have {nodes.length} {Pluralise(nodes.length, 'state')}.
      </div>

      <div>
        <span className="input"></span>
        You have {input} input {Pluralise(input, 'state')}
      </div>

      <div>
        <span className="default"></span>
        You have {transition} transition {Pluralise(transition, 'state')}
      </div>

      <div>
        <span className="output"></span>
        You have {output} final {Pluralise(output, 'state')}
      </div>
    </div>
  );
};

export default NodeSummary;