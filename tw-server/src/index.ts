import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./user/user";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
