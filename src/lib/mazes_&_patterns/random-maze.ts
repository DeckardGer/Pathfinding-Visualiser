import { TileType } from "../../types/settings";
import { delay, resetGrid } from "../helpers";

const RANDOM_UPPER_BOUND = 1;
const TILE_DELAY = 50;

// TODO: Block all settings until complete
export const randomMaze = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void
) => {
  await resetGrid(grid, updateTile);

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (Math.floor(Math.random() * RANDOM_UPPER_BOUND) + 1 !== 1) continue;
      updateTile(row, column, TileType.WALL, false);
    }
    await delay(TILE_DELAY);
  }
};
