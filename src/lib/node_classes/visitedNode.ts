export class Node {
  public row: number;
  public column: number;
  public parent: Node | null;
  public visited: boolean;

  constructor(row: number, column: number, parent: Node | null) {
    this.row = row;
    this.column = column;
    this.parent = parent;
    this.visited = false;
  }
}
