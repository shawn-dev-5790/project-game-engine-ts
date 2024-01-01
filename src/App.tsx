import { useLayoutEffect, useState } from "react";
import asset from "./engine/manager/AssetManager";
import game from "./engine/manager/GameManager";

export default function App() {
  const [percentPreload, setPercentPreload] = useState<number>(0);

  useLayoutEffect(() => {
    let timer = setTimeout(() => {}, 0);

    function runEverySecond() {
      setPercentPreload(asset.percentLoaded);
      console.log(asset.percentLoaded);

      if (asset.percentLoaded !== 100) {
        clearTimeout(timer);
        timer = setTimeout(runEverySecond, 300);
        return;
      }

      game.init(document.getElementById("screen") as HTMLCanvasElement);

      clearTimeout(timer);

      console.log(game, asset);
    }
    runEverySecond();
  }, []);

  return (
    <div>
      <h1>test</h1>
      <canvas id="screen" width={500} height={500}></canvas>
      <progress id="file" max="100" value={percentPreload} />
      <button onClick={() => game.start()}>start</button>
    </div>
  );
}
