const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorhandler");
const userRouter = require("./routes/userRoute");
const transactionRouter = require("./routes/transactionRoute");

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);

app.use(errorHandler);

connectDB()
.then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});
