import React from "react";
import toast from "react-hot-toast";
import styles from "./CreateQuiz.module.css";


function QuizCreated({ quizzType, quizId }) {
    const shareQuiz = () => {
        navigator.clipboard.writeText(
           `https://quizzie-drab.vercel.app/playquiz/${quizId}`
        );

        toast.success("Link copied to clipboard");
    };

    return (
        <div className={styles.modal}>
            <div style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600" }}>
                <p>Congrats your {quizzType === 0 ? "Quiz" : "Poll"} is</p>
                <p>Published</p>
            </div>

            <input
                type="text"
                placeholder={`Your ${quizzType === 0 ? "quiz" : "poll"} link is here`}
                className={styles.quizNameInput}
                readOnly
               value={`https://quizzie-drab.vercel.app/playQuiz/${quizId}`}
            />

            <div className={styles.shareBtnDiv}>
                <button className={styles.shareBtn} onClick={shareQuiz}>
                    Share
                </button>
            </div>
        </div>
    );
};

export default QuizCreated;


