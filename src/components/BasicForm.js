import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: isFirstNameValid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    setIsTouched: firstNameTouched,
  } = useInput((value) => value.trim() !== "");

  const submitHandler = (event) => {
    event.preventDefault();

    firstNameTouched(true);

    if (!isFirstNameValid) {
      return;
    }
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
        <div className="form-control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="email">E-Mail Address</label>
        <input type="text" id="email" />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
