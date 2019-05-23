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

function updateClicker(clicker, tFrame) {
  const { loadTime, createdAtFrame, lastClickedFrame, manualCount } = clicker;

  const nextAutoCount = (tFrame - createdAtFrame) / loadTime;
  const nextManualCount = manualCount || 0;
  const count = nextAutoCount + nextManualCount;

  // Compute can click state for displaying disabled state
  const canClick = (tFrame - (lastClickedFrame || 0)) / loadTime > 1;

  // Compute can buy state

  const canBuy = true;

  return {
    ...clicker,
    count,
    canClick,
    canBuy,
    autoCount: nextAutoCount,
    manualCount: nextManualCount
  };
}
