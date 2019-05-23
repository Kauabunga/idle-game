import App from "./App.svelte";
import { Game } from "./game";
import { area01Level01 } from "./game/game.clickers";

const game = new Game();

const { gameStore } = game;

game.addClicker(area01Level01());

const app = new App({
  target: document.body,
  props: {
    name: "world",
    gameStore
  }
});

export default app;
