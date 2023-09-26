import { useCallback, useEffect, useState } from "react";
import Tile from "./tile";
import { TileType } from "../types/settings";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

function Grid({ gridRows, gridCols }: GridProps) {
  const aspectRatio = gridCols / gridRows;

  // TODO: Delete
  console.log("Parent render");

  const [grid, setGrid] = useState<TileType[][]>(
    Array.from({ length: gridRows }, () => Array(gridCols).fill(TileType.EMPTY))
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isPrimaryButton, setIsPrimaryButton] = useState<boolean>(true);

  // Updates grid when gridRows or gridCols changes
  useEffect(() => {
    const newGrid = Array.from({ length: gridRows }, () =>
      Array(gridCols).fill(TileType.EMPTY)
    );

    setGrid(newGrid);
  }, [gridRows, gridCols]);

  // TODO: Refactor
  // Sets isMouseDown to true, adds the event listener, and updates the tile
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    document.addEventListener("mouseup", handleMouseUp);

    setIsMouseDown(true);
    let primaryButton = true;
    if (event.button === 0) {
      setIsPrimaryButton(true);
      primaryButton = true;
    } else {
      setIsPrimaryButton(false);
      primaryButton = false;
    }

    const target = event.target as HTMLDivElement;

    if (!target.dataset.row || !target.dataset.column) return;

    const row = parseInt(target.dataset.row);
    const column = parseInt(target.dataset.column);

    if (primaryButton) {
      updateTile(row, column, TileType.WALL);
    } else {
      updateTile(row, column, TileType.EMPTY);
    }
  };

  // Sets isMouseDown to false and removes the event listener
  const handleMouseUp = (event: MouseEvent) => {
    document.removeEventListener("mouseup", handleMouseUp);
    setIsMouseDown(false);

    if (event.button === 0) {
      setIsPrimaryButton(true);
    } else {
      setIsPrimaryButton(false);
    }
  };

  // Checks if the row and column data attributes exist and updates the tile
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;

    const target = event.target as HTMLDivElement;

    if (!target.dataset.row || !target.dataset.column) return;

    const row = parseInt(target.dataset.row);
    const column = parseInt(target.dataset.column);

    if (isPrimaryButton) {
      updateTile(row, column, TileType.WALL);
    } else {
      updateTile(row, column, TileType.EMPTY);
    }
  };

  // Updates the tile type in the grid only if it has changed
  const updateTile = useCallback(
    (row: number, column: number, newTileType: TileType) => {
      if (grid[row][column] === newTileType) return;

      setGrid((oldGrid) => {
        oldGrid[row][column] = newTileType;
        return [...oldGrid];
      });
    },
    [grid]
  );

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full px-6 my-2"
      style={{ containerType: "size" }}
    >
      <div
        className="max-w-full grid gap-0.5"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          aspectRatio: `${aspectRatio}`,
          width: `${aspectRatio * 100}cqh`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              column={colIndex}
              tileType={tile}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
