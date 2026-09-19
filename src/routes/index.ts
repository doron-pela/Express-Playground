import express from 'express';
import indexController from "@/controllers/indexController";
const router = express.Router();

//A Route: HTTP verb + Path -> controller mapping

router.get("/", indexController);

export default router;