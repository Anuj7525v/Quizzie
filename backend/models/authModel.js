const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizzes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "quiz",
    }]
    
      
},
{ timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);