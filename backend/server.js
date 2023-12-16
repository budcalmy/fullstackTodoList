const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require('./routes/ToDoRoute');
const userRoutes = require('./routes/usersRoute');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB started successfully"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(todoRoutes);
app.use(userRoutes);

app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
