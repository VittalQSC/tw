import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export function getContext() {
    prisma ??= new PrismaClient();
    return {
        prisma
    };
}

export type Context = ReturnType<typeof getContext>;