import { writable } from 'svelte/store';

import Loop from './game.loop';
import gameUpdate from './game.update';
import { initState } from './game.init';
import { getClickAction, getBuyAction, getMultiplierAction } from './game.actions';

function createGameStore() {
  const { subscribe, set, update } = writable(initState);

  const handleClick = getClickAction(update);
  const handleBuy = getBuyAction(update);
  const handleMultiplier = getMultiplierAction(update);

  return {
    subscribe,
    set,
    update,
    handleBuy,
    handleClick,
    handleMultiplier,
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
