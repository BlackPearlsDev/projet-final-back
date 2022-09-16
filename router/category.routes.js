import express from 'express';
import { create, getAll, deleteCategory } from '../controllers/category.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// GET
router.get("/all", getAll);

//POST
// router.post("/create", auth, create); // TODO: à remettre quand on sera connecté
router.post("/create", create);

// DELETE
router.delete("/delete/:id", deleteCategory);

export default router;