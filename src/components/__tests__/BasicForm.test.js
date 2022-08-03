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

  it("displays an error if input not valid and user clicks away", () => {
    render(<BasicForm />);
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.click(firstNameInput);
    const firstNameContainer = screen.getByTestId(/first-name-container/);
    userEvent.click(firstNameContainer);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
  });

  it("removes errors following submission of valid input", () => {
    render(<BasicForm />);
    const submitBtn = screen.getByText(/Submit/);
    userEvent.click(submitBtn);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.type(firstNameInput, "test");
    userEvent.click(submitBtn);
    expect(errorMsg).not.toBeInTheDocument();
  });

  it("removes errors on key press if input is valid", () => {
    render(<BasicForm />);
    const submitBtn = screen.getByText(/Submit/);
    userEvent.click(submitBtn);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.type(firstNameInput, "test");
    expect(errorMsg).not.toBeInTheDocument();
  });
});
