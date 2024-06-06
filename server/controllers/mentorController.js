const  mentorService  = require('../services/mentorService');

exports.createMentor = async (req, res) => {
  const {username, firstname, lastname, phone, route} = req.body;
  try {
    const mentor = await mentorService.createMentor(username, firstname, lastname, phone, route);
    res.status(200).json({ mentor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Mentor.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeacherWithPupils = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Mentor.findByPk(id, {
      include: Pupil,
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMentor = async (req, res ) => {
  const { id } = req.params;
  const { username, firstname, lastname, phone, route} = req.body;
  try {
    const findMentor = await mentorService.getMentor(id);
    if(!findMentor) res.status(404).json({ message: 'Mentor not found'});
    
    findMentor.username = username || findMentor.username;
    findMentor.firstname = firstname || findMentor.firstname;
    findMentor.lastname = lastname || findMentor.lastname;
    findMentor.phone = phone || findMentor.phone;
    findMentor.route = route || findMentor.route

    await findMentor.save();

    res.status(200).json({ mentor: findMentor });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.deleteMentor = async (req, res) => {
  const { id } = req.params;
  try {
    await mentorService.deleteMentor(id);
    res.status(200).json({message: "Mentor deleted successfully"});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
