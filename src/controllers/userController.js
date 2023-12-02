const bcrypt = require('bcrypt');
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
    // check existing user
    // hashed password
    // user create
    // token generate

    const { username, email, password } = req.body;
    console.log(username, password, email);
    console.log(req.body);

    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already present" });
        }
        // let hashedPassword = null;
        const saltRounds = 10;
        // bcrypt.genSalt(saltRounds, function (err, salt) {
        //     bcrypt.hash(password, salt, function (err, hash) {
        //         // Store hash in your password DB.
        //         console.log("sahi hai password",password);

        //         hashedPassword = hash
        //         console.log("sahi hai",hashedPassword);
        //     });
        // });

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPassword =await bcrypt.hash(password,salt);
        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        console.log(password, hashedPassword);


        const token = jwt.sign({ email: result.email, userId: result._id }, SECRET_KEY);
        return res.status(200).json({ user: result, token: token });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}


const signin = async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = await userModel.findOne({ email: email });
        console.log(existingUser);
        console.log(existingUser.password);
        if (existingUser) {
            console.log(existingUser.hashedPassword);
            const matchPassword = await bcrypt.compare(password, existingUser.password);
            console.log(matchPassword);
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid credential" });
            }
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

            return res.status(200).json({ user: existingUser, token: token });
        } else {
            return res.status(404).json({ message: "User not found" });
        }


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });

    }

}


module.exports = { signin, signup };