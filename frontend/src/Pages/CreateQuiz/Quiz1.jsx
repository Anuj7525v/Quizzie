import React from "react";
import styles from './CreateQuiz.module.css';

function Quiz1({
  quizType,
  setQuizType,
  setOpenQuizModal,
  setShowModal,
  setQuizName,
  handleContinueToQuiz1,
  err,
}) {
  return (
    <div className={styles.modal}>
      <input
        type="text"
        placeholder={err ? err : "Quizz Name"}
        className={styles.quizNameInput}
        onChange={(e) => setQuizName(e.target.value)}
        style={{ border: err ? "1px solid red" : "1px solid transparent" }}
      />

      <div className={styles.content}>
        <label htmlFor="quizzType">Quiz Type </label>
        <button
          onClick={() => setQuizType(0)}
          className={`${styles.optionToSelect} ${
            quizType === 0 && styles.selected
          }`}
        >
          Q & A
        </button>
        <button
          onClick={() => setQuizType(1)}
          className={`${styles.optionToSelect} ${
            quizType === 1 && styles.selected
          }`}
        >
          Poll Type
        </button>
      </div>

      <div className={styles.btns}>
        <button
          onClick={() => setOpenQuizModal(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button onClick={handleContinueToQuiz1} className={styles.continueBtn}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Quiz1;
