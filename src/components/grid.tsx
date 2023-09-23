import Tile from "./tile";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

function Grid({ gridRows, gridCols }: GridProps) {
  return (
    <div className="flex justify-center items-center h-full w-full px-4 grid-container">
      <div
        className="grid gap-0.5 grid-element"
        style={{
          width: `${(gridCols / gridRows) * 100}cqmin`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridCols }).map((_, row) =>
          Array.from({ length: gridRows }).map((_, col) => (
            <Tile key={`${row}-${col}`} />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
