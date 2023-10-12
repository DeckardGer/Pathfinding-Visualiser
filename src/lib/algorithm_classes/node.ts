export class Node {
  private _row: number;
  private _column: number;
  private _parent: Node | null;

  constructor(row: number, column: number, parent: Node | null) {
    this._row = row;
    this._column = column;
    this._parent = parent;
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent: Node | null) {
    this._parent = parent;
  }
}
