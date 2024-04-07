import { Router } from 'express';
import mentorRouter from './mentor.route.mjs';
import authRouter from './auth.route.mjs';
// import pupilRouter from './pupils.mjs';

const router = Router();

router.use('/api', mentorRouter);
router.use('/api', authRouter);
// router.use('/api', pupilRouter);

export default router;