import { Record, Map } from "immutable";
import FastPriorityQueue from "fastpriorityqueue";

const GridPoint = Record({ i: 0, j: 0 });

/**
 * Updates (x, y) coordinates for nodes and edges in-place.
 */
export default function updateLayout(nodes, edges, gridStep) {
  const toCoords = value => Math.ceil(value / gridStep);

  const nodeCenter = node => [
    toCoords(node.x + node.width * 0.5),
    toCoords(node.y + node.height * 0.5)
  ];

  let maxX = Math.max(
    ...Array.from(nodes.values()).map(node => node.x + node.width)
  );
  let maxY = Math.max(
    ...Array.from(nodes.values()).map(node => node.y + node.height)
  );

  // pad with additional two cells to allow routes to path on the outside of the nodes
  let gridSize = [toCoords(maxX) + 1, toCoords(maxY) + 1];
  let grid = createGrid(...gridSize, false);

  // mark cells as occupied for every node
  nodes.forEach((node, _, m) => fillNodeShape(grid, gridStep, node, true));

  edges.forEach(edge => {
    let nodeFrom = nodes.get(edge.from);
    let nodeTo = nodes.get(edge.to);

    // temporarily mark cells as unoccupied because it's faster than deep copying the entire grid
    fillNodeShape(grid, gridStep, nodeFrom, false);
    fillNodeShape(grid, gridStep, nodeTo, false);

    let start = nodeCenter(nodeFrom);
    let target = nodeCenter(nodeTo);

    let path = findPath(start, target, grid);
    console.log(path);

    // after processing return the cells to their original value
    fillNodeShape(grid, gridStep, nodeFrom, true);
    fillNodeShape(grid, gridStep, nodeTo, true);
  });
}

/**
 * Returns a 2D matrix of size width X height filled with the provided value.
 */
function createGrid(width, height, value) {
  return new Array(height).fill(null).map(_ => new Array(width).fill(value));
}

/**
 * Fills cells occupied by the node with the provided value.
 */
function fillNodeShape(grid, gridStep, node, value) {
  let yGridMin = Math.ceil(node.y / gridStep);
  let yGridMax = Math.ceil((node.y + node.height) / gridStep);
  let xGridMin = Math.ceil(node.x / gridStep);
  let xGridMax = Math.ceil((node.x + node.width) / gridStep);

  for (let i = yGridMin; i <= yGridMax; i++) {
    for (let j = xGridMin; j <= xGridMax; j++) {
      grid[i][j] = value;
    }
  }
}

function rebuildPath(start, parent) {
  let node = start;
  let path = [[start.i, start.j]];

  while (parent.has(node)) {
    node = parent.get(node);
    path.push([node.i, node.j]);
  }

  path.reverse();

  return path;
}

/**
 * Returns array of points representing optimal path from start to target
 * according to the defined metric.
 */
function findPath(start, target, grid) {
  if (grid.length === 0) {
    throw new Error("grid cannot be empty");
  }

  const startPoint = GridPoint({ i: start[0], j: start[1] });
  const targetPoint = GridPoint({ i: target[0], j: target[1] });

  let gridDim = [grid.length, grid[0].length];
  let visitGrid = createGrid(...gridDim, false);
  let nodeQueue = new FastPriorityQueue((node1, node2) => node1[0] < node2[0]);
  let parent = Map();

  nodeQueue.add([0, 0, startPoint]);

  while (!nodeQueue.isEmpty()) {
    let [estimate, cost, node] = nodeQueue.poll();

    //console.log(estimate, cost, node);

    if (visitGrid[node.i][node.j]) {
      continue;
    }
    visitGrid[node.i][node.j] = true;

    if (targetPoint.equals(node)) {
      return rebuildPath(targetPoint, parent);
    }

    const neighbors = [
      [node.i - 1, node.j],
      [node.i + 1, node.j],
      [node.i, node.j - 1],
      [node.i, node.j + 1]
    ];

    for (let neighbor of neighbors) {
      const [i, j] = neighbor;
      const neighborNode = GridPoint({ i, j });

      const outOfGrid = i < 0 || i >= gridDim[0] || j < 0 || j >= gridDim[1];

      if (outOfGrid || visitGrid[i][j] || grid[i][j]) {
        continue;
      }

      parent = parent.set(neighborNode, node);

      let neighborCost = cost + 1;
      let neighborEstimate = Math.abs(targetPoint.i - i) + Math.abs(targetPoint.j - j);

      // add penalty for turns
      const parentNode = parent.get(node, neighborNode);

      neighborCost += parentNode.i !== i && parentNode.j !== j ? 1 : 0;

      nodeQueue.add([neighborEstimate, neighborCost, neighborNode]);
    }
  }

  return [];
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
