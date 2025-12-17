import React from 'react';
import { BaseNode } from './BaseNode';

export const createNodeComponent = (config) => {
  const NodeComponent = ({ id, data, ...rest }) => {
    return <BaseNode id={id} data={data} config={config} {...rest} />;
  };
  return NodeComponent;
};
