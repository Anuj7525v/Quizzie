const express = require('express');
const {
  IncreaseImpressionOnQuiz,
  TrendingQuizzes,
  createQuiz,
  deleteQuiz,
  playQuiz,
  updateQuiz,
} = require( "../controllers/quizController.js");
const {authVerify} = require("../middleware/authVerify.js");
const router = express.Router();

// create a quiz
router.post("/create", authVerify, createQuiz);

// delete a quiz
router.delete("/:quizId", authVerify, deleteQuiz);

// edit a quiz
router.put("/update/:quizId", authVerify, updateQuiz);

// increase impression on quiz
router.put("/:quizId", IncreaseImpressionOnQuiz);

// increase impression on quiz
router.get("/trending", authVerify, TrendingQuizzes);

// play quiz
router.patch("/playQuiz", playQuiz);

module.exports =  router;