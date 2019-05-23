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

      console.log(state);

      // Set clicked frame
      const clickerState = state.clickers[state.clickersMap[clicker.id]];
      clickerState.lastClickedFrame = state.tFrame;

      return state;
    });

  const handleBuy = clicker =>
    update(state => {
      const { canBuy } = clicker;
      // Check if can buy
      if (!canBuy) {
        return state;
      }

      // Set clicked frame
      const clickerState = state.clickers[state.clickersMap[clicker.id]];
      clickerState.lastBuyFrame = state.tFrame;

      return state;
    });

  return {
    subscribe,
    set,
    update,
    handleBuy,
    handleClick,
    reset: () => set(initState)
  };
}

export function Game() {
  const gameStore = createGameStore();

  const looper = new Loop(gameStore, gameUpdate);

  const addClicker = clickerFn =>
    gameStore.update(state => {
      const newClicker = clickerFn({ createdAtFrame: state.tFrame });
      return {
        ...state,
        clickers: [...state.clickers, newClicker],
        clickersMap: {
          ...state.clickersMap,
          [newClicker.id]: state.clickers.length
        }
      };
    });

  return {
    looper,
    addClicker,
    gameStore
  };
}
