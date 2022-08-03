import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BasicForm from "../BasicForm";

describe("BasicForm", () => {
  it("displays no errors when initially rendered", () => {
    render(<BasicForm />);
    const errorMsg = screen.queryByText(/First name must not be blank/);
    expect(errorMsg).not.toBeInTheDocument();
  });

  it("displays an error when form is submitted but first name is empty", () => {
    render(<BasicForm />);
    const submitBtn = screen.getByText(/Submit/);
    userEvent.click(submitBtn);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
  });
});
