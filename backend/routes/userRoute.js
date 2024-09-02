const express = require("express");
const router = express.Router();
const { authVerify } = require( "../middleware/authVerify.js");
const {
  getAllMyQuizzes,
  getAllQuestionsOfAQuiz,
  getDashboardInfo,
  getSingleQuestion,
  getSingleQuiz,
} = require("../controllers/userController.js");

router.get("/analytics", authVerify, getAllMyQuizzes);

// get a single quiz
router.get("/analytics/:questionId", authVerify, getSingleQuestion);

// get a single quiz
router.get("/analytics/q/:quizId", getSingleQuiz);

// get all question from a single quiz (for question wise analysis)
router.get("/analytics/questionWise/:quizId", getAllQuestionsOfAQuiz);

// get user dashboard info
router.get("/dashboard", authVerify, getDashboardInfo);

module.exports= router;


