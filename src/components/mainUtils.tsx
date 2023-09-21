import { PenTool, Eraser, Play, Undo2, RotateCcw } from "lucide-react";

// TODO: Change background colour of buttons

function MainUtils() {
  return (
    <div className="mt-5">
      {/* <div className="w-16 h-16 bg-green-500 rounded-full"></div> */}
      <div className="flex justify-between items-center w-80 h-10 bg-slate-300 rounded-full">
        <div className="">
          <PenTool />
        </div>
        <div className="">
          <Eraser />
        </div>
        <div className="bg-green-500 p-10 rounded-full"></div>
        <div className="">
          <Undo2 />
        </div>
        <div className="">
          <RotateCcw />
        </div>
      </div>
    </div>
  );
}

export default MainUtils;
