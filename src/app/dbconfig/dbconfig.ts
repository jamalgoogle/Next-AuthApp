import mongoose from "mongoose";

export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_RUL!);
        const connection = mongoose.connection;

        connection.on("connection", (err) => {
            console.log("connecting to MongoDB: ");
        });
        
        connection.on("error", (err) => {
            console.log('mongoDB connection error' + err);
            process.exit();
        });
    } catch (error) {
        console.log('somthing went wrong' + error);
    }
}