import { getContext } from "context/context";
import express from "express";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const { prisma } = getContext();
    try {
        const profile = await prisma.profile.findFirst({
            where: {
                userId: +req.params.userId
            }
        });

        res.json(profile);
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

export const profileRouter = router;