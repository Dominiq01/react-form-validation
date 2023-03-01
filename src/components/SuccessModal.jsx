import classes from "./SuccessModal.module.css";

function SuccessModal({onReturn}) {

  const goBackHandler = () => {
    onReturn(false);
  }

  return (
    <section className={classes.modal}>
      <h1 className={classes.title}>🎉Success!🎉</h1>
      <p className={classes.text}>
        You have successfuly join to our growing comunity! You can be proud of
        yourself.
      </p>
      <button className={classes.button} onClick={goBackHandler}>Return to main page</button>
    </section>
  );
}

export default SuccessModal;
