import { TileType } from "../../types/settings";
import { delay } from "../delay";

const ROW_DELAY = 10;

const checkHorizontal = (width: number, height: number): boolean => {
  if (width < height) return true;
  if (height < width) return false;
  return Math.random() < 0.5;
};

const randomNumberRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const recursiveDivision = async (
  grid: TileType[][],
  updateTile: (
    row: number,
    column: number,
    newTileType: TileType,
    foreUpdate?: boolean
  ) => void
) => {
  for (let i = 0; i < grid[0].length - 1; i++) {
    updateTile(0, i, TileType.WALL, false);
    // await delay(ROW_DELAY);
  }
  for (let i = 0; i < grid.length - 1; i++) {
    updateTile(i, grid[0].length - 1, TileType.WALL, false);
    // await delay(ROW_DELAY);
  }
  for (let i = grid[0].length - 1; i > 0; i--) {
    updateTile(grid.length - 1, i, TileType.WALL, false);
    // await delay(ROW_DELAY);
  }
  for (let i = grid.length - 1; i > 0; i--) {
    updateTile(i, 0, TileType.WALL, false);
    // await delay(ROW_DELAY);
  }

  const divide = async (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isHorizontal: boolean
  ) => {
    if (!isHorizontal) {
      if (endX - startX < 2) {
        return;
      }

      let wallX = Math.floor(randomNumberRange(startX + 2, endX) / 2) * 2;
      let doorY =
        Math.floor(
          Math.floor(Math.random() * (endY - startY + 1) + startY) / 2
        ) *
          2 +
        1;

      for (let wallY = startY; wallY <= endY; wallY++) {
        if (wallY === doorY) {
          updateTile(wallY, doorY, TileType.EMPTY, false);
          await delay(ROW_DELAY);
        } else {
          updateTile(wallY, wallX, TileType.WALL, false);
          await delay(ROW_DELAY);
        }
      }

      await divide(
        startX,
        startY,
        wallX - 1,
        endY,
        checkHorizontal(wallX - 1 - startX, endY - startY)
      );
      await divide(
        wallX + 1,
        startY,
        endX,
        endY,
        checkHorizontal(endX - (wallX + 1), endY - startY)
      );
    }

    if (isHorizontal) {
      if (endY - startY < 2) {
        return;
      }

      let wallY = Math.floor(randomNumberRange(startY + 2, endY) / 2) * 2;
      let doorX =
        Math.floor(
          Math.floor(Math.random() * (endX - startX + 1) + startX) / 2
        ) *
          2 +
        1;

      for (let wallX = startX; wallX <= endX; wallX++) {
        if (wallX === doorX) {
          updateTile(wallY, doorX, TileType.EMPTY, false);
          await delay(ROW_DELAY);
        } else {
          updateTile(wallY, wallX, TileType.WALL, false);
          await delay(ROW_DELAY);
        }
      }

      await divide(
        startX,
        startY,
        endX,
        wallY - 1,
        checkHorizontal(endX - startX, wallY - 1 - startY)
      );
      await divide(
        startX,
        wallY + 1,
        endX,
        endY,
        checkHorizontal(endX - startX, endY - (wallY + 1))
      );
    }
  };

  await divide(
    1,
    1,
    grid[0].length - 2,
    grid.length - 2,
    checkHorizontal(grid[0].length - 2, grid.length - 2)
  );
};

export default recursiveDivision;
