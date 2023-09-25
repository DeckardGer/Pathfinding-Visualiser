interface TileProps {
  row: number;
  col: number;
  state: boolean;
}

function Tile({ row, col, state }: TileProps) {
  console.log(state);
  return (
    <div
      className="bg-tile-empty aspect-square"
      style={{ borderRadius: "20%" }}
      data-row={row}
      data-col={col}
    ></div>
  );
}

export default Tile;
