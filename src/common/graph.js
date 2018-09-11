let dagre = require("dagre");

/**
 * Updates (x, y) coordinates for nodes and edges in-place.
 */
export default function updateLayout(nodes, edges) {
  let layoutSettings = {
    ranker: 'tight-tree',
  };

  let g = new dagre.graphlib.Graph();

  g.setGraph({});

  g.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(node =>
    g.setNode(node.name, {
      label: node.label,
      width: node.width,
      height: node.height
    })
  );

  edges.forEach(edge =>
    g.setEdge(edge.from, edge.to)
  );

  dagre.layout(g, layoutSettings);

  nodes.forEach(node => {
    let graphNode = g.node(node.name);

    node.x = graphNode.x;
    node.y = graphNode.y;
  });

  edges.forEach(edge => {
    let graphEdge = g.edge({v: edge.from, w: edge.to});
    edge.points = graphEdge.points;
  });
}
