import { useLayoutEffect } from "react";
import GameLoop from "./engine/GameLoop";

export default function App() {
  useLayoutEffect(() => {
    const canvas = document.getElementById("screen") as HTMLCanvasElement;
    const game = new GameLoop(canvas);

    game.start();
  }, []);
  return (
    <div>
      <h1>test</h1>
      <canvas id="screen" width={500} height={500}></canvas>
    </div>
  );
}
