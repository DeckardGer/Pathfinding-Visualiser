import Tile from "./tile";

interface GridProps {
  gridSize: number;
}

function Grid({ gridSize }: GridProps) {
  return (
    <div className="flex justify-center items-center grow w-screen px-4 grid-container">
      <div className="grid-element grid grid-cols-10 gap-0.5">
        {Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => (
            <Tile key={`${row}-${col}`} />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
