import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExerciseTwo from "@/app/exercise2/page";
import { useRangeData } from "../../hooks/useRangeData";

jest.mock("../../hooks/useRangeData");

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
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

  it("displays error message when API fails", async () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch range",
    });

    render(<ExerciseTwo />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch range")).toBeInTheDocument();
    });
  });
});
