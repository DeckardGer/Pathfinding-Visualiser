import { TileType } from "../../types/settings";

const RANDOM_UPPER_BOUND = 3;
const ROW_DELAY = 50;

const delay = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

// TODO: Block all settings until complete
const randomMaze = async (
  grid: TileType[][],
  setGrid: React.Dispatch<React.SetStateAction<TileType[][]>>,
  initialGrid: TileType[][],
  updateTile: (row: number, column: number, newTileType: TileType) => void
) => {
  setGrid(initialGrid);
  // updateTile(0, 1, TileType.WALL);
  // setGrid((prev) => {
  //   const row = 0;
  //   const column = 1;
  //   const newTileType = TileType.WALL;

  //   if (prev?.[row]?.[column] === undefined) return prev;
  //   console.log(
  //     "Current: " +
  //       prev[row][column] +
  //       " New: " +
  //       newTileType +
  //       `${prev[row][column] === newTileType ? " Reject" : " Accept"}`
  //   );

  //   if (prev[row][column] === newTileType) return prev;

  //   prev[row][column] = newTileType;
  //   return [...prev];
  // });
  // for (let row = 0; row < grid.length; row++) {
  //   for (let column = 0; column < grid[row].length; column++) {
  //     if (Math.floor(Math.random() * RANDOM_UPPER_BOUND) + 1 === 1) {
  //       updateTile(row, column, TileType.WALL);
  //     }
  //   }
  //   await delay(ROW_DELAY);
  // }
};

export default randomMaze;
