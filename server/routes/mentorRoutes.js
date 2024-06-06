const { Router } = require('express');
const mentorController = require('../controllers/mentorController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', isAdmin, mentorController.getAllTeachers);
router.get('/:id', isAdmin, mentorController.getTeacherWithPupils);
router.post('/create-mentor', mentorController.createMentor);
router.put('/update-mentor/:id', mentorController.updateMentor);
router.delete('/delete-mentor/:id', mentorController.deleteMentor);

module.exports = router;

