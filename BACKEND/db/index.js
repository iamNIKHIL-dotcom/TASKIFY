const mongoose = require("mongoose");

require('dontenv').config()

const connectToDatabase = async ()=>{
    try{
        await mongooose.connect(process.env.MONGO_URI);
        console.log("database connected");

    }catch(error){
        console.log("connection failed database ", error);
        process.exit(1);
    }
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username : String,
    password : String,
});

const TodoSchema = new Schema({
    userId : ObjectId,
    title : String,
    completed : Boolean,
});
const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    connectToDatabase,
    User,
    Todo,
};