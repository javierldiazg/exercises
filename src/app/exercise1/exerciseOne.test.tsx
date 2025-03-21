import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExerciseOne from "@/app/exercise1/page";
import { useRangeData } from "../../hooks/useRangeData";
import { getNormalRangeMock } from "@/api/mockServices";

jest.mock("../../hooks/useRangeData");
jest.mock("../../api/mockServices", () => ({
  getNormalRangeMock: jest.fn(),
}));

jest.mock("../../components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

jest.mock("../../components/Range/Range", () => ({
  __esModule: true,
  Range: ({ min, max }: { min: number; max: number }) => (
    <div data-testid="mock-range">
      <span data-testid="min-value">{min}</span>
      <span data-testid="max-value">{max}</span>
    </div>
  ),
}));

describe("ExerciseOne Page", () => {
  const mockUseRangeData = useRangeData as jest.Mock;
  const mockGetNormalRangeMock = getNormalRangeMock as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      setData: jest.fn(),
    });

    render(<ExerciseOne />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Range component with data after loading", async () => {
    const mockData = { min: 10, max: 100 };
    mockUseRangeData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      setData: jest.fn(),
    });

    render(<ExerciseOne />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("mock-range")).toBeInTheDocument();
    expect(screen.getByTestId("min-value").textContent).toBe("10");
    expect(screen.getByTestId("max-value").textContent).toBe("100");
  });

  it("calls getNormalRangeMock when there's an error and updates data", async () => {
    const mockData = { min: 20, max: 200 };
    const setDataMock = jest.fn();

    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "API Error",
      setData: setDataMock,
    });

    mockGetNormalRangeMock.mockResolvedValue(mockData);

    render(<ExerciseOne />);

    await waitFor(() => {
      expect(mockGetNormalRangeMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(setDataMock).toHaveBeenCalledWith(mockData);
    });
  });

  it("shows 'No range available.' if no data is present after an error", async () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "API Error",
      setData: jest.fn(),
    });

    mockGetNormalRangeMock.mockResolvedValue(null);

    render(<ExerciseOne />);

    await waitFor(() => {
      expect(screen.getByText("No range available.")).toBeInTheDocument();
    });
  });
});
