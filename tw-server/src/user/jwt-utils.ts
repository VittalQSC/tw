import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import express from "express";

export function generateAccessToken(user: User) {
  return jwt.sign(user, "secret", { expiresIn: "1800s" });
}

function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secret", (err: any, user: User) => {
      err && reject(err);
      const { password: _, ...userWithoutPassword } = user;
      resolve(userWithoutPassword);
    });
  });
}

export async function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.auth;
  if (token == null) return res.sendStatus(401);

  // jwt.verify(token, "secret", (err: any, user: User) => {
  //   if (err) return res.sendStatus(403);

  //   const { password: _, ...userWithoutPassword } = user;
  //   req.body = { ...req.body, ctx: { user: userWithoutPassword } };

  //   next();
  // });
  try {
    const user = await verifyToken(token);
  
    req.body = { ...req.body, ctx: { ...req.body?.ctx, user } };
    next();
  } catch (error) {
    res.sendStatus(403)
  }
}

export async function authenticateAdminToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.auth;
  if (token == null) return res.sendStatus(401);

  try {
    const user = await verifyToken(token) as User;
  
    if (user.roleName !== "ADMIN") {
      return res.sendStatus(403)
    }

    req.body = { ...req.body, ctx: { ...req.body?.ctx, user } };
    next();
  } catch (error) {
    res.sendStatus(403)
  }
}
