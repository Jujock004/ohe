import argon2 from "argon2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  avatar_url: string | null;
};

class AuthRepository {
  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User | undefined;
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, password);
  }

  async readById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select id, pseudo, email, avatar_url, from user where id = ?",
      [id],
    );
    return rows[0] as Omit<User, "password"> | undefined;
  }

  async create(user: Omit<User, "id">) {
    try {
      const hashedPassword = await argon2.hash(user.password);
      const query =
        "insert into user (pseudo, email, password, avatar_url) values (?, ?, ?, ?)";
      const params = [user.pseudo, user.email, hashedPassword, user.avatar_url];
      const [result] = await databaseClient.query<Result>(query, params);
      return result.insertId;
    } catch (error) {
      if ((error as { code: string }).code === "ER_DUP_ENTRY") {
        throw new Error("Cet email ou pseudo est déjà utilisé");
      }
      throw new Error("Erreur lors de l'ajout d'un utilisateur");
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT 1 FROM user WHERE email = ?",
      [email],
    );
    return rows.length > 0;
  }

  async pseudoExists(pseudo: string): Promise<boolean> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT 1 FROM user WHERE pseudo = ?",
      [pseudo],
    );
    return rows.length > 0;
  }
}

export default new AuthRepository();
