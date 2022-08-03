import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BasicForm from "../BasicForm";

describe("BasicForm", () => {
  it("displays no errors when initially rendered", () => {
    render(<BasicForm />);
    const firstNameErrorMsg = screen.queryByText(/First name must not be blank/);
    const lastNameErrorMsg = screen.queryByText(/Last name must not be blank/);
    const emailErrorMsg = screen.queryByText(/Email must be valid/);
    expect(firstNameErrorMsg).not.toBeInTheDocument();
    expect(lastNameErrorMsg).not.toBeInTheDocument();
    expect(emailErrorMsg).not.toBeInTheDocument();
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
    const lastNameInput = screen.getByLabelText(/Last Name/);
    const emailInput = screen.getByLabelText(/E-Mail Address/)
    const firstNameContainer = screen.getByTestId(/first-name-container/);
    userEvent.click(firstNameInput)
    userEvent.click(lastNameInput)
    userEvent.click(emailInput)
    userEvent.click(firstNameContainer);
    const firstNameErrorMsg = screen.queryByText(/First name must not be blank/);
    expect(firstNameErrorMsg).toBeInTheDocument();
    const lastNameErrorMsg = screen.queryByText(/Last name must not be blank/);
    expect(lastNameErrorMsg).toBeInTheDocument();
    const emailErrorMsg = screen.queryByText(/Email must be valid/);
    expect(emailErrorMsg).toBeInTheDocument();
    userEvent.type(firstNameInput, "test");
    userEvent.type(lastNameInput, "test");
    userEvent.type(emailInput, "test@test.com");
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);
    expect(firstNameErrorMsg).not.toBeInTheDocument();
    expect(firstNameInput.value).toBe("");
    expect(lastNameInput.value).toBe("");
    expect(emailInput.value).toBe("")
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
    const submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeDisabled();
    const firstNameInput = screen.getByLabelText(/First Name/);
    userEvent.type(firstNameInput, "test");
    expect(submitBtn).toBeDisabled();
    const lastNameInput = screen.getByLabelText(/Last Name/);
    userEvent.type(lastNameInput, "test");
    expect(submitBtn).toBeDisabled();
    const emailInput = screen.getByLabelText(/E-Mail Address/)
    userEvent.type(emailInput, "test@test.com");
    expect(submitBtn).not.toBeDisabled();
  })
});
