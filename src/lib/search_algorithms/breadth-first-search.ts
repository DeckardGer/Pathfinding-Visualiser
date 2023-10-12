import { AlgorithmSpeed, TileType } from "../../types/settings";
import { clearPath, findTileType, initialiseNodeGrid } from "../helpers";
import { Node } from "../node_classes/visitedNode";

export const breadthFirstSearch = async (
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

  const nodeGrid: Node[][] = initialiseNodeGrid(grid.length, grid[0].length);

  // Find the start tile & end tile positions
  const startPos = findTileType(grid, TileType.START);
  const endPos = findTileType(grid, TileType.END, false);

  // Initialise the startNode and add it to the nodeGrid
  const startNode = new Node(startPos.row, startPos.column, null);
  nodeGrid[startPos.row][startPos.column] = startNode;

  const visited = [];
  // const queue = [];

  // while (queue.length > 0) {
  // const s = queue.pop(0);
  // }
};
