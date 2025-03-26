import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../Components/Button";

test("renders button with correct label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
