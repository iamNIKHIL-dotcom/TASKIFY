const express = require('express')
const app = express()

const { connectToDatabase } = require("./db");
// const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
require("dotenv").config();

//middleware
app.use(express.json());

//routes 
// app.use("/todos",todoRouter);
app.use("/user", userRouter);

connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => console.log('server is running on port ${PORT}'))
})
