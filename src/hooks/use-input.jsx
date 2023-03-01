import { useState } from "react";

function useInput(checkValue) {
  const [inputVal, setInputVal] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = checkValue(inputVal);
  const hasError = !inputIsValid && isTouched;
  
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputChangeHandler = (e) => {
    setInputVal(e.target.value);
  };

  const reset = () => {
    setInputVal('');
    setIsTouched(false);
  }

  return ({
    value: inputVal,
    isValid: inputIsValid,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    setTouch: setIsTouched,
    reset,
  })
}

export default useInput;