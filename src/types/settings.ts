export interface Algorithm {
  displayName: string;
  value: string;
}

export interface BoardSize {
  displayName: string;
  rows: number;
  cols: number;
  screenSize: ScreenSizes;
}

export interface Speed {
  displayName: string;
  value: string;
}

export enum ScreenSizes {
  SMALL,
  NORMAL,
  LARGE,
}

export enum TileType {
  EMPTY,
  WALL,
  START,
  END,
  OPEN,
  CLOSED,
  PATH,
}

export enum RecursiveDivisionBias {
  NONE,
  VERTICAL,
  HORIZONTAL,
}

export enum AlgorithmSpeed {
  SLOW = 100,
  NORMAL = 50,
  FAST = 10,
  INSTANT = 0,
}

export type GridPos = {
  row: number;
  column: number;
};

/*
 Global & Types
 - Algorithm: Display, Actual
    - A-Star Algorithm, A-STAR
    - Dijkstra's Algorithm, DIJKSTRA'S
 - Board Size: Display, Rows, Cols, screenSize, padding?
    - 10x5: 10, 5, small
    - 10x10: 10, 10, normal
    - 20x10: 20, 10, small
    - 10x20: 10, 20, large
    - 20x20: 20, 20, normal
    - 30x20: 30, 20, small
    - 20x40: 20, 40, large
    - 30x30: 30, 30, normal
    - 30x60: 30, 60, large
    - 40x40: 40, 40, large
    - 40x80: 40, 80, large
    - 50x50: 50, 50, large
 - Speed: Display, Actual, sleepTime?
    - Slow
    - Normal
    - Fast

 Types
 - Mazes & Patterns: Display, Actual, Algorithm?
    - Recursive Division Maze, RECURSIVE_DIVISION
    - Binary Tree Maze, BINARY_TREE
    - Random, RANDOM
 - Key: Look through all possible block tile states: Colour, Description
    - White, Empty
    - Black, Wall
    - Red, Start
    - Blue, End
    - ...
 
 Non-Global
 - Current Mode
    - PLACE_WALL
    - ERASE_WALL
 - Weights
    - boolean
*/
