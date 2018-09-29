import { Record, Map } from "immutable";
import BinaryHeap from "./heap";

const DIR = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};
const GridPoint = Record({ i: 0, j: 0 });
const PathPoint = Record({ i: 0, j: 0, dir: DIR.UP });

/**
 * Recalculates edge routes between nodes without intersection.
 */
export default function rerouteEdges(nodes, edges, gridStep) {
  const toCoords = value => Math.ceil(value / gridStep);

  const nodeCenter = node => [
    Math.round((node.y + node.height * 0.5) / gridStep),
    Math.round((node.x + node.width * 0.5) / gridStep)
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

  // accumulate paths for every edge (if reachable)
  let paths = Map();

  edges.forEach((edge, name, _) => {
    let nodeFrom = nodes.get(edge.from);
    let nodeTo = nodes.get(edge.to);

    // temporarily mark cells as unoccupied because it's faster than deep copying the entire grid
    fillNodeShape(grid, gridStep, nodeFrom, false);
    fillNodeShape(grid, gridStep, nodeTo, false);

    let start = nodeCenter(nodeFrom);
    let target = nodeCenter(nodeTo);

    let path = findPath(start, target, grid);

    paths = paths.set(name, path);

    // after processing return the cells to their original value
    fillNodeShape(grid, gridStep, nodeFrom, true);
    fillNodeShape(grid, gridStep, nodeTo, true);
  });

  return paths;
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

  while (parent.has(node) && parent.get(node)) {
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
  // let visitGrid = createGrid(gridDim[1], gridDim[0], Infinity);
  let nodeQueue = new BinaryHeap((node1, node2) => node1[0] < node2[0]);
  let parent = Map();

  nodeQueue.push([0, 0, PathPoint({i: start[0], j: start[1], dir: null})], null);

  while (!nodeQueue.empty()) {
    let [estimate, cost, link, parentLink] = nodeQueue.pop();

    if (parent.has(link)) {
      continue
    } else {
      parent = parent.set(link, parentLink);
    }

    if (targetPoint.i === link.i && targetPoint.j === link.j) {
      return rebuildPath(link, parent);
    }

    const neighbors = [
      [link.i - 1, link.j, DIR.LEFT],
      [link.i + 1, link.j, DIR.RIGHT],
      [link.i, link.j - 1, DIR.UP],
      [link.i, link.j + 1, DIR.DOWN],
    ];

    for (let neighbor of neighbors) {
      const [i, j, dir] = neighbor;
      const neighborNode = PathPoint({ i, j, dir });

      const outOfGrid = i < 0 || i >= gridDim[0] || j < 0 || j >= gridDim[1];

      if (outOfGrid || grid[i][j]) {
        continue;
      }

      let neighborCost = cost + 1;

      // add penalty for turns
      // const parentNode = parent.get(node, neighborNode);
      neighborCost += parentLink && link.dir !== dir ? 1 : 0;

      let neighborEstimate =
        neighborCost +
        Math.abs(targetPoint.i - i) +
        Math.abs(targetPoint.j - j);

      nodeQueue.push([neighborEstimate, neighborCost, neighborNode, link]);
    }
  }

  return [];
}
