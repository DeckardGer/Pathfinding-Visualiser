import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

interface TileProps {
  row: number;
  column: number;
  tileType: TileType;
}

// TODO: Make colours actual tailwind colours
function Tile({ row, column, tileType }: TileProps) {
  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.WALL && "bg-black",
        tileType === TileType.START && "bg-green-600",
        tileType === TileType.END && "bg-red-600"
      )}
      data-row={row}
      data-column={column}
      draggable={
        tileType === TileType.START || tileType === TileType.END
          ? true
          : undefined
      }
      style={{ borderRadius: "20%" }}
    ></div>
  );
}

export default Tile;
