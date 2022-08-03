import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");

  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: isFirstNameValid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: isLastNameValid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: email,
    hasError: emailHasError,
    isValid: isEmailValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) {
    isFormValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
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
          {firstNameHasError && <p className="error-text">First name must not be blank</p>}
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
          {lastNameHasError && <p className="error-text">Last name must not be blank</p>}
        </div>
      </div>
      <div className={emailHasError ? "form-control invalid" : "form-control"}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
