import { TileType } from "../types/settings";
import { Node } from "./search_algorithms/node";

/* ******************************** */
/* DELAY FUNCTIONS                  */
/* ******************************** */

const MAX_LENGTH_FOR_DELAY = 41;
const NUM_TILES_FOR_MAX_DELAY = 1500;
const NUM_TILES_FOR_MIN_DELAY = 50;
const MAX_DELAY = 30;
const MIN_DELAY = 10;

// Utility function to delay for a certain amount of time in milliseconds
export const delay = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

// Utility function to get the tile delay
export const getTileDelay = (totalTiles: number): number => {
  if (totalTiles <= 50) {
    return 30;
  } else if (totalTiles >= 1500) {
    return 1;
  } else {
    return Math.round(
      ((MIN_DELAY - MAX_DELAY) * (NUM_TILES_FOR_MAX_DELAY - totalTiles)) /
        (NUM_TILES_FOR_MAX_DELAY - NUM_TILES_FOR_MIN_DELAY) +
        MAX_DELAY
    );
  }
};

// Utility function to determine if the delay should
// run for individual tiles or multiple tiles
export const getDelayIndividualTiles = (
  rows: number,
  columns: number
): boolean => {
  return rows <= MAX_LENGTH_FOR_DELAY && columns <= MAX_LENGTH_FOR_DELAY;
};

/* ******************************** */
/* GRID UTILITIES                   */
/* ******************************** */

// Creates a 2D array given gridRows and gridCols,
// and sets the start and end tiles
export const initializeGrid = (rows: number, columns: number): TileType[][] => {
  const grid = Array.from({ length: rows }, () =>
    Array(columns).fill(TileType.EMPTY)
  );
  // const grid = Array.from({ length: rows }, (_, row) =>
  //   Array.from(
  //     { length: columns },
  //     (_, column) =>
  //       new Node(row, column, 0, null, { row: rows - 2, column: columns - 2 })
  //   )
  // );
  grid[1][1] = TileType.START;
  grid[rows - 2][columns - 2] = TileType.END;
  return grid;
};

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

// Makes every tile on the grid empty
// except for the start and end tiles
export const resetGrid = (
  grid: TileType[][],
  updateTile: (row: number, column: number, newTileType: TileType) => void
) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (
        grid[row][column] === TileType.START ||
        grid[row][column] === TileType.END
      )
        continue;
      updateTile(row, column, TileType.EMPTY);
    }
  }
};

// Returns the tile type given the row and column.
export const findTileType = (
  grid: TileType[][],
  tileType: TileType,
  forwardsSearch: boolean = true
): { row: number; column: number } => {
  if (forwardsSearch) {
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        if (grid[row][column] === tileType) {
          return { row, column };
        }
      }
    }
  } else {
    for (let row = grid.length - 1; row >= 0; row--) {
      for (let column = grid[row].length - 1; column >= 0; column--) {
        if (grid[row][column] === tileType) {
          return { row, column };
        }
      }
    }
  }
  return { row: -1, column: -1 };
};

export const basicPath = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void
) => {
  const tile_delay = 500;

  for (let i = 0; i < 12; i++) {
    updateTile(0, i, TileType.WALL, false);
  }
  for (let i = 0; i < 7; i++) {
    updateTile(i, 12, TileType.WALL, false);
  }
  for (let i = 12; i > 0; i--) {
    updateTile(7, i, TileType.WALL, false);
  }
  for (let i = 7; i > 0; i--) {
    updateTile(i, 0, TileType.WALL, false);
  }

  updateTile(2, 4, TileType.WALL);
  updateTile(3, 4, TileType.WALL);
  updateTile(3, 5, TileType.WALL);
  updateTile(3, 6, TileType.WALL);
  updateTile(3, 7, TileType.WALL);
  updateTile(3, 8, TileType.WALL);

  updateTile(1, 1, TileType.EMPTY);
  updateTile(15, 15, TileType.EMPTY);

  updateTile(5, 8, TileType.START);
  updateTile(2, 5, TileType.END);

  await delay(tile_delay);
};
