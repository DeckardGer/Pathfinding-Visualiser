import { useCallback, useEffect, useState } from "react";
import Tile from "./tile";
import { TileType } from "../types/settings";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

interface TileIndex {
  row: number;
  column: number;
}

function Grid({ gridRows, gridCols }: GridProps) {
  const aspectRatio = gridCols / gridRows;

  // TODO: Delete
  console.log("Parent render");

  const [grid, setGrid] = useState(
    Array.from({ length: gridRows }, () => Array(gridCols).fill(TileType.EMPTY))
  );

  // TODO: Change
  useEffect(() => {
    const initialGrid = Array.from({ length: gridRows }, () =>
      Array(gridCols).fill(TileType.EMPTY)
    );
    setGrid(initialGrid);
  }, [gridRows, gridCols]);

  const updateTile = ({ row, column }: TileIndex) => {
    setGrid((oldGrid) => {
      oldGrid[row][column] = TileType.WALL;
      return [...oldGrid];
    });
  };

  const listenChange = useCallback(({ row, column }: TileIndex) => {
    updateTile({ row, column });
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full px-6 my-2"
      style={{ containerType: "size" }}
    >
      <div
        className="max-w-full grid gap-0.5"
        style={{
          aspectRatio: `${aspectRatio}`,
          width: `${aspectRatio * 100}cqh`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} tileType={tile} />
          ))
        )}
        {/* <button onClick={() => listenChange({ row: 0, column: 0 })}>D</button> */}
      </div>
    </div>
  );
}

export default Grid;
