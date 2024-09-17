const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
dotenv.config();
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const quizRoute = require("./routes/quizRoute");
const userRoute = require("./routes/userRoute");



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.use(cors({
   origin: "*"
}));

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: 'a', });
const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), { flags: 'a', });



app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleTimeString()}`;
    const log = `${req.method} ${req.originalUrl} ${time}`;
    logStream.write(log + '\n');
    next();
});

app.use("/api/auth",authRoute);
app.use("/api/quiz",quizRoute);
app.use("/api/user",userRoute);






app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + '\n');
    res.status(404).send("Route not found !");
});

app.use((err, req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + err.stack + '\n');
    res.status(500).send("Internal Sever Error");
});



app.get('/', (req, res) => {
    res.send("all good.").status(200);
})






app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.mongoose_Url).then(() => {
        console.log('server is running with Mdb :)')
    }).catch((error) => {
        console.log(error)
    })
})

