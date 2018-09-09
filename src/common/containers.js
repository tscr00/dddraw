
export class NodeContainer {
  constructor(name, icon, label, x, y, width, height) {
    this.name = name;
    this.icon = icon;
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class EdgeContainer {
  constructor(from, to, label, points) {
    this.from = from;
    this.to = to;
    this.label = label;
    this.points = points;
  }
}

export class Scene {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }
}
