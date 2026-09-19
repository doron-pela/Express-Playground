import express from 'express'
const router = express.Router();
import {
  userRouteGetController,
  userRoutePostController,
} from "@/controllers/userController";

//A Route: HTTP verb + Path -> controller mapping

router.get("/", userRouteGetController);

router.post("/", userRoutePostController);

export default router;