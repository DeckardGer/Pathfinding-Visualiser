import { useState } from "react";
import Tile from "./tile";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

function Grid({ gridRows, gridCols }: GridProps) {
  const aspectRatio = gridCols / gridRows;

  const [grid, setGrid] = useState(() => {
    const initialGrid = Array(gridRows)
      .fill(null)
      .map(() => Array(gridCols).fill(false));
    return initialGrid;
  });

  const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.getAttribute("id") !== "grid") {
      const row: number = parseInt(target.dataset.row ?? "-1");
      const col: number = parseInt(target.dataset.col ?? "-1");

      if (row < 0 || col < 0) console.log("Invalid row or col");

      const updatedGrid = [...grid];
      updatedGrid[row][col] = true;
      setGrid(updatedGrid);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full px-6 my-2"
      style={{ containerType: "size" }}
    >
      <div
        onMouseEnter={handleOnMouseMove}
        className="max-w-full grid gap-0.5"
        style={{
          aspectRatio: `${aspectRatio}`,
          width: `${aspectRatio * 100}cqh`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
        id="grid"
      >
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              state={grid[rowIndex][colIndex]}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
