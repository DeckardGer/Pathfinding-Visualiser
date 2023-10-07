import { TileType } from "../../types/settings";
import { delay } from "../delay";

const RANDOM_UPPER_BOUND = 3;
const ROW_DELAY = 50;

// TODO: Block all settings until complete
const randomMaze = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void
) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (Math.floor(Math.random() * RANDOM_UPPER_BOUND) + 1 !== 1) continue;
      updateTile(row, column, TileType.WALL, false);
    }
    await delay(ROW_DELAY);
  }
};

export default randomMaze;
