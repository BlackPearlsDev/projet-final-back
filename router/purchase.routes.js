import express from 'express';
import { create, getAll } from '../controllers/category.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// GET
// router.get("/all", getAll);

//POST
// router.post("/create", create);

export default router;