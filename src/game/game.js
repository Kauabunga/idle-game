import { writable } from "svelte/store";

import Loop from "./game.loop";
import gameUpdate from "./game.update";

function createGameStore() {
  const initState = { tFrame: 0, clickers: [] };
  const { subscribe, set, update } = writable({ tFrame: 0, clickers: [] });

  const handleClick = clicker =>
    update(state => {
      const { canClick } = clicker;

      // Check if can be clicked
      if (!canClick) {
        return state;
      }

      // Check if can click (has resources)

      // Set clicked frame
      const clickerState = state.clickers[state.clickersMap[clicker.id]];
      clickerState.lastClickedFrame = state.tFrame;

      console.log("handleClick", { clicker, clickerState });

      return state;
    });

  return {
    subscribe,
    set,
    update,
    handleClick,
    reset: () => set(initState)
  };
}

export function Game() {
  const gameStore = createGameStore();

  const looper = new Loop(gameStore, gameUpdate);

  const addClicker = clicker =>
    gameStore.update(state => ({
      ...state,
      clickers: [...state.clickers, { ...clicker, createdAt: Date.now(), createdAtFrame: state.tFrame }],
      clickersMap: {
        [clicker.id]: state.clickers.length
      }
    }));

  return {
    looper,
    addClicker,
    gameStore
  };
}
