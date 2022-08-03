import { useState } from "react";

const BasicForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);

  const isFirstNameValid = firstName.trim() !== '';
  const isFirstNameInputInvalid = !isFirstNameValid && isFirstNameTouched;

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const firstNameBlurHandler = () => {
    setIsFirstNameTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsFirstNameTouched(true);

    if (!isFirstNameValid) {
      return;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div
          className={
            isFirstNameInputInvalid ? "form-control invalid" : "form-control"
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
          {isFirstNameInputInvalid && <p>First name must not be blank</p>}
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
