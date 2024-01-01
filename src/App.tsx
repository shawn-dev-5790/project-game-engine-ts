import "./App.css";
import { useLayoutEffect, useState } from "react";
import asset from "./engine/manager/AssetManager";
import game from "./engine/manager/GameManager";

export default function App() {
  const [percentPreload, setPercentPreload] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

  useLayoutEffect(() => {
    let timer = setTimeout(() => {}, 0);
    runEverySecond();

    function runEverySecond() {
      setPercentPreload(asset.percentLoaded);
      console.log(asset.percentLoaded);

      if (asset.percentLoaded !== 100) {
        clearTimeout(timer);
        timer = setTimeout(runEverySecond, 300);
        return;
      }

      timer = setTimeout(() => {
        setReady(true);
        game.init(document.getElementById("screen") as HTMLCanvasElement);
        console.log(game, asset);
        clearTimeout(timer);
      }, 2000);
    }
  }, []);

  return (
    <div>
      <h1>test</h1>
      <main className="wrap">
        <canvas id="screen" width={500} height={500}></canvas>
        <div className="ui">
          {ready ? (
            <>
              {!game.isRunning() && (
                // FIXME: 여기서는 상태값이 업데이트 되지 않아. 그래서 인풋 핸들러를 달고, 이벤트 처리를 통해서 소통하는 형식으로 하자
                <button onClick={() => game.start()}>start</button>
              )}
            </>
          ) : (
            <progress id="file" max="100" value={percentPreload} />
          )}
        </div>
      </main>
    </div>
  );
}
