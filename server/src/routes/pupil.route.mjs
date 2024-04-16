import { Router } from "express";
import { createPupil, updatePupil, patchPupil, deletePupil, getPupils } from "../controllers/pupil/pupil.controller.mjs";
import { createPupilValidationSchema } from "../utils/validation-schemas.mjs";
import { checkSchema } from "express-validator";

const router = Router();

router.get('/pupils', getPupils);

router.post('/create-pupil', checkSchema(createPupilValidationSchema) ,createPupil);

router.put('/pupils/:id', checkSchema(createPupilValidationSchema), updatePupil);

router.patch('/pupils/:id', checkSchema(createPupilValidationSchema), patchPupil);

router.delete('/pupils/:id', deletePupil);

export default router;
