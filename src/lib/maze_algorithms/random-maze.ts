import { TileType } from "../../types/settings";

const RANDOM_UPPER_BOUND = 3;

const randomMaze = (
  grid: TileType[][],
  setGrid: React.Dispatch<React.SetStateAction<TileType[][]>>,
  initialGrid: TileType[][],
  updateTile: (row: number, column: number, newTileType: TileType) => void
) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (Math.floor(Math.random() * RANDOM_UPPER_BOUND) + 1 === 1) {
        updateTile(row, column, TileType.WALL);
      }
    }
  }
};

export default randomMaze;
