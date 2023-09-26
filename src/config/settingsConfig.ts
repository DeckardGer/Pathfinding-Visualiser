import { Algorithm, BoardSize, Speed, ScreenSizes } from "../types/settings";

interface SettingsConfig {
  algorithm: Algorithm[];
  boardSize: BoardSize[];
  speed: Speed[];
}

export interface CurrentSetting {
  algorithm: Algorithm;
  boardSize: BoardSize;
  speed: Speed;
}

export const settingsConfig: SettingsConfig = {
  algorithm: [
    {
      displayName: "A-Star Algorithm",
      value: "A-STAR",
    },
    {
      displayName: "Dijkstra's Algorithm",
      value: "DIJKSTRA'S",
    },
  ],
  boardSize: [
    {
      displayName: "10x5",
      rows: 10,
      cols: 5,
      screenSize: ScreenSizes.SMALL,
    },
    {
      displayName: "10x10",
      rows: 10,
      cols: 10,
      screenSize: ScreenSizes.NORMAL,
    },
    {
      displayName: "20x10",
      rows: 20,
      cols: 10,
      screenSize: ScreenSizes.SMALL,
    },
    {
      displayName: "10x20",
      rows: 10,
      cols: 20,
      screenSize: ScreenSizes.LARGE,
    },
    {
      displayName: "20x20",
      rows: 20,
      cols: 20,
      screenSize: ScreenSizes.NORMAL,
    },
    {
      displayName: "30x20",
      rows: 30,
      cols: 20,
      screenSize: ScreenSizes.SMALL,
    },
    {
      displayName: "20x40",
      rows: 20,
      cols: 40,
      screenSize: ScreenSizes.LARGE,
    },
    {
      displayName: "30x30",
      rows: 30,
      cols: 30,
      screenSize: ScreenSizes.NORMAL,
    },
    {
      displayName: "30x60",
      rows: 30,
      cols: 60,
      screenSize: ScreenSizes.LARGE,
    },
    {
      displayName: "40x40",
      rows: 40,
      cols: 40,
      screenSize: ScreenSizes.LARGE,
    },
    {
      displayName: "40x80",
      rows: 40,
      cols: 80,
      screenSize: ScreenSizes.LARGE,
    },
    {
      displayName: "50x50",
      rows: 50,
      cols: 50,
      screenSize: ScreenSizes.LARGE,
    },
  ],
  speed: [
    {
      displayName: "Slow",
      value: "SLOW",
    },
    {
      displayName: "Normal",
      value: "NORMAL",
    },
    {
      displayName: "Fast",
      value: "FAST",
    },
  ],
};
