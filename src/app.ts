import express, { Application } from "express";
const app: Application = express();
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRouter from "./routes/user.routes";
import tasksRouter from "./routes/tasks.router";
import * as jwt from "jsonwebtoken";
import cors from 'cors'
const mysecret = "secret";

dotenv.config();
let PORT = process.env.PORT || 3002;


app.use(cors())
app.use(express.json());
connectDB();

app.use("/users", userRouter);
app.use("/tasks", tasksRouter);


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
