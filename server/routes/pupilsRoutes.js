const { Router } = require('express');
const { createPupil, getPupilsByTeacher, getAllPupils } = require('../controllers/pupilController');
const { isAdmin, isTeacher } = require('../middlewares/authMiddleware');
const router = Router();

router.post('/create-pupil', isTeacher, createPupil);
router.get('/pupil', isTeacher, getPupilsByTeacher);
router.get('/all', isAdmin, getAllPupils);

module.exports = router;
