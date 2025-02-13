import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authRepository from "./authRepository";

interface JwtPayload {
  userId: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await authRepository.readById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Toke invalide" });
    return;
  }
};
