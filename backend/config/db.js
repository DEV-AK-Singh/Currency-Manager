const mongoose = require("mongoose");

const connectDB = async (res, rej) => {
  return new Promise(async (resolve, reject) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        resolve(conn);
    } catch (error) {
        reject(error);
    }
  });
};

module.exports = connectDB;
