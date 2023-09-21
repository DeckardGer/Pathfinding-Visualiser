import Tile from "./tile";

interface GridProps {
  gridSize: number;
}

function Grid({ gridSize }: GridProps) {
  return (
    <div className="flex flex-col gap-0.5 flex-1 aspect-square">
      {Array.from({ length: gridSize }).map((_, row) => (
        <div key={row} className="flex gap-0.5 flex-1">
          {Array.from({ length: gridSize }).map((_, col) => (
            <Tile key={`${row}-${col}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
