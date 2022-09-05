import { getContext } from "context/context";
import express from "express";
import { authenticateToken } from "user/jwt-utils";

const router = express.Router();

router.get("/all-posts", async (req, res) => {
  try {
    const { prisma } = getContext();
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true,
        retwiis: {
          include: {
            replacedPost: {
              include: {
                author: true,
              },
            },
          },
        },
        replaceByRetwii: {
          include: {
            post: {
              include: {
                author: true,
                likes: true,
                retwiis: true,
              },
            },
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send("something went wrong");
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
      include: {
        author: true,
      },
    });
    res.json({ createdPost: result });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/like", authenticateToken, async (req, res) => {
  try {
    const { prisma } = getContext();
    const result = await prisma.like.create({
      data: {
        likerId: req.body.ctx.user.id,
        likedId: req.body.likedPostId,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/unlike", authenticateToken, async (req, res) => {
  try {
    const { prisma } = getContext();
    const result = await prisma.like.delete({
      where: {
        likerId_likedId: {
          likerId: req.body.ctx.user.id,
          likedId: req.body.unlikedPostId,
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/retwii", authenticateToken, async (req, res) => {
  try {
    const { prisma } = getContext();

    const retwii = await prisma.post.create({
      data: {
        authorId: req.body.ctx.user.id,
        replaceByRetwii: {
          create: {
            postId: +req.body.postId,
            comment: req.body.comment,
          },
        },
      },
    });

    const post = await prisma.post.findFirst({
      where: {
        id: retwii.id
      },
      include: {
        author: true,
        likes: true,
        retwiis: {
          include: {
            replacedPost: {
              include: {
                author: true,
              },
            },
          },
        },
        replaceByRetwii: {
          include: {
            post: {
              include: {
                author: true,
                likes: true,
                retwiis: true,
              },
            },
          },
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

export const postRouter = router;
