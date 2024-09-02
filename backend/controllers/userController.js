const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");


// get all my quizzes to show in analytics
 const getAllMyQuizzes = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const quizzes = await Quiz.find({ userId: user._id });

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

// get a single question
 const getSingleQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const ques = await Question.findById(questionId);
    if (!ques) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(ques);
  } catch (error) {
    next(error);
  }
};

// get a single quiz
 const getSingleQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const q = await Quiz.findById(quizId);
    if (!q) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(q);
  } catch (error) {
    next(error);
  }
};

// get all question of a quiz for question wise analysis
 const getAllQuestionsOfAQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questions = Promise.all(
      quiz?.questions.map(async (questionId) => {
        const ques = await Question.findById(questionId);
        return ques;
      })
    );

    const allQuestions = await questions;
    res.status(200).json(allQuestions);
  } catch (error) {
    next(error);
  }
};

// get dashboard information
 const getDashboardInfo = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });

    }
    const totalQuizzesCreatedByUser = await Quiz.countDocuments({
      userId: user._id,
    });

    const totalQuestionCreatedByUser = await Quiz.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: "$questions",
        },
      },
      {
        $addFields: {
          numberOfTags: {
            $size: { $ifNull: ["$_id", []] },
          },
        },
      },
      {
        $group: {
          _id: null,
          numberOfQuestions: {
            $sum: "$numberOfTags",
          },
        },
      },
    ]);

    const totalImpressionsOfAUser = await Quiz.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: null,
          impressionSum: {
            $sum: "$impressions",
          },
        },
      },
    ]);

    res.status(200).json({
      totalQuizzesCreatedByUser,
      totalQuestionCreatedByUser: totalQuestionCreatedByUser[0]
        ?.numberOfQuestions
        ? totalQuestionCreatedByUser[0].numberOfQuestions
        : 0,
      totalImpressions: totalImpressionsOfAUser[0]?.impressionSum
        ? totalImpressionsOfAUser[0].impressionSum
        : 0,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
getDashboardInfo,getAllQuestionsOfAQuiz,getSingleQuestion,getSingleQuiz, getAllMyQuizzes

};