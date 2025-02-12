import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import eventActions from "./modules/event/eventActions";
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", eventActions.add);

/* ************************************************************************* */

export default router;
