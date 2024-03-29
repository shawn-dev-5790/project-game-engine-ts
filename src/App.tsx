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
      const fps = 30;
      const speed = 30;
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
    EventManager.on("pointer", (e) => {
      console.log({
        x: e.screenX,
        y: e.screenY,
      });
    });
  }, []);

  return (
    <div>
      <h1>test {updater}</h1>
      <div>
        <p>preload assets: {preloadPercent}%</p>
        <p>game ready: {String(isReady)}</p>
        <p>game running: {String(isRunning)}</p>
        <p>gameloop updater: {updater}</p>
        <p>
          performance checker : {sessionStorage.getItem("performanceChecker")}
        </p>
      </div>
      <main className="wrap" onClick={(e) => EventManager.emit("pointer", e)}>
        <canvas id="screen" width={500} height={500}></canvas>
        <div className="ui">
          {!isRunning && preloadPercent !== 100 && (
            <button onClick={() => EventManager.emit("ready", null)}>
              init
            </button>
          )}
          {!isRunning && preloadPercent === 100 && (
            <button onClick={() => EventManager.emit("start", null)}>
              start
            </button>
          )}
          {isRunning && (
            <button onClick={() => EventManager.emit("stop", null)}>
              stop
            </button>
          )}
        </div>
      </main>
      {updater && <pre>{JSON.stringify(game, null, 2)}</pre>}
    </div>
  );
}
