import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExerciseTwo from "@/app/exercise2/page";
import { useRangeData } from "../../hooks/useRangeData";
import { getFixedRangeMock } from "@/api/mockServices";

jest.mock("../../hooks/useRangeData");
jest.mock("../../api/mockServices", () => ({
  getFixedRangeMock: jest.fn(),
}));

jest.mock("../../components/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

jest.mock("../../components/Range/Range", () => ({
  __esModule: true,
  Range: ({
    min,
    max,
    fixedValues,
  }: {
    min: number;
    max: number;
    fixedValues?: number[];
  }) => (
    <div data-testid="mock-range">
      <span data-testid="min-value">{min}</span>
      <span data-testid="max-value">{max}</span>
      <span data-testid="fixed-values">{JSON.stringify(fixedValues)}</span>
    </div>
  ),
}));

describe("ExerciseTwo Page", () => {
  const mockUseRangeData = useRangeData as jest.Mock;
  const mockGetFixedRangeMock = getFixedRangeMock as jest.Mock;

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

    render(<ExerciseTwo />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Range component with data after loading", async () => {
    const mockRangeValues = [10, 20, 30, 40, 50];
    mockUseRangeData.mockReturnValue({
      data: { rangeValues: mockRangeValues },
      loading: false,
      error: null,
      setData: jest.fn(),
    });

    render(<ExerciseTwo />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("mock-range")).toBeInTheDocument();
    expect(screen.getByTestId("min-value").textContent).toBe("10");
    expect(screen.getByTestId("max-value").textContent).toBe("50");
    expect(screen.getByTestId("fixed-values").textContent).toBe(
      JSON.stringify(mockRangeValues)
    );
  });

  it("calls getFixedRangeMock when there's an error and updates data", async () => {
    const mockRangeValues = [5, 15, 25, 35, 45];
    const setDataMock = jest.fn();

    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "API Error",
      setData: setDataMock,
    });

    mockGetFixedRangeMock.mockResolvedValue({ rangeValues: mockRangeValues });

    render(<ExerciseTwo />);

    await waitFor(() => {
      expect(mockGetFixedRangeMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(setDataMock).toHaveBeenCalledWith({
        rangeValues: mockRangeValues,
      });
    });
  });

  it("shows 'No range available.' if no data is present after an error", async () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "API Error",
      setData: jest.fn(),
    });

    mockGetFixedRangeMock.mockResolvedValue(null);

    render(<ExerciseTwo />);

    await waitFor(() => {
      expect(screen.getByText("No range available.")).toBeInTheDocument();
    });
  });
});
