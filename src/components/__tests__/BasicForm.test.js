import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BasicForm from "../BasicForm";

describe("BasicForm", () => {
  it("displays no errors when initially rendered", () => {
    render(<BasicForm />);
    const firstNameErrorMsg = screen.queryByText(/First name must not be blank/);
    const lastNameErrorMsg = screen.queryByText(/LAst name must not be blank/);
    expect(firstNameErrorMsg).not.toBeInTheDocument();
    expect(lastNameErrorMsg).not.toBeInTheDocument();
  });

  it("disables submit button while input is not valid", () => {
    render(<BasicForm />);
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeDisabled();
  });

  it("displays an error if input not valid and user clicks away", () => {
    render(<BasicForm />);
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.click(firstNameInput);
    const firstNameContainer = screen.getByTestId(/first-name-container/);
    userEvent.click(firstNameContainer);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeDisabled();
  });

  it("removes errors following submission of valid input & clears inputs", () => {
    render(<BasicForm />);
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.click(firstNameInput);
    const firstNameContainer = screen.getByTestId(/first-name-container/);
    userEvent.click(firstNameContainer);
    const firstNameErrorMsg = screen.queryByText(/First name must not be blank/);
    expect(firstNameErrorMsg).toBeInTheDocument();
    userEvent.type(firstNameInput, "test");
    const lastNameInput = screen.getByLabelText(/Last Name/);
    userEvent.type(lastNameInput, "test");
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);
    expect(firstNameErrorMsg).not.toBeInTheDocument();
    expect(firstNameInput.value).toBe("");
  });

  it("removes errors on key press if input is valid", () => {
    render(<BasicForm />);
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.click(firstNameInput);
    const firstNameContainer = screen.getByTestId(/first-name-container/);
    userEvent.click(firstNameContainer);
    const errorMsg = screen.getByText(/First name must not be blank/);
    expect(errorMsg).toBeInTheDocument();
    userEvent.type(firstNameInput, "test");
    expect(errorMsg).not.toBeInTheDocument();
  });

  it('keeps submit button disabled until all inputs are valid', () => {
    render(<BasicForm />);
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.type(firstNameInput, "test");
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeDisabled();
    const lastNameInput = screen.getByLabelText(/Last Name/);
    userEvent.type(lastNameInput, "test");
    expect(submitBtn).not.toBeDisabled();
  })
});
