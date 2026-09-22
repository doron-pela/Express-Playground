import express from 'express';

import {
    userRouteGetController,
    userRoutePostController,
} from '@/controllers/userController';

const router = express.Router();

//A Route: HTTP verb + Path -> controller mapping

router.get('/', userRouteGetController);

router.post('/', userRoutePostController);

export default router;
