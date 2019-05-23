export const getClickAction = update => clicker =>
  update(state => {
    const { canClick } = clicker;
    // Check if can be clicked
    if (!canClick) {
      return state;
    }

    // Set clicked frame
    const clickerState = state.clickers[state.clickersMap[clicker.id]];
    clickerState.lastClickedFrame = state.tFrame;

    return state;
  });

export const getBuyAction = update => clicker =>
  update(state => {
    const { clickers, resources, tFrame, clickersMap } = state;
    const { canBuy, cost } = clicker;
    // Check if can buy
    if (!canBuy) {
      return state;
    }

    const clickerState = clickers[clickersMap[clicker.id]];
    clickerState.lastBuyFrame = tFrame;

    // Reduce resources
    Object.keys(cost).forEach(resourceCost => {
      resources[resourceCost] = (resources[resourceCost] || 0) - cost[resourceCost];
    });

    // increase count
    const buyCount = 1 * 1;
    resources[clicker.id] = (resources[clicker.id] || 0) + buyCount;

    return state;
  });
