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

const getNeighbours = (node: Node, grid: TileType[][]) => {
  const neighbours: GridPos[] = [];

  if (
    node.column + 1 < grid[0].length &&
    grid[node.row][node.column + 1] !== TileType.WALL
  ) {
    neighbours.push({ row: node.row, column: node.column + 1 });
  }

  if (
    node.row + 1 < grid.length &&
    grid[node.row + 1][node.column] !== TileType.WALL
  ) {
    neighbours.push({ row: node.row + 1, column: node.column });
  }

  if (node.row - 1 >= 0 && grid[node.row - 1][node.column] !== TileType.WALL) {
    neighbours.push({ row: node.row - 1, column: node.column });
  }

  if (
    node.column - 1 >= 0 &&
    grid[node.row][node.column - 1] !== TileType.WALL
  ) {
    neighbours.push({ row: node.row, column: node.column - 1 });
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
  // await basicPath(grid, updateTile);

  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  const startNode = new Node(startPos.row, startPos.column, 0, null, endPos);
  // const nextNode = new Node(2, 1, 1, startNode, endPos);

  const openSet = new MinHeap<Node>();
  const closedSet = new Set<GridPos>();

  openSet.add(startNode);
  console.log(openSet.contains(new Node(1, 1, 0, null, endPos)));

  while (openSet.count() < 0) {
    const currentNode = openSet.removeFirst();
    closedSet.add({ row: currentNode.row, column: currentNode.column });

    if (
      currentNode.row === endPos.row &&
      currentNode.column === endPos.column
    ) {
      console.log("Found");
      return;
    }

    for (const neighbour of getNeighbours(currentNode, grid)) {
      if (closedSet.has(neighbour)) {
        continue;
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
