import Header from "./components/header";
import Grid from "./components/grid";
import MainUtils from "./components/mainUtils";
import SideUtils from "./components/sideUtils";
import { settingsConfig, CurrentSetting } from "./config/settingsConfig";

// TODO: Add side bar
// TODO: Customise header
// TODO: Add responsive grid
// TODO: Add main utilities bar

function App() {
  const initialSettings: CurrentSetting = {
    algorithm: settingsConfig.algorithm[0],
    boardSize: settingsConfig.boardSize[0],
    speed: settingsConfig.speed[0],
  };

  return (
    <div className="flex">
      {/* <SideUtils /> */}
      <div className="flex flex-col grow items-center h-screen">
        <Header />
        <Grid gridRows={40} gridCols={30} />
        <MainUtils />
      </div>
    </div>
  );
}

export default App;
