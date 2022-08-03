import { useState } from "react";

const BasicForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState('true')

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    if(!firstName) {
      setIsFirstNameValid(false);
      return;
    } else {
      setIsFirstNameValid(true);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={firstNameChangeHandler}
          />
          {!isFirstNameValid && <p>First name must not be blank</p>}
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
