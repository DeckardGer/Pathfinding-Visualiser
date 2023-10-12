import { AlgorithmSpeed, TileType } from "../../types/settings";
import { checkTileExists, clearPath, delay, findTileType } from "../helpers";
import { Node } from "../algorithm_classes/node";
import { NodeGrid } from "../algorithm_classes/node-grid";

export const depthFirstSearch = async (
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

  // Find the start tile & end tile positions
  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  // If there is no start or end tile
  if (!checkTileExists(startPos, grid) || !checkTileExists(endPos, grid))
    return;

  // Initialise the startNode using the startPos
  const startNode = new Node(startPos.row, startPos.column, null);

  // NodeGrid keeps track of the nodes found
  const nodeGrid = new NodeGrid(
    grid.length,
    grid[0].length,
    startNode,
    endPos,
    grid
  );

  // visited keeps track of the visited nodes using a set
  // while stack keeps track of the nodes to be visited
  const visited = new Set<Node>();
  const stack: Node[] = [];

  visited.add(startNode);
  stack.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop() as Node;

    if (nodeGrid.checkForEndNode(currentNode)) {
      await nodeGrid.retracePath(currentNode, updateTile, speed);
      return;
    }

    updateTile(currentNode.row, currentNode.column, TileType.CLOSED, false);
    if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

    for (const neighbour of nodeGrid.getNeighbours(currentNode).reverse()) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        stack.push(neighbour);
        updateTile(neighbour.row, neighbour.column, TileType.OPEN, false);
      }
    }
  }
};
