import { Brush, Eraser, Play, Undo2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// TODO: Change background colour of buttons

function MainUtils() {
  return (
    <div className="w-screen h-14 max-w-sm mb-10 mt-4 flex justify-evenly items-center bg-card rounded-full">
      {/* <div className="flex justify-center items-center w-full max-w-md mb-10 mt-4 bg-slate-400 rounded-full px-2">
        <div className="w-full max-w-md h-24 bg-white"></div>
      </div> */}
      {/* <div className="w-screen h-1 max-w-sm mb-10 mt-4 flex justify-evenly items-center bg-slate-400 rounded-full"></div> */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full p-0 w-10 h-10">
              <Brush />
              <span className="sr-only">Place Walls</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Place Walls</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full p-0 w-10 h-10">
              <Eraser />
              <span className="sr-only">Erase Walls</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Erase Walls</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button className="w-20 h-20 bg-green-500 rounded-full">
        <Play size={40} className="translate-x-0.5" />
        <span className="sr-only">Run Algorithm</span>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full p-0 w-10 h-10">
              <Undo2 />
              <span className="sr-only">Clear Path</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Path</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full p-0 w-10 h-10">
              <RotateCcw />
              <span className="sr-only">Reset Grid</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Grid</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default MainUtils;
