import React from "react";
import styles from "./QA.module.css";
import toast from "react-hot-toast";

const deleteSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trash-2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );

 const Slide = ({
  slideCount,
  activeSlideIdx,
  handleSlideClick,
  handleAddSlide,
  handleDeleteSlide,
}) => (
  <div className={styles.slideContainer}>
    <p className={styles.heading}>Max 5 questions</p>
    <div className={styles.allSlides}>
      {[...Array(slideCount)].map((_, index) => (
        <div
          key={index}
          onClick={() => handleSlideClick(index + 1)}
          style={{
            border:
              index + 1 === activeSlideIdx
                ? "2px solid #73ABFF"
                : "2px solid transparent",
          }}
          className={styles.slideNumber}
        >
          {index + 1}
          {activeSlideIdx === index + 1 && (
            <span
              className={styles.modalCloseIcon}
              onClick={async () => {
                if (index + 1 === slideCount) {
                  await handleSlideClick(index + 1);
                  handleDeleteSlide(index + 1);
                } else {
                  handleDeleteSlide(index + 1);
                }
              }}
            >
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
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          )}
        </div>
      ))}
      {slideCount < 5 && (
        <div
          onClick={() => {
            handleAddSlide();
          }}
          className={styles.addSlide}
        >
          +
        </div>
      )}
    </div>
  </div>
);

export default Slide;
