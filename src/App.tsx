import Header from "./components/header";
import Grid from "./components/grid";
import MainUtils from "./components/mainUtils";
import SideUtils from "./components/sideUtils";
import { settingsConfig, CurrentSetting } from "./config/settingsConfig";
import { useState } from "react";
import { Columns } from "lucide-react";

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

  const [rows, setRows] = useState(21);
  const [columns, setColumns] = useState(21);

  return (
    <div className="flex">
      {/* <SideUtils /> */}
      <div className="flex flex-col grow items-center h-screen">
        <Header />
        <Grid gridRows={rows} gridCols={columns} />
        <MainUtils />
        <button
          className="w-20 h-20 bg-black"
          onClick={() => {
            setRows(51);
            setColumns(51);
          }}
        ></button>
      </div>
    </div>
  );
}

export default App;
