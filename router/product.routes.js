import express from 'express';
import { getAll, getOne, create, addImg, update, getDetails, remove } from '../controllers/product.js';

const router = express.Router();

// GET
router.get("/all", getAll);
router.get('/:id', getDetails);
router.get("/:col_name/:value", getOne);

// POST
router.post("/create", create);
router.post("/addImg", addImg);

// PATCH
router.patch("/:id", update);

// DELETE
router.delete("/:id", remove);

export default router;