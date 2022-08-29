import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./user/user";
import { postRouter } from "post/post";

const port = 3000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
