import { updateClicker } from './game.update';
import { area01Level01 } from './game.clickers';

// const lastClickedFrame = 1000;
// const updateClickerBefore = clicker => updateClicker(clicker, tFrame, config, resources, updateResources);

it('BASELINE', () => {
  const clicker = area01Level01({ createdAtFrame: 0 });
  const nextClicker = updateClicker(clicker, 0);

  expect(nextClicker.canClick).toBeTruthy();
  expect(nextClicker).toMatchSnapshot({ createdAt: expect.any(Number) });
});

describe('MANUAL', () => {
  describe('BEFORE click load', () => {
    it('Should not allow a click to be clicked if it has just been clicked', () => {
      const clicker = area01Level01({ createdAtFrame: 0, lastClickedFrame: 1000 });
      const nextClicker = updateClicker(clicker, clicker.loadTime + 999);
      expect(nextClicker.canClick).toBeFalsy();
    });
    it('Should allow another click once the load time passes', () => {
      const clicker = area01Level01({ createdAtFrame: 0, lastClickedFrame: 1000 });
      const nextClicker = updateClicker(clicker, clicker.loadTime + 1001);
      expect(nextClicker.canClick).toBeTruthy();
    });
  });

  describe('DURING click load', () => {
    it('Should update the progress after it has been clicked but not finished', () => {
      const clicker = area01Level01({ createdAtFrame: 0, lastClickedFrame: 1000 });
      const nextClicker = updateClicker(clicker, clicker.loadTime + 999);
      expect(nextClicker.clickProgress).toBeTruthy();
    });
  });

  describe('AFTER click load', () => {
    it('Should update the manual count after the click load has finished', () => {
      const clicker = area01Level01({ createdAtFrame: 0, lastClickedFrame: 1000 });
      const nextClicker = updateClicker(clicker, clicker.loadTime + 1001);
      expect(nextClicker.manualCount).toBeGreaterThan(clicker.manualCount);
    });
    it('Should reset progress after the click load has finished', () => {
      const clicker = area01Level01({ createdAtFrame: 0, lastClickedFrame: 1000 });
      const nextClicker = updateClicker(clicker, clicker.loadTime + 1001);
      expect(nextClicker.clickProgress).toBeFalsy();
    });
  });
});

// TODO: Auto
it('Should not allow a click to be clicked if it is in auto', () => {});
it('Should not allow a click to transition from manual to auto', () => {});
it('Should not allow a click to transition from different auto levels', () => {});
