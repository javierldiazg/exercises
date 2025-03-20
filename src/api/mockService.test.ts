import { getNormalRange, getFixedRange } from "@/api/mockService";

describe("Mock Service API", () => {
  it("getNormalRange returns correct data", async () => {
    const data = await getNormalRange();
    expect(data).toEqual({ min: 1, max: 100 });
  });

  it("getFixedRange returns correct data", async () => {
    const data = await getFixedRange();
    expect(data).toEqual({
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });
  });
});
