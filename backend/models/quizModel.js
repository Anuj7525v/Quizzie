const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    quizName: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      enum: ["QA", "POLL"],
    },
    timer: {
      type: Number,
      default: 0,
    },
    optionType: {
      type: String,
      enum: ["text", "image", "textImage"],
    },
    
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
