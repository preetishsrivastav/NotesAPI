const noteModel = require("../models/note");

const createNote = async (req, res) => {

    const { title, description } = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try {

        await newNote.save();
        res.status(201).json(newNote);

        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}
const updateNote = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        // This new parameter  will create anew update and return it also
        await newNote.findByIdAndUpdate(id, newNote, { new: true });
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }


}

const deleteNote = async (req, res) => {
    const id = req.params.id

    // 200 status code represent that delete is successfull
    try {
        const note = noteModel.findByIdAndRemove(id);
        res.status(202).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

}

const getNote = async (req, res) => {
    try {

        const notes = await noteModel.find({ userId: req.userId });
        res.status(201).json(notes);

    }catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong"});
    }


}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote
}