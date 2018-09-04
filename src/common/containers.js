
class NodeContainer {
  constructor(name, x, y, icon, label) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.icon = icon;
    this.label = label;
  }
}

class EdgeContainer {
  constructor(from, to, label) {
    this.from = from;
    this.to = to;
    this.label = label;
  }
}