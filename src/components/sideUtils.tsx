import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { settingsConfig } from "../config/settingsConfig";

function SideUtils() {
  return (
    <>
      <div className="absolute top-3 left-3">
        <Button variant={"ghost"} size={"icon"}>
          <Settings size={28} />
        </Button>
      </div>
      <div className="flex flex-col w-96 h-screen bg-black flex-none items-start px-2">
        <header className="flex justify-center w-full">Options</header>
        <div className="grid grid-cols-3 mt-4 items-center gap-4 w-full">
          <Label htmlFor="algorithm" className="text-right col-span-1">
            Algorithm
          </Label>
          <Select>
            <SelectTrigger id="algorithm" className="col-span-2">
              <SelectValue placeholder="Select an algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pathfinding Algorithms</SelectLabel>
                <SelectItem value="A-Star">A* Algorithm</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 mt-4 items-center gap-4 w-full">
          <Label htmlFor="grid-size" className="text-right col-span-1">
            Grid Size
          </Label>
          <Select>
            <SelectTrigger id="grid-size" className="col-span-2">
              <SelectValue placeholder="Select a grid size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grid Sizes</SelectLabel>
                <SelectItem value="grid-10">10x10</SelectItem>
                <SelectItem value="grid-20">20x20</SelectItem>
                <SelectItem value="grid-50">50x50</SelectItem>
                <SelectItem value="grid-100">100x100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 mt-4 items-center gap-4 w-full">
          <Label htmlFor="speed" className="text-right col-span-1">
            Speed
          </Label>
          <Select>
            <SelectTrigger id="speed" className="col-span-2">
              <SelectValue placeholder="Select a speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pathfinding Speeds</SelectLabel>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export default SideUtils;
