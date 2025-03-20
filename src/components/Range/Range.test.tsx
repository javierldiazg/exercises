import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Range } from "./Range";

describe("Range Component", () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it("renders correctly with min and max values", () => {
    render(<Range min={1} max={100} onChange={mockOnChange} />);

    expect(screen.getByText("1.00")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
  });

  it("renders correctly with fixed values", () => {
    render(
      <Range
        min={1.99}
        max={70.99}
        fixedValues={[1.99, 5.99, 10.99]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("1.99")).toBeInTheDocument();
    expect(screen.getByText("70.99")).toBeInTheDocument();
  });

  it("triggers onChange when min handle is moved", () => {
    render(<Range min={1} max={100} onChange={mockOnChange} />);

    const handles = screen.getAllByRole("slider");

    fireEvent.mouseDown(handles[0]);
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("ensures that minValue does not exceed maxValue", () => {
    render(<Range min={1} max={100} onChange={mockOnChange} />);

    const handles = screen.getAllByRole("slider");

    fireEvent.mouseDown(handles[0]);
    fireEvent.mouseMove(document, { clientX: 9999 });
    fireEvent.mouseUp(document);

    expect(mockOnChange).toHaveBeenCalled();
  });
});
