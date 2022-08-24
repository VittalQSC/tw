import express from "express";
import { getContext } from "context/context";
import { User } from "@prisma/client";
import { authenticateAdminToken, authenticateToken, generateAccessToken } from "./jwt-utils";

const router = express.Router();

router.post("/create-user", async (req, res) => {
  const { prisma } = getContext();
  const user = req.body as User;

  try {
    await prisma.user.create({
      data: user,
    });

    res.json({ status: "success" });
  } catch (e) {
    res.json({ status: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { prisma } = getContext();
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
  
    if (user?.password === password) {
      const token = generateAccessToken(user);
      res.cookie("auth", token);
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(300).send("email or password is wrong");
    }
  } catch (error) {
    res.status(500).send("somethign went wrong");
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('auth');
  res.redirect('/')
})

router.get("/me", authenticateToken, (req, res) => {
  res.json(req.body?.ctx?.user);
});

router.get("/users", authenticateAdminToken, async (req, res) => {
  const { prisma } = getContext();
  const users = await prisma.user.findMany();
  res.json(users);
});

export const userRouter = router;
