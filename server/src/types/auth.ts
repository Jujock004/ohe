import { Request } from "express";

interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
