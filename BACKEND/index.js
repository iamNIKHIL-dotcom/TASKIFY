const express = require('express')
const app = express()

const { conectToDatabase } = require("./db");
require("dotenv").config();

//middleware
app.use(express.json());

//routes 
app.use("/todos",todRouter);
app.use("/user", userRouter);

conectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => console.log('server is running on port ${PORT}'))
})
