import { TileType } from "../../types/settings";
import { delay } from "../helpers";
import { findTileType } from "../helpers";
import { basicPath } from "../helpers";
import { MinHeap } from "../heap";
import { Node } from "./node";

const TILE_DELAY = 10;

type GridPos = {
  row: number;
  column: number;
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
  const getNeighbours = (node: Node) => {
    const neighbours: Node[] = [];

    if (
      node.column + 1 < grid[0].length &&
      grid[node.row][node.column + 1] !== TileType.WALL
    ) {
      if (heapIndexGrid[node.row][node.column + 1] === -1) {
        const neighbour = new Node(node.row, node.column + 1, 0, node, endPos);
        neighbours.push(neighbour);
        heapIndexGrid[node.row][node.column + 1] = neighbour;
      } else if (openSet.get(heapIndexGrid[node.row][node.column + 1])) {
        neighbours.push(openSet.get(heapIndexGrid[node.row][node.column + 1]));
      }
    }

    if (
      node.row + 1 < grid.length &&
      grid[node.row + 1][node.column] !== TileType.WALL
    ) {
      if (heapIndexGrid[node.row + 1][node.column] === -1) {
        const neighbour = new Node(node.row + 1, node.column, 0, node, endPos);
        neighbours.push(neighbour);
        heapIndexGrid[node.row + 1][node.column] = neighbour;
      } else if (openSet.get(heapIndexGrid[node.row + 1][node.column])) {
        neighbours.push(openSet.get(heapIndexGrid[node.row + 1][node.column]));
      }
    }

    if (
      node.row - 1 >= 0 &&
      grid[node.row - 1][node.column] !== TileType.WALL
    ) {
      if (heapIndexGrid[node.row - 1][node.column] === -1) {
        const neighbour = new Node(node.row - 1, node.column, 0, node, endPos);
        neighbours.push(neighbour);
        heapIndexGrid[node.row - 1][node.column] = neighbour;
      } else if (openSet.get(heapIndexGrid[node.row - 1][node.column])) {
        neighbours.push(openSet.get(heapIndexGrid[node.row - 1][node.column]));
      }
    }

    if (
      node.column - 1 >= 0 &&
      grid[node.row][node.column - 1] !== TileType.WALL
    ) {
      if (heapIndexGrid[node.row][node.column - 1] === -1) {
        const neighbour = new Node(node.row, node.column - 1, 0, node, endPos);
        neighbours.push(neighbour);
        heapIndexGrid[node.row][node.column - 1] = neighbour;
      } else if (openSet.get(heapIndexGrid[node.row][node.column - 1])) {
        neighbours.push(openSet.get(heapIndexGrid[node.row][node.column - 1]));
      }
    }

    return neighbours;
  };
  // await basicPath(grid, updateTile);

  let heapIndexGrid = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(-1)
  );

  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  const startNode = new Node(startPos.row, startPos.column, 0, null, endPos);
  heapIndexGrid[startPos.row][startPos.column] = startNode;

  const openSet = new MinHeap<Node>();
  const closedSet = new Set<Node>();

  openSet.add(startNode);
  // TODO: CHECK OPENSET.CONTAINS()
  // TODO: CHECK CLOSEDSET.HAS()
  // TODO: STORE HEAPINDEX

  while (openSet.count() > 0) {
    const currentNode = openSet.removeFirst();
    closedSet.add(currentNode);
    // updateTile(currentNode.row, currentNode.column, TileType.CLOSED);
    // await delay(TILE_DELAY);

    if (
      currentNode.row === endPos.row &&
      currentNode.column === endPos.column
    ) {
      console.log("Found");
      return;
    }

    for (const neighbour of getNeighbours(currentNode)) {
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
          // updateTile(neighbour.row, neighbour.column, TileType.OPEN);
          // await delay(TILE_DELAY);
        }
      }
    }
  }
  //   const currentNode = openSet.pop()!;

  //   if (
  //     currentNode.row === endPos.row &&
  //     currentNode.column === endPos.column
  //   ) {
  //     console.log("Found");
  //     return;
  //   }

  //   closedSet.add(currentNode);
  //   const neighbours = getNeighbours(currentNode, grid);

  //   for (const neighbour of neighbours) {
  //     if (closedSet.has(neighbour)) {
  //       continue;
  //     }

  //     const newMovementCostToNeighbour =
  //       currentNode.gCost + heuristic(currentNode, neighbour);

  //     if (
  //       newMovementCostToNeighbour < neighbour.gCost ||
  //       !openSet.contains(neighbour)
  //     ) {
  //       neighbour.gCost = newMovementCostToNeighbour;
  //       neighbour.hCost = heuristic(neighbour, endPos);
  //       neighbour.parent = currentNode;

  //       if (!openSet.contains(neighbour)) {
  //         openSet.push(neighbour);
  //         updateTile(neighbour.row, neighbour.column, TileType.OPEN);
  //       } else {
  //         openSet.update(neighbour);
  //       }
  //     }
  //   }
  // }
};
