import { Router } from 'express';

import filepipeController from './filepipe.controller';

const router = Router();
router.get('/', filepipeController.getFilepipe);

export default router;
