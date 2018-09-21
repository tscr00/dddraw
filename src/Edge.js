import React from "react";

const Edge = ({ edgeContainer }) => {
  // if (!edgeContainer.points) {
  //   return null;
  // }
  //
  // const margin = 32;
  //
  // let points = edgeContainer.points;
  //
  // let leftX = Math.min(...points.map(point => point.x));
  // let topY = Math.min(...points.map(point => point.y));
  //
  // let style = {
  //   position: 'absolute',
  //   top: topY - margin,
  //   left: leftX - margin,
  // };
  //
  // let svgPoints = points.map(coord => `${coord.x - leftX + margin},${coord.y - topY + margin}`).join(' ');

  return null;

  // temporarily comment out
  // return (
  //   <div style={style} >
  //     <svg>
  //       <defs>
  //         <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="7"
  //                 markerHeight="7" orient="auto" >
  //           <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="#555555" />
  //         </marker>
  //       </defs>
  //       <polyline points={svgPoints} fill="none" stroke="#555555"
  //                 strokeWidth={2} markerEnd='url(#arrow)' />
  //     </svg>
  //   </div>
  // );
};

export default Edge;
