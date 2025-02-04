// const mongoose = require("mongoose");
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    // Check if the connection is already established
    if (mongoose.connection.readyState !== 1) {
      const connectionString = process.env.mongodbConnectionString;
      if (!connectionString) {
        throw new Error("Mongodb connection string is not defined");
      }
      await mongoose.connect(connectionString);
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.error("Mongodb Connection Failed:", error);
  }
};

export default dbConnect;



// // const mongoose = require("mongoose");
// import mongoose from "mongoose";

// const dbConnect = async () => {
//   try {
//     // Check if the connection is already established
//     if (mongoose.connection.readyState !== 1) {
//       await mongoose.connect(process.env.mongodbConnectionString);
//       console.log("Mongodb Connected");
//     }
//   } catch (error) {
//     console.error("Mongodb Connection Failed:", error);
//   }
// };

// export default dbConnect;



