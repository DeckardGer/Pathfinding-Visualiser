export class Node {
  public row: number;
  public column: number;
  public gCost: number;
  public hCost: number;
  public parent: Node | null;
  public heapIndex: number | undefined;

  constructor(
    row: number,
    column: number,
    gCost: number,
    parent: Node | null,
    endPos: { row: number; column: number }
  ) {
    this.row = row;
    this.column = column;
    this.gCost = gCost;
    this.parent = parent;
    this.hCost = this.heuristic(endPos);
    this.heapIndex = undefined;
  }

  fCost() {
    return this.gCost + this.hCost;
  }

  heuristic(targetNode: { row: number; column: number }) {
    return (
      Math.abs(this.row - targetNode.row) +
      Math.abs(this.column - targetNode.column)
    );
  }

  compareTo(a: number, b: number) {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  }

  compare(nodeToCompare: Node) {
    let compare = this.compareTo(this.fCost(), nodeToCompare.fCost());
    if (compare === 0) {
      compare = this.compareTo(this.hCost, nodeToCompare.hCost);
    }
    return -compare;
  }
}
