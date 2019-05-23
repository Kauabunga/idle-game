export default function update(store, tFrame) {
  return store.update(state => {
    const { clickers, config, resources, tFrame: previousTFrame } = state;

    const updateResources = (r, count) => {
      Object.keys(r).forEach(resourceKey => {
        resources[resourceKey] = (resources[resourceKey] || 0) + r[resourceKey] * (count || 1);
      });
    };

    let nextWorkers = {};
    let nextClickers = {};
    const diff = tFrame - previousTFrame;
    if (diff) {
      nextWorkers = updateWorkers(diff, config, resources);
      nextClickers = clickers.map(clicker => updateClicker(clicker, tFrame, config, resources, updateResources));
    }

    return {
      ...state,
      resources: {
        ...state.resources,
        ...nextWorkers
      },
      clickers: nextClickers,
      tFrame
    };
  });
}

export function updateWorkers(diff, config, resources) {
  const workers = resources.workers || 0;
  const { workerLoadTime, workerLoadMultiplier } = config;

  const nextWorkers = workers + workerLoadMultiplier * (diff / workerLoadTime);

  return {
    workersFrameProgress: nextWorkers % 1,
    workers: nextWorkers
  };
}

export function updateClicker(clicker, tFrame, config, resources, updateResources) {
  const { id, loadTime, canClick, lastClickedFrame, cost, produce } = clicker;

  // AUTO
  // const nextAutoCount = (tFrame - createdAtFrame) / loadTime;

  // MANUAL
  const clickFrameProgress = (lastClickedFrame && (tFrame - lastClickedFrame) / loadTime) || 0;
  const nextCanClickTime = clickFrameProgress > 1;
  const nextClickProgress = (!nextCanClickTime && clickFrameProgress % 1) || 0;
  const nextCanClick = !lastClickedFrame || nextCanClickTime;
  let nextLastClickedFrame = lastClickedFrame;

  // CAN BUY
  const nextCanBuyLimits = Object.keys(cost).filter(costKey => resources[costKey] < cost[costKey]);
  const nextCanBuy = nextCanBuyLimits.length === 0;

  // UPDATE CLICK RESOURCES
  if (lastClickedFrame && !canClick && nextCanClickTime) {
    // Produce resources
    const count = resources[id] || 0;
    updateResources(produce, count);

    // Reset click
    nextLastClickedFrame = null;
  }

  return {
    ...clicker,

    lastClickedFrame: nextLastClickedFrame,
    canClick: nextCanClick,
    clickProgress: nextClickProgress,

    canBuy: nextCanBuy
  };
}
