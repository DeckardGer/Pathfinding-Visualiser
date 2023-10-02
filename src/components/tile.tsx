import { memo } from "react";
import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

interface TileProps {
  row: number;
  column: number;
  tileType: TileType;
}

function Tile({ row, column, tileType }: TileProps) {
  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.EMPTY && "bg-tile-empty",
        tileType === TileType.WALL && "bg-black",
        tileType === TileType.START && "bg-green-600",
        tileType === TileType.END && "bg-red-600"
      )}
      data-row={row}
      data-column={column}
      style={{ borderRadius: "20%" }}
    ></div>
  );
}

export default memo(Tile);
