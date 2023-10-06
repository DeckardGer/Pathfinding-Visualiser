import { memo, useEffect, useRef } from "react";
import { TileType } from "../types/settings";
import { cn } from "../lib/utils";

interface TileProps {
  row: number;
  column: number;
  tileType: TileType;
}

// TODO: Make colours actual tailwind colours
function Tile({ row, column, tileType }: TileProps) {
  const element = useRef<HTMLDivElement>(null);
  const initial = useRef<number>(0);
  const flipped = useRef<boolean>(false);

  useEffect(() => {
    if (!element.current) return;

    if (initial.current < 2) {
      initial.current += 1;
      return;
    }

    flipped.current
      ? (element.current.style.transform = "")
      : (element.current.style.transform = "rotateX(180deg)");
    flipped.current = !flipped.current;
  }, [tileType, row, column]);

  return (
    <div
      className={cn(
        "bg-tile-empty aspect-square",
        tileType === TileType.WALL && "bg-black",
        tileType === TileType.START && "bg-green-600",
        tileType === TileType.END && "bg-red-600"
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
        transitionDuration: "0.2s, 0s",
        transitionDelay: "0s, 0.1s",
        transitionTimingFunction: "linear, linear",
      }}
    ></div>
  );
}

export default memo(Tile);
