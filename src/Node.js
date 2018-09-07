import React from 'react';

const Node = ({nodeContainer}) => {
  let style = {
    left: nodeContainer.x,
    top: nodeContainer.y,
    position: 'absolute',
    width: nodeContainer.width,
    height: nodeContainer.height,
    backgroundColor: "#555555"
  };

  return (
    <div style={style}>
      <p>{nodeContainer.label}</p>
    </div>
  );
};

export default Node;
