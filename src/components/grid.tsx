import { useEffect, useState, useRef } from "react";
import Tile from "./tile";
import { TileType } from "../types/settings";
import randomMaze from "../lib/mazes_&_patterns/random-maze";
import recursiveDivision from "../lib/mazes_&_patterns/recursive-division";
import resetGrid from "../lib/grid_manipulation/reset-grid";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

// Creates a 2D array given gridRows and gridCols,
// and sets the start and end tiles
const initializeGrid = (gridRows: number, gridCols: number): TileType[][] => {
  const grid = Array.from({ length: gridRows }, () =>
    Array(gridCols).fill(TileType.EMPTY)
  );
  grid[1][1] = TileType.START;
  grid[gridRows - 2][gridCols - 2] = TileType.END;
  return grid;
};

// We don't map the values from grid to the tiles as
// it flickers whenever we change gridRows or gridCols.
// Instead, we use getTileType() to get the tile type
function Grid({ gridRows, gridCols }: GridProps) {
  const aspectRatio = gridCols / gridRows;

  const isMouseDown = useRef<boolean>(false);
  const [grid, setGrid] = useState<TileType[][]>(
    initializeGrid(gridRows, gridCols)
  );

  // Updates grid when gridRows or gridCols changes
  useEffect(() => {
    setGrid(initializeGrid(gridRows, gridCols));
  }, [gridRows, gridCols]);

  // Returns the tile type given the row and column
  const getTileType = (row: number, column: number) => grid?.[row]?.[column];

  // Sets isMouseDown to true, adds the event listener, and updates the tile
  // only to tiles which aren't draggable
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (!target.dataset.row || !target.dataset.column) return;
    if (target.draggable) return;

    const row = parseInt(target.dataset.row);
    const column = parseInt(target.dataset.column);

    document.addEventListener("mouseup", handleMouseUp);
    isMouseDown.current = true;
    updateTile(row, column, TileType.WALL);
  };

  // Sets isMouseDown to false and removes the event listener
  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    isMouseDown.current = false;
  };

  // Checks if the row and column data attributes exist and updates the tile
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;

    const target = event.target as HTMLDivElement;

    if (!target.dataset.row || !target.dataset.column) return;
    if (target.draggable) return;

    const row = parseInt(target.dataset.row);
    const column = parseInt(target.dataset.column);

    updateTile(row, column, TileType.WALL);
  };

  // Updates the grid when the tile is dropped by updating
  // the target element with the previous elements tile type
  // and setting the initial tile type to empty
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (!target.dataset.row || !target.dataset.column) return;
    if (!target.parentNode) return;

    const initial = target.parentNode.querySelector(
      "[data-row][data-column]:active"
    );

    if (!initial) return;

    const initialRowString = initial.getAttribute("data-row");
    const initialColumnString = initial.getAttribute("data-column");

    if (!initialRowString || !initialColumnString) return;

    const targetRow = parseInt(target.dataset.row);
    const targetColumn = parseInt(target.dataset.column);

    const initialRow = parseInt(initialRowString);
    const initialColumn = parseInt(initialColumnString);

    updateTile(targetRow, targetColumn, grid[initialRow][initialColumn]);

    updateTile(initialRow, initialColumn, TileType.EMPTY);
  };

  // Allows an element to be dragged over the grid with the
  // correct cursor styles if the element isn't draggable
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (target.draggable) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Updates the tile type in the grid only if it has changed
  const updateTile = (
    row: number,
    column: number,
    newTileType: TileType,
    forceUpdate: boolean = true
  ) => {
    if (
      !forceUpdate &&
      (getTileType(row, column) === TileType.START ||
        getTileType(row, column) === TileType.END)
    )
      return;
    setGrid((oldGrid) => {
      if (oldGrid?.[row]?.[column] === undefined) return oldGrid;
      if (oldGrid[row][column] === newTileType) return oldGrid;

      oldGrid[row][column] = newTileType;
      return [...oldGrid];
    });
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full px-6 my-2"
      style={{ containerType: "size" }}
    >
      <div
        className="max-w-full grid gap-0.5"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onContextMenu={(event) => event.preventDefault()}
        style={{
          aspectRatio: `${aspectRatio}`,
          width: `${aspectRatio * 100}cqh`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridRows }).map((_, rowIndex) =>
          Array.from({ length: gridCols }).map((_, colIndex) => {
            const currentTileType = getTileType(rowIndex, colIndex);
            const formattedTileType =
              currentTileType === undefined ? TileType.EMPTY : currentTileType;

            return (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                column={colIndex}
                tileType={formattedTileType}
              />
            );
          })
        )}
      </div>
      <button
        onClick={() => {
          resetGrid(grid, updateTile);
          // randomMaze(grid, updateTile);
          recursiveDivision(grid, updateTile);
        }}
      >
        Random Maze
      </button>
    </div>
  );
}

export default Grid;
