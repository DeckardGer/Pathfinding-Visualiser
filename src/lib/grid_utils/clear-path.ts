import { TileType } from "../../types/settings";

// Makes every tile on thr grid empty except
// for the start, end, and wall tiles
export const clearPath = (
  grid: TileType[][],
  updateTile: (row: number, column: number, newTileType: TileType) => void
) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (
        grid[row][column] === TileType.START ||
        grid[row][column] === TileType.END ||
        grid[row][column] === TileType.WALL
      )
        continue;
      updateTile(row, column, TileType.EMPTY);
    }
  }
};
