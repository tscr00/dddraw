
/**
 * Updates (x, y) coordinates for nodes and edges in-place.
 */
export default function updateLayout(nodes, edges, linkMargin) {
  
}

class Rect {
  constructor(left, top, bottom, right) {
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

// export default function updateLayout(nodes, edges) {
//   let layoutSettings = {
//     ranker: 'tight-tree',
//   };
//
//   let g = new dagre.graphlib.Graph();
//
//   g.setGraph({});
//
//   g.setDefaultEdgeLabel(function() { return {}; });
//
//   nodes.forEach(node =>
//     g.setNode(node.name, {
//       label: node.label,
//       width: node.width,
//       height: node.height
//     })
//   );
//
//   edges.forEach(edge =>
//     g.setEdge(edge.from, edge.to)
//   );
//
//   dagre.layout(g, layoutSettings);
//
//   nodes.forEach(node => {
//     let graphNode = g.node(node.name);
//
//     node.x = graphNode.x;
//     node.y = graphNode.y;
//   });
//
//   edges.forEach(edge => {
//     let graphEdge = g.edge({v: edge.from, w: edge.to});
//     edge.points = graphEdge.points;
//   });
// }
