import express from 'express';
import filepipeRouteGetController from "@/controllers/filepipeController";
const router = express.Router();

//A Route: HTTP verb + Path -> controller mapping

router.get("/", filepipeRouteGetController);

export default router;
