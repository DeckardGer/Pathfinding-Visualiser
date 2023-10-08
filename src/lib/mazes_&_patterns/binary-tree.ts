import { TileType } from "../../types/settings";
import { delay, getDelayIndividualTiles, getTileDelay } from "../delay";

enum Orientation {
  NONE,
  VERTICAL,
  HORIZONTAL,
}

const binaryTree = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void,
  resetGrid: (
    grid: TileType[][],
    updateTile: (row: number, column: number, newTileType: TileType) => void
  ) => void
) => {
  resetGrid(grid, updateTile);

  const tile_delay = getTileDelay(grid.length * grid[0].length);
  const delayIndividualTiles = getDelayIndividualTiles(
    grid.length,
    grid[0].length
  );

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i % 2 === 0) {
        updateTile(i, j, TileType.WALL, false);
      } else if (j % 2 === 0) {
        updateTile(i, j, TileType.WALL, false);
      }
    }
    await delay(tile_delay * 2);
  }

  let orientation = Orientation.NONE;

  for (let y = 1; y < grid.length - 1; y += 2) {
    for (let x = 1; x < grid[0].length - 1; x += 2) {
      if (grid[0].length - 2 === x && grid.length - 2 === y) continue;
      else if (grid[0].length - 2 === x) orientation = Orientation.HORIZONTAL;
      else if (grid.length - 2 === y) orientation = Orientation.VERTICAL;
      else
        orientation =
          Math.floor(Math.random() * 2) === 0
            ? Orientation.VERTICAL
            : Orientation.HORIZONTAL;

      if (orientation === Orientation.VERTICAL) {
        for (let i = 0; i < 3; i++) {
          updateTile(y, x + i, TileType.EMPTY, false);
        }
        if (delayIndividualTiles) await delay(tile_delay);
      } else if (orientation === Orientation.HORIZONTAL) {
        for (let i = 0; i < 3; i++) {
          updateTile(y + i, x, TileType.EMPTY, false);
        }
        if (delayIndividualTiles) await delay(tile_delay);
      }
    }
    if (!delayIndividualTiles) await delay(tile_delay);
  }
};

export default binaryTree;
