import { GridPos } from "../../types/settings";
import { Node } from "./node";

export class HeuristicNode extends Node {
  private _gCost: number;
  private _hCost: number;
  private _heapIndex: number | undefined;

  constructor(row: number, column: number, parent: HeuristicNode | null) {
    super(row, column, parent);
    this._gCost = -1;
    this._hCost = -1;
    this._heapIndex = undefined;
  }

  get gCost() {
    return this._gCost;
  }

  set gCost(gCost: number) {
    this._gCost = gCost;
  }

  get hCost() {
    return this._hCost;
  }

  set hCost(hCost: number) {
    this._hCost = hCost;
  }

  get heapIndex() {
    return this._heapIndex;
  }

  set heapIndex(_heapIndex: number | undefined) {
    this._heapIndex = _heapIndex;
  }

  fCost() {
    return this._gCost + this._hCost;
  }

  heuristic(targetNode: GridPos) {
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

  compare(nodeToCompare: HeuristicNode) {
    let compare = this.compareTo(this.fCost(), nodeToCompare.fCost());
    if (compare === 0) {
      compare = this.compareTo(this._hCost, nodeToCompare._hCost);
    }
    return -compare;
  }
}
