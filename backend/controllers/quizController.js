const Quiz = require("../models/quizModel.js")
const Question  = require("../models/questionModel.js");


 const createQuiz = async (req, res, next) => {
  try {
    const { quizName, quizType, timer, optionType, questions } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
      
    }

    const qu = Promise.all(
      questions.map(async (q) => {
        // console.log("Single question: " + q.question);

        const ques = await Question.create({
          question: q.question,
          quizType: q.quizType,
          optionType: q.optionType,
          correctAnswer: q.correctAnswer,
          options: q.options,
          timer: q.timer,
        });

        return ques._id;
      })
    ).then(async (res) => {
      // console.log(res);

      const newQuiz = await Quiz.create({
        userId: user._id,
        quizName: quizName,
        quizType: quizType,
        timer: timer,
        optionType: optionType,
        questions: res,
      });

      //   console.log("New quiz: ", newQuiz);
      return newQuiz;
    });

    const finalQuiz = await qu;
    // console.log("final Quiz" + finalQuiz);

    await user.updateOne({ $push: { quizzes: finalQuiz._id } });

    res
      .status(201)
      .json({ message: "Quiz created successfully!", quizId: finalQuiz._id });
  } catch (error) {
    next(error);
  }
};

// delete a quiz with its questions
 const deleteQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return next(createError(404, "Quiz not found!"));

    Promise.all(
      quiz?.questions?.map(async (q) => {
        // console.log(q);

        await Question.findByIdAndDelete(q);
      })
    ).then(async (res) => {
      await Quiz.findByIdAndDelete(quizId);
    });

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

 const IncreaseImpressionOnQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found!" });

    await quiz.updateOne({
      $inc: {
        impressions: 1,
      },
    });
    res.status(200).json({ message: "Impression increased" });
  } catch (error) {
    next(error);
  }
};

 const TrendingQuizzes = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const trending = await Quiz.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $project: {
          quizName: "$quizName",
          createdAt: "$createdAt",
          impressions: "$impressions",
        },
      },

      {
        $sort: {
          impressions: -1,
        },
      },
    ]);

    res.status(200).json(trending);
  } catch (error) {
    next(error);
  }
};

 const playQuiz = async (req, res, next) => {
  try {
    const { quizType, questions } = req.body;

    let score = 0;

    // when quizType is QA
    if (quizType === "QA") {
      const qu = Promise.all(
        questions.map(async (q) => {
          const ques = await Question.findById(q.questionId);

          if (q.chosenAnswer === ques.correctAnswer) {
            await ques.updateOne({ $inc: { answedCorrectly: 1 } });
            score += 1;
            // console.log("score: ", score);
          } else {
            await ques.updateOne({ $inc: { answerdIncorrectly: 1 } });
          }

          await ques.updateOne({ $inc: { attempts: 1 } });
          return score;
        })
      );
      await qu;
    }

    // when quizType is POLL
    if (quizType === "POLL") {
      Promise.all(
        questions.map(async (q) => {
          const ques = await Question.findById(q.questionId);

          if (q.chosenAnswer === 1) {
            await ques.updateOne({ $inc: { optedPollOption1: 1 } });
          } else if (q.chosenAnswer === 2) {
            await ques.updateOne({ $inc: { optedPollOption2: 1 } });
          } else if (q.chosenAnswer === 3) {
            await ques.updateOne({ $inc: { optedPollOption3: 1 } });
          } else if (q.chosenAnswer === 4) {
            await ques.updateOne({ $inc: { optedPollOption4: 1 } });
          }

          // return ques._id;
        })
      );
    }

    // console.log(score, userPoints);

    res.status(200).json({ message: "Quiz played successfully!", score });
  } catch (error) {
    next(error);
  }
};

// edit a quiz
 const updateQuiz = async (req, res, next) => {
  try {
    const { timer, optionType, questions } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
     
    }

    const { quizId } = req.params;
    const realQuiz = await Quiz.findById(quizId);

    if (realQuiz.userId.toString() === user._id.toString()) {
      const qu = Promise.all(
        questions.map(async (q) => {
          const ques = await Question.create({
            question: q.question,
            quizType: q.quizType,
            optionType: q.optionType,
            correctAnswer: q.correctAnswer,
            options: q.options,
            timer: q.timer,
          });

          return ques._id;
        })
      ).then(async (res) => {
        const newQuiz = await Quiz.findByIdAndUpdate(quizId, {
          timer: timer,
          optionType: optionType,
          questions: res,
        });

        return newQuiz._id;
      });

      const finalQuiz = await qu;

      res.status(201).json({
        message: "Quiz updated successfully!",
        quizId: finalQuiz._id,
      });
    } else {
      res.status(403).json({ message: "Action forbidden!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {createQuiz,deleteQuiz,IncreaseImpressionOnQuiz,TrendingQuizzes,playQuiz,updateQuiz};