import axios from "axios";
import { getNormalRange, getFixedRange } from "@/api/services";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("services API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getNormalRange", () => {
    it("should return data when API call is successful", async () => {
      const mockResponse = { min: 10, max: 100 };
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await getNormalRange();

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://demo0111712.mockable.io/normal-range"
      );
    });

    it("should return an empty array when API call fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await getNormalRange();

      expect(result).toEqual([]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://demo0111712.mockable.io/normal-range"
      );
    });
  });

  describe("getFixedRange", () => {
    it("should return data when API call is successful", async () => {
      const mockResponse = [10, 20, 30, 40, 50];
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await getFixedRange();

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://demo0111712.mockable.io/fixed-range"
      );
    });

    it("should return an empty array when API call fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await getFixedRange();

      expect(result).toEqual([]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://demo0111712.mockable.io/fixed-range"
      );
    });
  });
});
