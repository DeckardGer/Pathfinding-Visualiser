import Grid from "./components/grid";
import MainUtils from "./components/mainUtils";
import SideUtils from "./components/sideUtils";

// TODO: Add side bar
// TODO: Customise header
// TODO: Add responsive grid
// TODO: Add main utilities bar

function App() {
  return (
    <div className="flex">
      <SideUtils />
      <div className="flex flex-col grow items-center h-screen">
        <header className="text-3xl my-2">Pathfinding Visualiser</header>
        <Grid gridSize={10} />
        <MainUtils />
      </div>
    </div>
  );
}

export default App;
