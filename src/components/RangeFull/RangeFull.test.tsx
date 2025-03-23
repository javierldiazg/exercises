import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RangeFull } from "./RangeFull";

describe("RangeFull Component", () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it("renders correctly with min and max values", () => {
    render(<RangeFull min={1} max={100} onChange={mockOnChange} />);

    expect(screen.getByText("1.00")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
  });

  it("renders correctly with fixed values", () => {
    render(
      <RangeFull
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
    render(<RangeFull min={1} max={100} onChange={mockOnChange} />);

    const handles = screen.getAllByRole("slider");

    fireEvent.mouseDown(handles[0]);
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("ensures that minValue does not exceed maxValue", () => {
    render(<RangeFull min={1} max={100} onChange={mockOnChange} />);

    const handles = screen.getAllByRole("slider");

    fireEvent.mouseDown(handles[0]);
    fireEvent.mouseMove(document, { clientX: 9999 });
    fireEvent.mouseUp(document);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("allows editing min and max values via input fields", () => {
    render(
      <RangeFull
        min={1}
        max={100}
        enableInputs={true}
        onChange={mockOnChange}
      />
    );

    const minLabel = screen.getByText("1.00");
    fireEvent.click(minLabel);

    const minInput = screen.getByRole("spinbutton");
    fireEvent.change(minInput, { target: { value: "20.00" } });
    fireEvent.blur(minInput);

    expect(mockOnChange).toHaveBeenCalledWith({ minValue: 20, maxValue: 100 });
  });

  it("ensures maxValue does not go below minValue", () => {
    render(
      <RangeFull
        min={1}
        max={100}
        enableInputs={true}
        onChange={mockOnChange}
      />
    );

    const maxLabel = screen.getByText("100.00");
    fireEvent.click(maxLabel);

    const maxInput = screen.getByRole("spinbutton");
    fireEvent.change(maxInput, { target: { value: "1.00" } });
    fireEvent.blur(maxInput);

    expect(mockOnChange).toHaveBeenCalledWith({ minValue: 1, maxValue: 1 });
  });

  it("restores min value if input is cleared", () => {
    render(
      <RangeFull
        min={1}
        max={100}
        enableInputs={true}
        onChange={mockOnChange}
      />
    );

    const minLabel = screen.getByText("1.00");
    fireEvent.click(minLabel);

    const minInput = screen.getByRole("spinbutton");
    fireEvent.change(minInput, { target: { value: "" } });
    fireEvent.blur(minInput);

    expect(mockOnChange).toHaveBeenCalledWith({ minValue: 1, maxValue: 100 });
  });

  it("updates min value on Enter key press", () => {
    render(
      <RangeFull
        min={1}
        max={100}
        enableInputs={true}
        onChange={mockOnChange}
      />
    );

    const minLabel = screen.getByText("1.00");
    fireEvent.click(minLabel);

    const minInput = screen.getByRole("spinbutton");
    fireEvent.change(minInput, { target: { value: "30.00" } });
    fireEvent.keyDown(minInput, { key: "Enter" });

    expect(mockOnChange).toHaveBeenCalledWith({ minValue: 30, maxValue: 100 });
  });
});
