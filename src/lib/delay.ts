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

export const getDelayIndividualTiles = (
  rows: number,
  columns: number
): boolean => {
  return rows <= MAX_LENGTH_FOR_DELAY && columns <= MAX_LENGTH_FOR_DELAY;
};
