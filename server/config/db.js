import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () =>{
    try {
        const res= await mongoose.connect(process.env.MONGO_URI);
        if(res) console.log(`Connected Successfully to Database (waterDip)`);
        else process.exit(0);
    } catch (error) {
        console.log(`Error in Connection With Database ${error}`);
    }
}

export default connectToMongo;