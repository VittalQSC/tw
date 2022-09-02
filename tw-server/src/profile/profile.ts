import { getContext } from "context/context";
import express, { json } from "express";
import { authenticateToken } from "user/jwt-utils";

const router = express.Router();

router.get("/:userId/followers", async (req, res) => {
    const { prisma } = getContext();
    try {
        const fofs = await prisma.followerOnFollowed.findMany({
            where: {
                OR: [
                    { followerId: +req.params.userId },
                    { followedId: +req.params.userId },
                ]
            }
        });
        res.json(fofs);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
})

router.post("/:userId/follow", authenticateToken, async (req, res) => {
    const { prisma } = getContext();
    try {
        if (req.body.ctx.user.id === +req.params.userId) {
            res.status(400).send('you can not follow yourself!');
        } else {
            const fof = await prisma.followerOnFollowed.upsert({
                where: {
                    followedId_followerId_key: {
                        followerId: req.body.ctx.user.id,
                        followedId: +req.params.userId,
                    }
                },
                update: {},
                create: {
                    followerId: req.body.ctx.user.id,
                    followedId: +req.params.userId,
                }
            });
            res.json(fof);
        }
    } catch (error) {
        res.status(500).send("something went wrong");
    } 
});

router.post("/:userId/unfollow", authenticateToken, async (req, res) => {
    const { prisma } = getContext();
    try {
        const fof = await prisma.followerOnFollowed.delete({
            where: {
                followedId_followerId_key: {
                    followerId: req.body.ctx.user.id,
                    followedId: +req.params.userId,
                }
            },
        });

        res.json(fof);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
})

router.get("/:userId", async (req, res) => {
    const { prisma } = getContext();
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: +req.params.userId,
            },
            include: {
                profile: true,
                followers: true,
                followed: true,
            },
        });

        res.json(user);
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

export const profileRouter = router;