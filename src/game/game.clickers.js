export const area01Level01 = () => ({
  id: "area01Level01",
  name: "First one",
  loadTime: 2000,
  cost: {
    workers: 10
  }
});

export const area01Level02 = () => ({
  id: "area01Level02",
  name: "Second one",
  loadTime: 3000,
  cost: {
    workers: 10,
    area01Level01: 10
  }
});

export const area01Level03 = () => ({
  id: "area01Level03",
  name: "Third one",
  loadTime: 5000,
  cost: {
    workers: 10,
    area01Level02: 20
  }
});

export const area01Level04 = () => ({
  id: "area01Level04",
  name: "Fourth one",
  loadTime: 7500,
  cost: {
    workers: 10,
    area01Level02: 50
  }
});
