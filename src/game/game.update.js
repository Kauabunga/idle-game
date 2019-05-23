export default function update(store, tFrame) {
  return store.update(state => {
    const { clickers, workers, config } = state;
    const { workerLoadTime } = config;

    const nextWorkers = updateWorkers(workers, tFrame, workerLoadTime);
    const nextClickers = clickers.map(clicker => updateClicker(clicker, tFrame));

    return {
      ...state,
      workers: nextWorkers,
      clickers: nextClickers,
      tFrame
    };
  });
}

export function updateWorkers(workers, tFrame, workerLoadTime) {
  return workers || 0;
}

export function updateClicker(clicker, tFrame) {
  const { loadTime, createdAtFrame, canClick, lastClickedFrame, manualCount } = clicker;

  const nextAutoCount = (tFrame - createdAtFrame) / loadTime;

  // Compute can click state for displaying disabled state
  const clickFrameProgress = (lastClickedFrame && (tFrame - lastClickedFrame) / loadTime) || 0;

  const nextCanClickTime = clickFrameProgress > 1;
  const nextClickProgress = (!nextCanClickTime && clickFrameProgress % 1) || 0;
  let nextManualCount = manualCount || 0;

  let nextLastClickedFrame = lastClickedFrame;
  if (lastClickedFrame && !canClick && nextCanClickTime) {
    nextManualCount += 1;
    nextLastClickedFrame = null;
  }

  // const canClick = canClickTime && !auto
  const nextCanClick = !lastClickedFrame || nextCanClickTime;

  // Compute can buy state
  const nextCanBuy = true;

  const count = nextManualCount;
  return {
    ...clicker,
    count,
    autoCount: nextAutoCount,
    manualCount: nextManualCount,

    lastClickedFrame: nextLastClickedFrame,
    canClick: nextCanClick,
    clickProgress: nextClickProgress,

    canBuy: nextCanBuy
  };
}
