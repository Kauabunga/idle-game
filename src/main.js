import App from "./App.svelte";
import { Game } from "./game";
import { area01Level01, area01Level04, area01Level03, area01Level02 } from "./game/game.clickers";

const game = new Game();

const { gameStore } = game;

game.addClicker(area01Level01);
game.addClicker(area01Level02);
game.addClicker(area01Level03);
game.addClicker(area01Level04);

const app = new App({
  target: document.body,
  props: {
    name: "world",
    gameStore
  }
});

export default app;
