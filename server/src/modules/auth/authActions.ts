import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import authRepository from "./authRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authRepository.readByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }
    const isValidPassword = await authRepository.verifyPassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};

const verify: RequestHandler = async (req, res) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (err) {
    res.status(401).json({ message: "Non authentifié" });
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { pseudo, email, password, avatar_url } = req.body;

    // Validation basique
    if (!pseudo || !email || !password) {
      res.status(400).json({
        message: "Pseudo, email et mot de passe sont requis",
      });
      return;
    }

    // Vérifier si l'email existe déjà
    const emailExists = await authRepository.emailExists(email);
    if (emailExists) {
      res.status(400).json({
        message: "Cet email est déjà utilisé",
      });
      return;
    }

    // Vérifier si le pseudo existe déjà
    const pseudoExists = await authRepository.pseudoExists(pseudo);
    if (pseudoExists) {
      res.status(400).json({
        message: "Ce pseudo est déjà utilisé",
      });
      return;
    }

    // Créer l'utilisateur
    const userId = await authRepository.create({
      pseudo,
      email,
      password,
      avatar_url: avatar_url || null,
    });

    // Créer le token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Envoyer le cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Répondre avec succès
    res.status(201).json({
      message: "Compte créé avec succès",
      user: {
        id: userId,
        pseudo,
        email,
        avatar_url: avatar_url || null,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { login, logout, verify, register };
