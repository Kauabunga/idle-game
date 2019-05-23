export default function update(store, tFrame) {
  return store.update(state => {
    const { clickers, config, resources, multiplier, tFrame: previousTFrame } = state;

    const updateResources = (r, count) => {
      Object.keys(r).forEach(resourceKey => {
        resources[resourceKey] = (resources[resourceKey] || 0) + r[resourceKey] * (count || 1);
      });
    };

    let nextWorkers = {};
    let nextClickers = {};
    const diff = tFrame - previousTFrame;
    if (diff) {
      nextWorkers = updateWorkers(diff, config, multiplier, resources);
      nextClickers = clickers.map(clicker =>
        updateClicker(clicker, tFrame, diff, multiplier, resources, updateResources)
      );
    }

    return {
      ...state,

      resources: {
        ...state.resources,
        ...nextWorkers
      },

      clickers: nextClickers,

      timePretty: `${Math.floor(tFrame / 1000)} seconds`,
      tFrame,
      diff
    };
  });
}

export function updateWorkers(diff, config, multiplier, resources) {
  const workers = resources.workers || 0;
  const { workerLoadTime } = config;
  const { workers: workersMultiplier } = multiplier;

  const nextWorkers = workers + workersMultiplier * (diff / workerLoadTime);

  return { workers: nextWorkers };
}

export function updateClicker(clicker, tFrame, diff, multiplier, resources, updateResources) {
  const { id, loadTime, canClick, lastClickedFrame, cost, produce } = clicker;
  const currentMultiplier = multiplier[id] || 1;
  const currentCount = (resources[id] || 0) * currentMultiplier;

  // CAN BUY
  const nextCanBuyLimits = Object.keys(cost).filter(costKey => resources[costKey] < cost[costKey]);
  const nextCanBuy = nextCanBuyLimits.length === 0;

  // TODO: CAN BUY MAX

  const base = { canBuy: nextCanBuy };

  if (currentMultiplier > 1) {
    // AUTO
    const nextAutoCount = (diff / loadTime) * currentCount;
    const nextClickProgress = ((tFrame / loadTime) * currentMultiplier) % 1;
    updateResources(produce, nextAutoCount);

    return {
      ...clicker,
      ...base,

      lastClickedFrame: null,
      canClick: false,
      clickProgress: nextClickProgress
    };
  }

  // MANUAL
  const clickFrameProgress = (lastClickedFrame && (tFrame - lastClickedFrame) / loadTime) || 0;
  const nextCanClickTime = clickFrameProgress > 1;
  const nextClickProgress = (!nextCanClickTime && clickFrameProgress % 1) || 0;
  const nextCanClick = !lastClickedFrame || nextCanClickTime;
  let nextLastClickedFrame = lastClickedFrame;

  // UPDATE CLICK RESOURCES
  if (lastClickedFrame && !canClick && nextCanClickTime) {
    // Produce resources
    updateResources(produce, currentCount);

    // Reset click
    nextLastClickedFrame = null;
  }

  return {
    ...clicker,
    ...base,

    lastClickedFrame: nextLastClickedFrame,
    canClick: nextCanClick,
    clickProgress: nextClickProgress
  };
}
