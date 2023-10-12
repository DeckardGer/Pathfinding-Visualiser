import { AlgorithmSpeed, TileType } from "../../types/settings";
import {
  clearPath,
  delay,
  findTileType,
  hopefullyLastPath,
  initialiseNodeGrid,
} from "../helpers";
import { MinHeap } from "../heap";
import { Node } from "../node_classes/aStarNode";

// Retrace the path from the end node to the start node
const retracePath = async (
  startNode: Node,
  endNode: Node,
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void,
  speed: AlgorithmSpeed
) => {
  let currentNode = endNode;

  while (currentNode !== startNode) {
    updateTile(currentNode.row, currentNode.column, TileType.PATH, false);
    if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

    if (!currentNode.parent) break;
    currentNode = currentNode.parent;
  }
};

// Get the neighbours of a node from
// the nodeGrid or make new nodes
const getNeighbours = (
  node: Node,
  grid: TileType[][],
  nodeGrid: Node[][],
  endPos: { row: number; column: number }
) => {
  const neighbours: Node[] = [];

  if (
    node.column + 1 < grid[0].length &&
    grid[node.row][node.column + 1] !== TileType.WALL
  ) {
    let neighbour = nodeGrid[node.row][node.column + 1];
    if (!neighbour) {
      neighbour = new Node(node.row, node.column + 1, 0, node, endPos);
      nodeGrid[node.row][node.column + 1] = neighbour;
    }
    neighbours.push(neighbour);
  }

  if (
    node.row + 1 < grid.length &&
    grid[node.row + 1][node.column] !== TileType.WALL
  ) {
    let neighbour = nodeGrid[node.row + 1][node.column];
    if (!neighbour) {
      neighbour = new Node(node.row + 1, node.column, 0, node, endPos);
      nodeGrid[node.row + 1][node.column] = neighbour;
    }
    neighbours.push(neighbour);
  }

  if (node.row - 1 >= 0 && grid[node.row - 1][node.column] !== TileType.WALL) {
    let neighbour = nodeGrid[node.row - 1][node.column];
    if (!neighbour) {
      neighbour = new Node(node.row - 1, node.column, 0, node, endPos);
      nodeGrid[node.row - 1][node.column] = neighbour;
    }
    neighbours.push(neighbour);
  }

  if (
    node.column - 1 >= 0 &&
    grid[node.row][node.column - 1] !== TileType.WALL
  ) {
    let neighbour = nodeGrid[node.row][node.column - 1];
    if (!neighbour) {
      neighbour = new Node(node.row, node.column - 1, 0, node, endPos);
      nodeGrid[node.row][node.column - 1] = neighbour;
    }
    neighbours.push(neighbour);
  }

  return neighbours;
};

export const aStarAlgorithm = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void,
  speed: AlgorithmSpeed
) => {
  clearPath(grid, updateTile);

  // Initialise the nodeGrid. Contains all open
  // and closed nodes from searching the grid
  const nodeGrid: Node[][] = initialiseNodeGrid(grid.length, grid[0].length);

  // Find the start tile & end tile positions
  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  // Initialise the startNode and add it to the nodeGrid
  const startNode = new Node(startPos.row, startPos.column, 0, null, endPos);
  nodeGrid[startPos.row][startPos.column] = startNode;

  // Initialise the openSet and closedSet
  const openSet = new MinHeap<Node>();
  const closedSet = new Set<Node>();

  openSet.add(startNode);

  while (openSet.count() > 0) {
    const currentNode = openSet.removeFirst();
    currentNode.heapIndex = undefined;
    closedSet.add(currentNode);

    if (
      currentNode.row === endPos.row &&
      currentNode.column === endPos.column
    ) {
      await retracePath(startNode, currentNode, updateTile, speed);
      return;
    }

    updateTile(currentNode.row, currentNode.column, TileType.CLOSED, false);
    if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

    for (const neighbour of getNeighbours(
      currentNode,
      grid,
      nodeGrid,
      endPos
    )) {
      if (closedSet.has(neighbour)) {
        continue;
      }

      const newMovementCostToNeighbour =
        currentNode.gCost + currentNode.heuristic(neighbour);

      if (
        newMovementCostToNeighbour < neighbour.gCost ||
        !openSet.contains(neighbour)
      ) {
        neighbour.gCost = newMovementCostToNeighbour;
        neighbour.parent = currentNode;

        if (!openSet.contains(neighbour)) {
          openSet.add(neighbour);
          updateTile(neighbour.row, neighbour.column, TileType.OPEN, false);
        } else {
          openSet.updateItem(neighbour);
        }
      }
    }
  }
};
