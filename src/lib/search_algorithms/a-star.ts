import { TileType } from "../../types/settings";
import { anotherBasicPath, delay } from "../helpers";
import { findTileType } from "../helpers";
import { basicPath } from "../helpers";
import { MinHeap } from "../heap";
import { Node } from "../node";

const TILE_DELAY = 10;

// Retrace the path from the end node to the start node
const retracePath = async (
  startNode: Node,
  endNode: Node,
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void
) => {
  let currentNode = endNode;

  while (currentNode !== startNode) {
    updateTile(currentNode.row, currentNode.column, TileType.PATH, false);
    await delay(TILE_DELAY);

    if (!currentNode.parent) break;
    currentNode = currentNode.parent;
  }
};

const getNeighbours = (
  node: Node,
  grid: TileType[][],
  nodeGrid: Node[][],
  openSet: MinHeap<Node>,
  endPos: { row: number; column: number }
) => {
  const neighbours: Node[] = [];

  if (
    node.column + 1 < grid[0].length &&
    grid[node.row][node.column + 1] !== TileType.WALL
  ) {
    if (!nodeGrid[node.row][node.column + 1]) {
      const neighbour = new Node(node.row, node.column + 1, 0, node, endPos);
      neighbours.push(neighbour);
      nodeGrid[node.row][node.column + 1] = neighbour;
    } else if (nodeGrid[node.row][node.column + 1].heapIndex !== undefined) {
      neighbours.push(
        openSet.get(nodeGrid[node.row][node.column + 1].heapIndex!)
      );
    }
  }

  if (
    node.row + 1 < grid.length &&
    grid[node.row + 1][node.column] !== TileType.WALL
  ) {
    if (!nodeGrid[node.row + 1][node.column]) {
      const neighbour = new Node(node.row + 1, node.column, 0, node, endPos);
      neighbours.push(neighbour);
      nodeGrid[node.row + 1][node.column] = neighbour;
    } else if (nodeGrid[node.row + 1][node.column].heapIndex !== undefined) {
      neighbours.push(
        openSet.get(nodeGrid[node.row + 1][node.column].heapIndex!)
      );
    }
  }

  if (node.row - 1 >= 0 && grid[node.row - 1][node.column] !== TileType.WALL) {
    if (!nodeGrid[node.row - 1][node.column]) {
      const neighbour = new Node(node.row - 1, node.column, 0, node, endPos);
      neighbours.push(neighbour);
      nodeGrid[node.row - 1][node.column] = neighbour;
    } else if (nodeGrid[node.row - 1][node.column].heapIndex !== undefined) {
      neighbours.push(
        openSet.get(nodeGrid[node.row - 1][node.column].heapIndex!)
      );
    }
  }

  if (
    node.column - 1 >= 0 &&
    grid[node.row][node.column - 1] !== TileType.WALL
  ) {
    if (!nodeGrid[node.row][node.column - 1]) {
      const neighbour = new Node(node.row, node.column - 1, 0, node, endPos);
      neighbours.push(neighbour);
      nodeGrid[node.row][node.column - 1] = neighbour;
    } else if (nodeGrid[node.row][node.column - 1].heapIndex !== undefined) {
      neighbours.push(
        openSet.get(nodeGrid[node.row][node.column - 1].heapIndex!)
      );
    }
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
  ) => void
) => {
  // await basicPath(updateTile);
  await anotherBasicPath(updateTile);

  const nodeGrid: Node[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length)
  );

  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  const startNode = new Node(startPos.row, startPos.column, 0, null, endPos);
  nodeGrid[startPos.row][startPos.column] = startNode;

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
      await retracePath(startNode, currentNode, updateTile);
      return;
    }

    updateTile(currentNode.row, currentNode.column, TileType.CLOSED, false);
    await delay(TILE_DELAY);

    for (const neighbour of getNeighbours(
      currentNode,
      grid,
      nodeGrid,
      openSet,
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
        neighbour.hCost = neighbour.heuristic(endPos);
        neighbour.parent = currentNode;

        if (!openSet.contains(neighbour)) {
          openSet.add(neighbour);
          updateTile(neighbour.row, neighbour.column, TileType.OPEN, false);
        }
      }
    }
  }
};
