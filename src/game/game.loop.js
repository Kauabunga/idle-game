/** Game Loop Module
 * This module contains the game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */

export default function gameLoop(gameStore, update) {
  const loop = this;
  // Initialize timer variables so we can calculate FPS
  let before = window.performance.now();

  const fps = 60;
  const fpsInterval = 1000 / fps;
  // Set up an object to contain our alternating FPS calculations
  const cycles = {
    new: {
      frameCount: 0,
      startTime: before,
      sinceStart: 0
    },
    old: {
      frameCount: 0,
      startTime: before,
      sineStart: 0
    }
  };
  // Alternating Frame Rate vars
  const resetInterval = 5;
  let resetState = "new";

  loop.fps = 0;

  // Start off main loop
  loop.main = mainLoop;
  loop.main();

  return loop;

  // Main game rendering loop
  function mainLoop(tFrame) {
    // Request a new Animation Frame
    // setting to `stopLoop` so animation can be stopped via
    // `window.cancelAnimationFrame( loop.stopLoop )`
    loop.stopLoop = window.requestAnimationFrame(loop.main);

    // How long ago since last loop?
    const now = tFrame;
    const elapsed = now - before;
    let activeCycle;
    let targetResetInterval;

    // If it's been at least our desired interval, render
    if (elapsed > fpsInterval) {
      // Set before = now for next frame, also adjust for
      // specified fpsInterval not being a multiple of rAF's interval (16.7ms)
      // ( http://stackoverflow.com/a/19772220 )
      before = now - (elapsed % fpsInterval);

      // Increment the vals for both the active and the alternate FPS calculations
      for (var calc in cycles) {
        ++cycles[calc].frameCount;
        cycles[calc].sinceStart = now - cycles[calc].startTime;
      }

      // Choose the correct FPS calculation, then update the exposed fps value
      activeCycle = cycles[resetState];
      loop.fps = Math.round((1000 / (activeCycle.sinceStart / activeCycle.frameCount)) * 100) / 100;

      // If our frame counts are equal....
      targetResetInterval =
        cycles.new.frameCount === cycles.old.frameCount
          ? resetInterval * fps // Wait our interval
          : resetInterval * 2 * fps; // Wait double our interval

      // If the active calculation goes over our specified interval,
      // reset it to 0 and flag our alternate calculation to be active
      // for the next series of animations.
      if (activeCycle.frameCount > targetResetInterval) {
        cycles[resetState].frameCount = 0;
        cycles[resetState].startTime = now;
        cycles[resetState].sinceStart = 0;

        resetState = resetState === "new" ? "old" : "new";
      }

      // Update the game state
      // scope.state = scope.update(now);

      update(gameStore, tFrame);

      // Render the next frame
      // scope.render();
    }
  }
}
