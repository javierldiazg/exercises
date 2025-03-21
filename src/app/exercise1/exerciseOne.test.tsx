import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExerciseOne from "@/app/exercise1/page";
import { useRangeData } from "../../hooks/useRangeData";

jest.mock("../../hooks/useRangeData");

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
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
    });

    render(<ExerciseOne />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("mock-range")).toBeInTheDocument();
    expect(screen.getByTestId("min-value").textContent).toBe("10");
    expect(screen.getByTestId("max-value").textContent).toBe("100");
  });

  it("displays error message when API fails", async () => {
    mockUseRangeData.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch range",
    });

    render(<ExerciseOne />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch range")).toBeInTheDocument();
    });
  });
});
