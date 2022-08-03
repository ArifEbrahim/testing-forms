import { useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    hasError,
    isValid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
