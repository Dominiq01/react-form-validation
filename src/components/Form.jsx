import { useRef, useState } from "react";
import useInput from "../hooks/use-input";
import classes from "./Form.module.css";

function Form({onSucces}) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    value: nameVal,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    reset: resetName,
    setTouch: setNameTouched,
  } = useInput((val) => val.trim() !== "");

  const {
    value: emailVal,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    reset: resetEmail,
    setTouch: setEmailTouched,
  } = useInput((val) => val.match(validRegex));

  const countryRef = useRef();
  const [termsInput, setTermsInput] = useState(false);
  const [termsAreTouched, setTermsAreTouched] = useState(false);

  const invalidTerms = !termsInput && termsAreTouched;

  let formIsValid = false;
  if (nameIsValid && emailIsValid && !invalidTerms && termsAreTouched) {
    formIsValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setNameTouched(true);
    setTermsAreTouched(true);

    if (!formIsValid) {
      return;
    }
    resetName();
    resetEmail();
    setTermsAreTouched(false);
    onSucces(true);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.description}>
        <h1 className={classes.title}>🐼Let's get started!👋</h1>
        <p className={classes.text}>
          Welcome to our team! If you want to support nature, you are in the
          right place. We already have saved more than 2000 different animals.
        </p>
        <div className={classes.name}>
          <label className={classes.label} htmlFor="name">
            {nameHasError ? (
              <p style={{ color: "#fa5252" }}>Invalid name!</p>
            ) : (
              "Name"
            )}
          </label>
          <input
            className={
              nameHasError
                ? `${classes.input} ${classes.invalid}`
                : `${classes.input}`
            }
            id="name"
            type="text"
            placeholder="Enter your name"
            value={nameVal}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={classes.email}>
          <label className={classes.label} htmlFor="email">
            {emailHasError ? (
              <p style={{ color: "#fa5252" }}>Invalid email!</p>
            ) : (
              "Email"
            )}
          </label>
          <input
            className={
              emailHasError
                ? `${classes.input} ${classes.invalid}`
                : `${classes.input}`
            }
            id="email"
            type="email"
            placeholder="Enter your email"
            value={emailVal}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.country}>
          <label className={classes.label} htmlFor="country">
            Country
          </label>
          <select className={classes.input} id="country" ref={countryRef}>
            <option>Poland</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>Sweden</option>
          </select>
        </div>
        <div className={classes.terms}>
          <label className={classes.label} htmlFor="country">
            Terms of service
          </label>
          <div className={classes["flex-terms"]}>
            <input
              className={
                invalidTerms
                  ? `${classes.checkbox} ${classes.invalid}`
                  : `${classes.checkbox}`
              }
              type="checkbox"
              onChange={(e) => {
                setTermsInput(e.target.checked);
                setTermsAreTouched(true);
              }}
            />
            <p className={classes["terms-text"]}>
              I agree to the terms of{" "}
              <strong>SaveThePlanetEarth Subscriber Agreement</strong> and the{" "}
              <strong>Privacy Policy</strong>
            </p>
          </div>
          {invalidTerms && (
            <p className={classes["invalid-terms"]}>
              You must agree to the terms.
            </p>
          )}
        </div>
        <button className={classes.button} type="submit">
          Let's change the world together!
        </button>
      </div>
      <div className={classes.img}></div>
    </form>
  );
}

export default Form;
