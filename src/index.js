const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const noteRouter = require("./router/noteRouter");
const dotenv = require("dotenv");
const cors = require("cors");

// It will add environment variables to our system
dotenv.config();
const mongoose = require("mongoose");


//Remember to use Express.json() before your routes
app.use(express.json());

// It will allow our api to be acesses all origins
app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);


app.get("/", (req, res) => {
    res.send("Note API");
})

const PORT = process.env.PORT || 5000


mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, () => {
            console.log("Server has started at port no."+PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

