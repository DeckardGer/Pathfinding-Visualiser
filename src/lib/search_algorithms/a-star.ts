import { AlgorithmSpeed, TileType } from "../../types/settings";
import {
  anotherBasicPath,
  basicPath,
  checkTileExists,
  clearPath,
  delay,
  findTileType,
  hopefullyLastPath,
} from "../helpers";
import { MinHeap } from "../heap";
import { HeuristicNode } from "../algorithm_classes/heuristic-node";
import { NodeGrid } from "../algorithm_classes/node-grid";

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
  await clearPath(grid, updateTile);

  // await basicPath(updateTile);
  // await anotherBasicPath(updateTile);
  // await hopefullyLastPath(updateTile);

  // Find the start tile & end tile positions
  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  // If there is no start or end tile
  if (!checkTileExists(startPos, grid) || !checkTileExists(endPos, grid))
    return;

  // Initialise the startNode using the startPos
  const startNode = new HeuristicNode(startPos.row, startPos.column, null);

  // NodeGrid keeps track of the nodes found
  const nodeGrid = new NodeGrid(
    grid.length,
    grid[0].length,
    startNode,
    endPos,
    grid,
    HeuristicNode
  );

  // Initialise the openSet and closedSet
  const openSet = new MinHeap();
  const closedSet = new Set<HeuristicNode>();

  openSet.add(startNode);

  while (openSet.count() > 0) {
    const currentNode = openSet.removeFirst();
    currentNode.heapIndex = undefined;
    closedSet.add(currentNode);

    if (
      currentNode.row === endPos.row &&
      currentNode.column === endPos.column
    ) {
      await nodeGrid.retracePath(currentNode, updateTile, speed);
      return;
    }

    updateTile(currentNode.row, currentNode.column, TileType.CLOSED, false);
    if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

    for (const neighbour of nodeGrid.getNeighbours(currentNode)) {
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
        } else {
          openSet.updateItem(neighbour);
        }
      }
    }
  }
};
