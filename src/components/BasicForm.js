import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: isFirstNameValid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: isLastNameValid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid) {
    isFormValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFirstNameValid || !isLastNameValid) {
      return;
    }

    resetFirstName();
    resetLastName();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div
          className={
            firstNameHasError ? "form-control invalid" : "form-control"
          }
          data-testid="first-name-container"
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p>First name must not be blank</p>}
        </div>
        <div
          className={lastNameHasError ? "form-control invalid" : "form-control"}
        >
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p>Last name must not be blank</p>}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="email">E-Mail Address</label>
        <input type="text" id="email" />
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
