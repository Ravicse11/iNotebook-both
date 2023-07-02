const dotenv=require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);


const connectToMongo = async () => {
    try {
       
        
       mongoose.connect(process.env.MONGO_URL);

        console.log("connected to mongoose");
    }

    catch (err) {
        console.log("failed", err);
    }





};


module.exports = connectToMongo;