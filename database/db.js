const mongoose = require("mongoose");
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected..");
  } catch (err) {
    console.error(err.message);
    //exit process w failure
    process.exit(1);
  }
};

module.exports = connectDB;
