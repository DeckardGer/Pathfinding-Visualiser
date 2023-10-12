import { TileType, AlgorithmSpeed, GridPos } from "../../types/settings";
import { delay } from "../helpers";
import { Node } from "./node";

export class NodeGrid {
  private nodeGrid: Node[][];
  private wallGrid: TileType[][];
  private startNode: Node;
  private endPos: GridPos;

  constructor(
    rows: number,
    columns: number,
    startNode: Node,
    endPos: GridPos,
    wallGrid: TileType[][]
  ) {
    this.nodeGrid = Array.from({ length: rows }, () => Array(columns));
    this.wallGrid = wallGrid;
    this.startNode = startNode;
    this.endPos = endPos;
    this.nodeGrid[startNode.row][startNode.column] = this.startNode;
  }

  // Check if the given node is the end node
  checkForEndNode(node: Node) {
    return node.row === this.endPos.row && node.column === this.endPos.column;
  }

  // Retrace the path from the end node to the start node
  async retracePath(
    endNode: Node,
    updateTile: (
      row: number,
      column: number,
      newTileType: TileType,
      foreUpdate?: boolean
    ) => void,
    speed: AlgorithmSpeed
  ) {
    let currentNode = endNode;

    while (currentNode !== this.startNode) {
      updateTile(currentNode.row, currentNode.column, TileType.PATH, false);
      if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

      if (!currentNode.parent) break;
      currentNode = currentNode.parent;
    }
  }

  // Get the neighbours of a node from
  // the nodeGrid or make new nodes
  getNeighbours(node: Node) {
    const neighbours: Node[] = [];

    if (
      node.column + 1 < this.wallGrid[0].length &&
      this.wallGrid[node.row][node.column + 1] !== TileType.WALL
    ) {
      let neighbour = this.nodeGrid[node.row][node.column + 1];
      if (!neighbour) {
        neighbour = new Node(node.row, node.column + 1, node);
        this.nodeGrid[node.row][node.column + 1] = neighbour;
      }
      neighbours.push(neighbour);
    }

    if (
      node.row + 1 < this.wallGrid.length &&
      this.wallGrid[node.row + 1][node.column] !== TileType.WALL
    ) {
      let neighbour = this.nodeGrid[node.row + 1][node.column];
      if (!neighbour) {
        neighbour = new Node(node.row + 1, node.column, node);
        this.nodeGrid[node.row + 1][node.column] = neighbour;
      }
      neighbours.push(neighbour);
    }

    if (
      node.row - 1 >= 0 &&
      this.wallGrid[node.row - 1][node.column] !== TileType.WALL
    ) {
      let neighbour = this.nodeGrid[node.row - 1][node.column];
      if (!neighbour) {
        neighbour = new Node(node.row - 1, node.column, node);
        this.nodeGrid[node.row - 1][node.column] = neighbour;
      }
      neighbours.push(neighbour);
    }

    if (
      node.column - 1 >= 0 &&
      this.wallGrid[node.row][node.column - 1] !== TileType.WALL
    ) {
      let neighbour = this.nodeGrid[node.row][node.column - 1];
      if (!neighbour) {
        neighbour = new Node(node.row, node.column - 1, node);
        this.nodeGrid[node.row][node.column - 1] = neighbour;
      }
      neighbours.push(neighbour);
    }

    return neighbours;
  }
}
