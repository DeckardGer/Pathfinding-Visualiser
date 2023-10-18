import { TileType, AlgorithmSpeed, GridPos } from "../../types/settings";
import { delay } from "../helpers";
import { Node } from "./node";

export class NodeGrid<T extends Node> {
  private nodeGrid: T[][];
  private wallGrid: TileType[][];
  private startNode: T;
  private endPos: GridPos;
  private nodeConstructor: new (row: number, column: number, parent: T) => T;

  constructor(
    rows: number,
    columns: number,
    startNode: T,
    endPos: GridPos,
    wallGrid: TileType[][],
    nodeConstructor: new (row: number, column: number, parent: T) => T
  ) {
    this.nodeGrid = Array.from({ length: rows }, () => Array(columns));
    this.wallGrid = wallGrid;
    this.startNode = startNode;
    this.endPos = endPos;
    this.nodeGrid[startNode.row][startNode.column] = this.startNode;
    this.nodeConstructor = nodeConstructor;
  }

  // Create a new node
  createNode(row: number, column: number, parent: T) {
    return new this.nodeConstructor(row, column, parent);
  }

  // Check if the given node is the end node
  checkForEndNode(node: T) {
    return node.row === this.endPos.row && node.column === this.endPos.column;
  }

  // Retrace the path from the end node to the start node
  async retracePath(
    endNode: T,
    updateTile: (
      row: number,
      column: number,
      newTileType: TileType,
      foreUpdate?: boolean
    ) => void,
    speed: AlgorithmSpeed
  ) {
    let currentNode = endNode;

    while (currentNode !== null) {
      updateTile(currentNode.row, currentNode.column, TileType.PATH, false);
      if (speed !== AlgorithmSpeed.INSTANT) await delay(speed);

      currentNode = currentNode.parent as T;
    }
  }

  // Get the neighbours of a node from
  // the nodeGrid or make new nodes
  getNeighbours(node: T) {
    const neighbours: T[] = [];

    if (
      node.column + 1 < this.wallGrid[0].length &&
      this.wallGrid[node.row][node.column + 1] !== TileType.WALL
    ) {
      let neighbour = this.nodeGrid[node.row][node.column + 1];
      if (!neighbour) {
        neighbour = this.createNode(node.row, node.column + 1, node);
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
        neighbour = this.createNode(node.row + 1, node.column, node);
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
        neighbour = this.createNode(node.row - 1, node.column, node);
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
        neighbour = this.createNode(node.row, node.column - 1, node);
        this.nodeGrid[node.row][node.column - 1] = neighbour;
      }
      neighbours.push(neighbour);
    }

    return neighbours;
  }
}
