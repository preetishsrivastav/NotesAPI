const express = require("express");
const { signup } = require("../controllers/userController");
const auth = require("../middlewares/auth");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const note = require("../models/note");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNote);

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);


module.exports = noteRouter;