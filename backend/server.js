const express = require("express");
const cors = require("cors");

const connectDB = require("./database/connectDB");
const taskRouter = require("./routes/taskRouter");

// Express server
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// DB and API
connectDB();
app.use("/api/tasks", taskRouter);

// Start server on target port
app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`);
});
