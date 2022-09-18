import { getContext } from "context/context";
import express from "express";

const router = express.Router();

router.get("/search-user", async (req, res) => {
    try {
        const { prisma } = getContext();
        const results = await prisma.user.findMany({
            where: {
                name: {
                    contains: `${req?.query?.search}`,
                }
            }
        });

        res.json(results);
    } catch (error) {
        
    }
});

export const suggestRouter = router;