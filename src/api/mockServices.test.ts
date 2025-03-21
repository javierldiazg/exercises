import { getNormalRangeMock, getFixedRangeMock } from "@/api/mockServices";

describe("Mock Service API", () => {
  it("getNormalRangeMock returns correct data", async () => {
    const data = await getNormalRangeMock();
    expect(data).toEqual({ min: 1, max: 100 });
  });

  it("getFixedRangeMock returns correct data", async () => {
    const data = await getFixedRangeMock();
    expect(data).toEqual({
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });
  });
});
