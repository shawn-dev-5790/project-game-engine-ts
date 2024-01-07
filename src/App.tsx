import "./App.css";
import { useLayoutEffect, useState } from "react";
import asset from "./engine/manager/AssetManager";
import game from "./engine/manager/GameManager";
import EventManager from "./engine/manager/EventManager";

export default function App() {
  const [updater, setUpdater] = useState(0);

  useLayoutEffect(() => {
    let timer = setTimeout(() => {}, 0);
    runEverySecond();

    EventManager.on("start", () => game.start());
    EventManager.on("watch", (delta) => setUpdater(delta));

    function runEverySecond() {
      if (asset.percentLoaded !== 100) {
        clearTimeout(timer);
        timer = setTimeout(runEverySecond, 300);
        return;
      }

      timer = setTimeout(() => {
        const canvas = document.getElementById("screen") as HTMLCanvasElement;
        game.init(canvas, 60, 20);
        clearTimeout(timer);
      }, 2000);
    }
  }, []);

  return (
    <div>
      <h1>test {updater}</h1>
      <main className="wrap">
        <canvas id="screen" width={500} height={500}></canvas>
        <div className="ui">
          <button
            onClick={() => {
              // game.start();
              // setGm(game);
              EventManager.emit("start", null);
            }}
          >
            start
          </button>
          {/* {ready ? (
            <>
              {!game.isRunning() && (
                // FIXME: 여기서는 상태값이 업데이트 되지 않아. 그래서 인풋 핸들러를 달고, 이벤트 처리를 통해서 소통하는 형식으로 하자
                <button onClick={() => game.start()}>start</button>
              )}
            </>
          ) : (
            <progress id="file" max="100" value={percentPreload} />
          )} */}
        </div>
      </main>
      {updater && <pre>{JSON.stringify(game, null, 2)}</pre>}
    </div>
  );
}
