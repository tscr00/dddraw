import React from 'react';

const Node = ({nodeContainer}) => {
  let style = {
    left: nodeContainer.x - nodeContainer.width / 2,
    top: nodeContainer.y - nodeContainer.height / 2,
    position: 'absolute',
    width: nodeContainer.width,
    height: nodeContainer.height,
    //padding: "0 6px",
    backgroundColor: "#FFFFFF",
    boxShadow: '0 4px 8px rgba(47, 135, 243, 0.1)',

    borderRadius: '2px',

    borderBottomColor: 'rgb(47, 135, 243, 0.1)',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderTopColor: 'rgb(47, 135, 243, 0.1)',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderLeftColor: 'rgb(47, 135, 243, 0.1)',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderRightColor: 'rgb(47, 135, 243, 0.1)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',

    color: 'rgb(47, 135, 243)',
    fontSize: '14px',
  };

  return (
    <div style={style}>
      <p>{nodeContainer.label}</p>
    </div>
  );
};

export default Node;
