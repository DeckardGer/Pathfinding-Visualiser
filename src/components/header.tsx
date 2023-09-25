import { Settings } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="w-full flex justify-center items-center bg-black">
      <Button variant={"ghost"} size={"icon"} className="">
        <Settings size={28} />
      </Button>
      <header className="text-3xl my-4">Pathfinding Visualiser</header>
    </div>
  );
}

export default Header;
