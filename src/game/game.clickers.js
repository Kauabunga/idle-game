const baseClicker = ({ lastClickedFrame, createdAtFrame }) => ({
  count: 0,
  autoCount: 0,
  manualCount: 0,

  clickProgress: 0,

  lastClickedFrame: lastClickedFrame || null,
  createdAtFrame,
  createdAt: Date.now()
});

const WORKERS = 'workers';

export const AREA_01_RESOURCE = 'area01';
export const AREA_01_LEVEL_01 = 'area01Level01';
export const AREA_01_LEVEL_02 = 'area01Level02';
export const AREA_01_LEVEL_03 = 'area01Level03';
export const AREA_01_LEVEL_04 = 'area01Level04';

export const area01Level01 = options => ({
  ...baseClicker(options),
  id: AREA_01_LEVEL_01,
  name: 'Lumberjack',
  loadTime: 2000,

  cost: {
    [WORKERS]: 1
  },
  produce: {
    [AREA_01_RESOURCE]: 1
  }
});

export const area01Level02 = options => ({
  ...baseClicker(options),
  id: AREA_01_LEVEL_02,
  name: 'Chainsaw',
  loadTime: 3000,

  cost: {
    [WORKERS]: 2,
    [AREA_01_LEVEL_01]: 2
  },
  produce: {
    [AREA_01_LEVEL_01]: 1
  }
});

export const area01Level03 = options => ({
  ...baseClicker(options),
  id: AREA_01_LEVEL_03,
  name: 'Third one',
  loadTime: 5000,

  cost: {
    [WORKERS]: 5,
    [AREA_01_LEVEL_02]: 5
  },
  produce: {
    [AREA_01_LEVEL_02]: 1
  }
});

export const area01Level04 = options => ({
  ...baseClicker(options),
  id: AREA_01_LEVEL_04,
  name: 'Fourth one',
  loadTime: 7500,

  cost: {
    [WORKERS]: 10,
    [AREA_01_LEVEL_03]: 10
  },
  produce: {
    [AREA_01_LEVEL_03]: 1
  }
});
