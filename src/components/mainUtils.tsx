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
    <div className="w-full flex justify-center mb-6 mt-4">
      <div className="w-full max-w-sm flex justify-evenly items-center">
        <div
          className="absolute max-w-sm w-full h-14 rounded-full backdrop-blur-2xl"
          style={{
            background: "rgba(100, 100, 100, 0.1)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 80px rgba(0, 0, 0, 0.3)",
          }}
        ></div>
        <MainUtilButton content="Place Walls">
          <Brush />
        </MainUtilButton>
        <MainUtilButton content="Erase Walls">
          <Eraser />
        </MainUtilButton>
        <Button
          className="w-20 h-20 bg-[#6AF14B] rounded-full z-10"
          style={{
            outline: "1.5px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 80px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Play size={40} className="translate-x-0.5" />
          <span className="sr-only">Run Algorithm</span>
        </Button>
        <MainUtilButton content="Clear Path">
          <Undo2 />
        </MainUtilButton>
        <MainUtilButton content="Reset Board">
          <RotateCcw />
        </MainUtilButton>
      </div>
    </div>
  );
}

interface MainUtilButtonProps {
  content: string;
  children: React.ReactNode;
}

const MainUtilButton = ({ content, children }: MainUtilButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full p-0 w-10 h-10 z-10 bg-slate-900 text-slate-400"
            style={{
              outline: "1.5px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 80px rgba(0, 0, 0, 0.3)",
            }}
          >
            {children}
            <span className="sr-only">{content}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MainUtils;
