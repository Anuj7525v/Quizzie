import React from "react";
import styles from "./QuizBox.module.css";
import formatDate from "../Converter/Date";
import convertToK from "../Converter/convertToK";

export const QuizBox = ({ quizData }) => {
  return (
    <div className={styles.quizzesComp}>
      <div className={styles.content}>
        <h4 className={styles.quizTitle}>{quizData?.quizzName}</h4>
        <p className={styles.totalQuizAndIcon}>
          {convertToK(quizData?.impressions)}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </p>
      </div>

      <p className={styles.date}>
        Created on: {formatDate(quizData?.createdAt)}
      </p>
    </div>
  );
};