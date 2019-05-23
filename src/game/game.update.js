/** Game Update Module
 * Called by the game loop, this module will
 * perform any state calculations / updates
 * to properly render the next frame.
 */
export default function update(store, tFrame) {
  return store.update(state => {
    const { clickers } = state;

    const updatedClickers = clickers.map(clicker => updateClicker(clicker, tFrame));

    return {
      ...state,
      clickers: updatedClickers,
      tFrame
    };
  });
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
