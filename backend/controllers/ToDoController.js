const todoModel = require("../models/TodoModel");

module.exports.getToDo = async (req, res) => {
  const todo = await todoModel.find();
  res.send(todo);
};

module.exports.saveToDo = async (req, res) => {
  const todo = req.body;

  todoModel
    .create(todo)
    .then((data) => {
      console.log("Successfully create todo, text: " + data.toString());
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = async (req, res) => {

  const _id = req.query._id;

  todoModel
    .findByIdAndDelete(_id)
    .then(() => res.send("Deleted successfully..."))
    .catch((err) => console.log(err));
};
