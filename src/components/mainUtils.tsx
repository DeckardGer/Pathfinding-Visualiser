import { Brush, Eraser, Play, Undo2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

// TODO: Change background colour of buttons

function MainUtils() {
  return (
    <div className="w-96 h-14 mb-10 mt-4 flex justify-evenly items-center bg-slate-400 rounded-full">
      <Button className="rounded-full bg-slate-100 text-slate-800 p-0 w-10 h-10">
        <Brush />
      </Button>
      <Button className="rounded-full bg-slate-100 text-slate-800 p-0 w-10 h-10">
        <Eraser />
      </Button>
      <Button className="w-20 h-20 bg-green-500 text-slate-800 rounded-full">
        <Play size={40} className="translate-x-0.5" />
      </Button>
      <Button className="rounded-full bg-slate-100 text-slate-800 p-0 w-10 h-10">
        <Undo2 />
      </Button>
      <Button className="rounded-full bg-slate-100 text-slate-800 p-0 w-10 h-10">
        <RotateCcw />
      </Button>
    </div>
  );
}

export default MainUtils;
