import { memo } from "react";
import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

interface TileProps {
  row: number;
  column: number;
  tileType: TileType;
}

function Tile({ row, column, tileType }: TileProps) {
  // TODO: Delete
  console.log("Tile render");

  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.EMPTY && "bg-tile-empty",
        tileType === TileType.WALL && "bg-black"
      )}
      data-row={row}
      data-column={column}
      style={{ borderRadius: "20%" }}
    ></div>
  );
}

export default memo(Tile);
