import { Game } from "./index";
import { area01Level01 } from "./game.clickers";

it("Should create a new game", async () => {
  const game = new Game();
  expect(game).toBeTruthy();

  game.addClicker(area01Level01);

  await wait(0);
});

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 0));
}
