import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import { verifyToken } from "./modules/auth/authMiddleware";
// Define item-related routes
import eventActions from "./modules/event/eventActions";
import itemActions from "./modules/item/itemActions";
import participationActions from "./modules/participation/participationActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", eventActions.add);

router.get("/api/event/:eventId", participationActions.readByEventId);

router.post("/api/auth/login", authActions.login);
router.post("/api/auth/register", authActions.register);
router.post("/api/auth/logout", authActions.logout);
router.get("/api/auth/verify", verifyToken, authActions.verify);

/* ************************************************************************* */

export default router;
