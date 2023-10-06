import { memo, useEffect, useRef } from "react";
import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

const TILE_TRANSITION_DURATION = 0.2;

interface TileProps {
  row: number;
  column: number;
  tileType: TileType;
}

function Tile({ row, column, tileType }: TileProps) {
  const element = useRef<HTMLDivElement>(null);
  const flipped = useRef<boolean>(false);

  useEffect(() => {
    if (!element.current) return;

    flipped.current
      ? (element.current.style.transform = "")
      : (element.current.style.transform = "rotateX(180deg)");
    flipped.current = !flipped.current;
  });

  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.WALL && "bg-tile-wall",
        tileType === TileType.START && "bg-tile-start",
        tileType === TileType.END && "bg-tile-end"
      )}
      ref={element}
      data-row={row}
      data-column={column}
      draggable={
        tileType === TileType.START || tileType === TileType.END
          ? true
          : undefined
      }
      style={{
        borderRadius: "20%",
        transitionProperty: "transform, background-color",
        transitionDuration: `${TILE_TRANSITION_DURATION}s, 0s`,
        transitionDelay: `0s, ${TILE_TRANSITION_DURATION / 2}s`,
        transitionTimingFunction: "linear, linear",
      }}
    ></div>
  );
}

export default memo(Tile);
