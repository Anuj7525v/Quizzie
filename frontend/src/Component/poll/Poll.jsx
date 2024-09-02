
import React, { useState } from "react";
import styles from "./Poll.module.css";
import { Modal } from 'react-responsive-modal';
import toast from "react-hot-toast";
import {BACKEND_URL} from '../../constant';
import axios from 'axios';


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

const Form = ({
  quizData,
  activeSlideIdx,
  handleQuestionChange,
  handleOptionTypeChange,
  handleSetOptionType,
  handleAddOption,
  optionType,
  handleChangeOptionContentText,
  handleChangeOptionContentImageUrl,
  handleDeleteOption,
}) => {
  if (activeSlideIdx > quizData?.slides?.length) {
    return null;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputQuestion}>
        <input
          type="text"
          placeholder="Poll question"
          className={styles.question}
          onChange={(e) => {
            handleQuestionChange(activeSlideIdx, e.target.value);
          }}
          value={quizData.slides[activeSlideIdx - 1].question}
        />
      </div>

      <div className={styles.optionType}>
        <span>Option Type</span>

        <div className={styles.optionTypeContent}>
          <input
            type="radio"
            name="optionType"
            id="text"
            style={{ width: "1rem", accentColor: "green" }}
            onChange={(e) => {
              handleSetOptionType("text");
              handleOptionTypeChange(activeSlideIdx, "text");
            }}
            checked={quizData.slides[activeSlideIdx - 1].optionType === "text"}
          />
          <label htmlFor="text">Text</label>
        </div>

        <div className={styles.optionTypeContent}>
          <input
            style={{ width: "1rem", accentColor: "green" }}
            type="radio"
            name="optionType"
            id="image"
            onChange={(e) => {
              handleSetOptionType("image");
              handleOptionTypeChange(activeSlideIdx, "image");
            }}
            checked={quizData.slides[activeSlideIdx - 1].optionType === "image"}
          />
          <label htmlFor="image">Image</label>
        </div>
        <div style={{ width: "1rem" }} className={styles.optionTypeContent}>
          <input
            type="radio"
            style={{ accentColor: "green" }}
            name="optionType"
            id="textImage"
            onChange={(e) => {
              handleSetOptionType("textImage");
              handleOptionTypeChange(activeSlideIdx, "textImage");
            }}
            checked={
              quizData.slides[activeSlideIdx - 1].optionType === "textImage"
            }
          />
          <label htmlFor="textImage" style={{ whiteSpace: "nowrap" }}>
            Text & Image
          </label>
        </div>
      </div>

      <div className={styles.answersContent}>
        {quizData.slides[activeSlideIdx - 1].options.map((option, i) => (
          <div className={styles.answers} key={i}>
            <input
              style={{
                marginLeft: "2rem",
              }}
              type="text"
              placeholder={optionType === "image" ? "imageUrl" : "text"}
              className={styles.answerInput}
              onChange={(e) =>
                handleChangeOptionContentText(activeSlideIdx, i, e.target.value)
              }
              value={quizData.slides[activeSlideIdx - 1].options[i].text}
            />
            {optionType === "textImage" && (
              <input
                type="text"
                placeholder="imageUrl"
                className={styles.answerInput}
                onChange={(e) =>
                  handleChangeOptionContentImageUrl(
                    activeSlideIdx,
                    i,
                    e.target.value
                  )
                }
                value={quizData.slides[activeSlideIdx - 1].options[i].imageUrl}
              />
            )}
            {quizData.slides[activeSlideIdx - 1].options.length > 2 && (
              <span onClick={() => handleDeleteOption(activeSlideIdx, i)}>
                {deleteSVG}
              </span>
            )}
          </div>
        ))}

        {quizData.slides[activeSlideIdx - 1].options?.length < 4 && (
          <div className={styles.answers}>
            <input
              style={{
                marginLeft: "2rem",
                cursor: "pointer",
                textAlign: "center",
              }}
              type="text"
              placeholder="Add Option"
              readOnly
              onClick={() => handleAddOption(activeSlideIdx)}
              className={styles.answerInput}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const Poll = ({
  openCreateQuizModal,
  setOpenCreateQuizModal,
  setShowComponent,
  quizName,
  setQuizId,
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(1);
  const [slideCount, setSlideCount] = useState(1);
  const [optionType, setOptionType] = useState("text");

  const [quizData, setQuizData] = useState({
    slides: [
      {
        question: "",
        optionType: optionType,
        timer: 0,
        quizType: "POLL",
        options:
          optionType === "textImage"
            ? [
                { text: "", imageUrl: "" },
                { text: "", imageUrl: "" },
              ]
            : [{ text: "" }, { text: "" }],
        correctAnswer: 1,
      },
    ],
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddSlide = () => {
    setSlideCount(slideCount + 1);
    setActiveSlideIdx(slideCount + 1);
    const newQuizData = { ...quizData };
    newQuizData.slides.push({
      question: "",
      optionType: newQuizData.slides[0].optionType,
      timer: 0,
      quizType: "POLL",
      options:
        optionType === "textImage"
          ? [
              { text: "", imageUrl: "" },
              { text: "", imageUrl: "" },
            ]
          : [{ text: "" }, { text: "" }],
      correctAnswer: 1,
    });
    setQuizData(newQuizData);
    if (slideCount >= 1) {
      setShowError(false);
      setErrorMessage("");
    }
  };

  const handleAddOption = (activeSlideIdx) => {
    const newQuizData = { ...quizData };
    newQuizData.slides[activeSlideIdx - 1].options.push(
      optionType === "textImage" ? { text: "", imageUrl: "" } : { text: "" }
    );
    setQuizData({ ...newQuizData });
  };

  const handleDeleteOption = (activeSlideIdx, optionIdx) => {
    if (quizData.slides[activeSlideIdx - 1]?.options?.length <= 1) {
      setShowError(true);
      setErrorMessage("You need to have at least 2 options");
      return;
    }

    const newQuizData = { ...quizData };
    newQuizData.slides[activeSlideIdx - 1].options.splice(optionIdx, 1);
    if (
      newQuizData.slides[activeSlideIdx - 1].correctAnswer >
      newQuizData.slides[activeSlideIdx - 1].options.length
    ) {
      newQuizData.slides[activeSlideIdx - 1].correctAnswer = 1;
    }
    setQuizData(newQuizData);
  };

  const handleSlideClick = (index) => {
    setActiveSlideIdx(index);
  };

  const handleQuestionChange = (index, value) => {
    const newQuizData = { ...quizData };
    newQuizData.slides[index - 1].question = value;
    setQuizData(newQuizData);
  };

  const handleChangeOptionContentText = (slideIdx, idx, value) => {
    const newQuizData = { ...quizData };
    newQuizData.slides[slideIdx - 1].options[idx].text = value;
    setQuizData(newQuizData);
  };

  const handleChangeOptionContentImageUrl = (slideIdx, idx, value) => {
    const newQuizData = { ...quizData };
    newQuizData.slides[slideIdx - 1].options[idx].imageUrl = value;
    setQuizData(newQuizData);
  };

  const handleSetOptionType = (val) => {
    setOptionType(val);
  };

  const handleOptionTypeChange = (index, value) => {
    setOptionType(value);

    const newQuizData = { ...quizData };

    const modifiedPostData = newQuizData.slides.reduce((acc, obj) => {
      const modifiedObj = {
        ...obj,
        optionType: value,
        options:
          value === "textImage"
            ? [
                { text: "", imageUrl: "" },
                { text: "", imageUrl: "" },
              ]
            : [{ text: "" }, { text: "" }],
      };
      acc.push(modifiedObj);
      return acc;
    }, []);

    setQuizData({ slides: modifiedPostData });
    // setOptionType(() => newQuizData.slides[0].optionType);
  };

  const handleDeleteSlide = (index) => {
    if (slideCount === 1) {
      setShowError(true);
      setErrorMessage("You need to have at least 1 question");
      return;
    }
    if (index === quizData.slides.length) {
      setActiveSlideIdx(index - 1);
    }

    const newQuizData = { ...quizData };
    newQuizData.slides.splice(index - 1, 1);

    if (index === activeSlideIdx) {
      setActiveSlideIdx(Math.max(index - 1, 1));
    } else if (index < activeSlideIdx) {
      setActiveSlideIdx(activeSlideIdx - 1);
    }

    setSlideCount(slideCount - 1);
    setQuizData(newQuizData);
  };

  // console.log("OptionType: " + optionType);
  // console.log(quizData);

  const [inProcess, setInProcess] = useState(false);

  const handleCreatePoll = async (e) => {
    const error = quizData.slides.some(
      (slide) =>
        slide.correctAnswer === "" ||
        slide.optionType === "" ||
        slide.question === "" ||
        slide.quizType === "" ||
        slide.timer === "" ||
        slide.options.some((o) => o.text === "" || o.imageUrl === "")
    );

    if (slideCount < 1) {
      setShowError(true);
      setErrorMessage("You need to have atleast 1 question.");
      return;
    }

    if (error) {
      setShowError(true);
      setErrorMessage("Please fill all the fields.");
      return;
    }

    setShowError(false);
    setErrorMessage("");

    setInProcess(true);
    try {
      const dataToSend = {
        quizName: quizName,
        timer: 0,
        quizType: "POLL",
        optionType: optionType,
        questions: quizData.slides,
      };

      // console.log(dataToSend);

      const res = await axios.post(`${BACKEND_URL}/api/quiz/`, dataToSend);
      // console.log(res.data);
      setQuizId(res?.data?.quizId);

      toast.success("Poll created successfully!");
      setShowComponent(2);
    } catch (error) {
      setShowError(true);
      console.log(error);
      setErrorMessage("Something went wrong!");
    } finally {
      setInProcess(false);
    }

    // console.log(quizData);
  };

  return (
    <Modal
      open={openCreateQuizModal}
      onClose={() => setOpenCreateQuizModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
    >
      <div className={styles.slideForm}>
        <Slide
          slideCount={slideCount}
          activeSlideIdx={activeSlideIdx}
          handleSlideClick={handleSlideClick}
          handleAddSlide={handleAddSlide}
          handleDeleteSlide={handleDeleteSlide}
        />
        <Form
          quizData={quizData}
          activeSlideIdx={activeSlideIdx}
          handleQuestionChange={handleQuestionChange}
          handleOptionTypeChange={handleOptionTypeChange}
          handleSetOptionType={handleSetOptionType}
          handleAddOption={handleAddOption}
          optionType={optionType}
          handleChangeOptionContentText={handleChangeOptionContentText}
          handleChangeOptionContentImageUrl={handleChangeOptionContentImageUrl}
          handleDeleteOption={handleDeleteOption}
        />
      </div>

      {showError && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.btns}>
        <button
          onClick={() => setOpenCreateQuizModal(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button
          disabled={inProcess}
          onClick={handleCreatePoll}
          className={styles.createQuizBtn}
        >
          Create Poll
        </button>
      </div>
    </Modal>
  );
};
