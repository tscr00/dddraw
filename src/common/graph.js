let dagre = require("dagre");

/**
 * Updates (x, y) coordinates for nodes and edges in-place.
 */
export default function updateLayout(nodes, edges) {
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

  dagre.layout(g);

  nodes.forEach(node => {
    console.log(node.name);
    console.log(g.node(node.name));
    let graphNode = g.node(node.name);

    node.x = graphNode.x;
    node.y = graphNode.y;
  });
}
