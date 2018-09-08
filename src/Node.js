import React from 'react';

const Node = ({nodeContainer}) => {
  let style = {
    left: nodeContainer.x,
    top: nodeContainer.y,
    position: 'absolute',
    width: nodeContainer.width,
    height: nodeContainer.height,
    backgroundColor: "#36A3FC",
    boxShadow: '0 4px 3px rgba(62, 162, 244, .1)',
    borderRadius: '6px',
    color: '#FFFFFF',
    fontSize: 'large',
  };

  return (
    <div style={style}>
      <p>{nodeContainer.label}</p>
    </div>
  );
};

export default Node;
