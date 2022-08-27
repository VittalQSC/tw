import { getContext } from "context/context";
import express from "express";
import { authenticateToken } from "user/jwt-utils";

const router = express.Router();

router.get("/all-posts", async (req, res) => {
  try {
    const { prisma } = getContext();
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).send("somethign went wrong");
  }
});

router.post("/create-post", authenticateToken, async (req, res) => {
  try {
    const { prisma } = getContext();
    const result = await prisma.post.create({
      data: {
        content: req.body.content,
        authorId: req.body.ctx.user.id,
      },
    });
    res.json({ createdPost: result });
  } catch (error) {
    res.status(500).send("somethign went wrong");
  }
});

export const postRouter = router;
