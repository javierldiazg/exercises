import { renderHook, act } from "@testing-library/react";
import { useRangeData } from "@/hooks/useRangeData";
import { getNormalRange, getFixedRange } from "@/api/services";

jest.mock("../api/services");

describe("useRangeData Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches normal range successfully", async () => {
    const mockData = { min: 10, max: 100 };
    (getNormalRange as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRangeData("normal"));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles error in normal range fetch", async () => {
    (getNormalRange as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useRangeData("normal"));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "Failed to fetch range. Error: API Error"
    );
  });

  it("fetches fixed range successfully", async () => {
    const mockData = [10, 20, 30, 40, 50];
    (getFixedRange as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRangeData("fixed"));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toEqual({ rangeValues: mockData });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles error in fixed range fetch", async () => {
    (getFixedRange as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useRangeData("fixed"));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "Failed to fetch range. Error: API Error"
    );
  });

  it("throws error if fixed range returns invalid data", async () => {
    (getFixedRange as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useRangeData("fixed"));

    await act(async () => {});

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(
      "Failed to fetch range. Error: Invalid fixed range response."
    );
  });
});
