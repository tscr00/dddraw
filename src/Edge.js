import React from "react";

const Edge = ({ gridStep, paths }) => {
  const halfStep = Math.round(gridStep / 2);

  let style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  };

  const svgPaths = Array.from(paths.values()).map(points => {
    points = points.map(_ => {
      const [i, j] = _;
      return [j * gridStep + halfStep, i * gridStep + halfStep];
    });

    return (
      <polyline
        points={points}
        fill="none"
        stroke="#555555"
        strokeWidth={2}
        markerEnd="url(#arrow)"
      />
    );
  });

  return (
    <div>
      <svg style={style}>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="#555555" />
          </marker>
        </defs>
        {svgPaths}
      </svg>
    </div>
  );
};

export default Edge;
