const baseClicker = ({ lastClickedFrame, createdAtFrame }) => ({
  count: 0,
  autoCount: 0,
  manualCount: 0,

  clickProgress: 0,

  lastClickedFrame: lastClickedFrame || null,
  createdAtFrame,
  createdAt: Date.now()
});

export const area01Level01 = options => ({
  ...baseClicker(options),
  id: "area01Level01",
  name: "First one",
  loadTime: 2000,
  cost: {
    workers: 10
  }
});

export const area01Level02 = options => ({
  ...baseClicker(options),
  id: "area01Level02",
  name: "Second one",
  loadTime: 3000,
  cost: {
    workers: 10,
    area01Level01: 10
  }
});

export const area01Level03 = options => ({
  ...baseClicker(options),
  id: "area01Level03",
  name: "Third one",
  loadTime: 5000,
  cost: {
    workers: 10,
    area01Level02: 20
  }
});

export const area01Level04 = options => ({
  ...baseClicker(options),
  id: "area01Level04",
  name: "Fourth one",
  loadTime: 7500,
  cost: {
    workers: 10,
    area01Level02: 50
  }
});
