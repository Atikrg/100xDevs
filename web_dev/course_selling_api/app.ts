import express from "express";
import authRouter from "./routes/auth.router";
import courseRouter from "./routes/courses.router";
import lessonRouter from "./routes/lessons.router";
import purchaseRouter from "./routes/purchases.router";
const app = express();

app.use(express.json());


app.use("/", authRouter);
app.use("/courses", courseRouter);
app.use("/lessons", lessonRouter);
app.use("/", purchaseRouter);

export default app;