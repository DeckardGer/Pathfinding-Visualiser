import { memo } from "react";
import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

interface TileProps {
  tileType: TileType;
}

function Tile({ tileType }: TileProps) {
  // TODO: Delete
  console.log("Tile render");

  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.EMPTY && "bg-tile-empty",
        tileType === TileType.WALL && "bg-black"
      )}
      style={{ borderRadius: "20%" }}
    ></div>
  );
}

export default memo(Tile);
