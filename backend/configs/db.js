import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>
            console.log("Connected to MongoDB")
     );
       await mongoose.connect(process.env.MONGODB_URI, {
      family: 4, // ⭐ FORCE IPv4 (fixes SRV issnues)
    });


    } catch (error) {
        console.error(error.message);

    }
}

export default connectDB;

