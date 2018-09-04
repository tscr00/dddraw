
class NodeContainer {
  constructor(name, icon, label, x, y) {
    this.name = name;
    this.icon = icon;
    this.label = label;
    this.x = x;
    this.y = y;
  }
}

class EdgeContainer {
  constructor(from, to, label, x, y) {
    this.from = from;
    this.to = to;
    this.label = label;
    this.x = x;
    this.y = y;
  }
}
