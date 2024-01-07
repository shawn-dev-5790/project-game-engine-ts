import "./App.css";
import { useLayoutEffect, useState } from "react";
import game from "./engine/manager/GameManager";
import EventManager from "./engine/manager/EventManager";

export default function App() {
  const [preloadPercent, setPreloadPercent] = useState(0);
  const [updater, setUpdater] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useLayoutEffect(() => {
    EventManager.on("preload", setPreloadPercent);
    EventManager.on("ready", () => {
      if (game.isRunning) return;
      const canvas = document.getElementById("screen") as HTMLCanvasElement;
      const fps = 60;
      const speed = 20;
      game.init(canvas, fps, speed);
      setIsReady(game.isReady);
    });
    EventManager.on("start", () => {
      game.start();
      setIsRunning(game.isRunning);
    });
    EventManager.on("stop", () => {
      game.stop();
      setIsRunning(game.isRunning);
    });
    EventManager.on("watch", setUpdater);
  }, []);

  return (
    <div>
      <h1>test {updater}</h1>
      <div>
        <p>preload assets: {preloadPercent}%</p>
        <p>game ready: {String(isReady)}</p>
        <p>game running: {String(isRunning)}</p>
        <p>gameloop updater: {updater}</p>
      </div>
      <main className="wrap">
        <canvas id="screen" width={500} height={500}></canvas>
        <div className="ui">
          {isRunning ? (
            <button onClick={() => EventManager.emit("stop", null)}>
              stop
            </button>
          ) : (
            <>
              <button onClick={() => EventManager.emit("ready", null)}>
                init
              </button>
              <button onClick={() => EventManager.emit("start", null)}>
                start
              </button>
            </>
          )}
        </div>
      </main>
      {updater && <pre>{JSON.stringify(game, null, 2)}</pre>}
    </div>
  );
}
