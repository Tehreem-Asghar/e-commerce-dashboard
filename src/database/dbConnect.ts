const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Check if the connection is already established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.mongodbConnectionString);
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.error("Mongodb Connection Failed:", error);
  }
};

export default dbConnect;



