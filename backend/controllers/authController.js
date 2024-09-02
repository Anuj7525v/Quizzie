const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");


// Register New Users...

 const registerUser = async (req, res, next) => {
    try {
        const { username,email, password } = req.body;
        if ( !username || !email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        const existAuth = await Auth.findOne({ email });
        if (existAuth) {
            return res.status(400).send("This Auth Already exists..");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAuth = new Auth({
            username,
            email,
            password: hashPassword,
           
           
        });
        await newAuth.save();
        res.status(200).send("Auth register succesfully..");
        
    }
    catch (error) {
        next(error.message);
        
    }
};

//  Login Users......


 const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send( "Please fill in all fields" );
        }
        const auth = await Auth.findOne({ email });
        if (!auth) {
            return res.status(400).send( "Invalid Email or Password" );
        }
        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) {
            return res.status(400).send( "Invalid Email or Password" );
        }
        const token = jwt.sign({ id: auth._id }, process.env.SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        res.status(200).json({     
            token,
            authId:auth._id,
            email:auth.email,
            name:auth.username,
        });
    }
    catch (error) {
        next(error.message);
    }

};

module.exports = {loginUser,registerUser};