import Tile from "./tile";

interface GridProps {
  gridRows: number;
  gridCols: number;
}

function Grid({ gridRows, gridCols }: GridProps) {
  const aspectRatio = gridCols / gridRows;

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full px-4"
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
