const shelterRepository = require('../repository/repos');
const { NotFoundError, BadRequsetError } = require('../errors/errors');

// delete shelter from db
const shelter_delete = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === ':id') throw new BadRequsetError('id');
    const deletedShelter = await shelterRepository.deleteShelter(id);
    if (!deletedShelter || deletedShelter.length === 0) throw new NotFoundError(`Shelter with ${id}`);
    return res.status(200).send(deletedShelter);
  } 
  catch (err) {
    res.status(err?.status || 500).json({ message: err.message });
  }
};

// add new shelter to db
const shelter_post = async (req, res) => {
  try {
    const new_shelter = await shelterRepository.addShelter(req.body);
    if (!new_shelter) throw new BadRequsetError(`Shelter implement is not true`);
    return res.status(200).send(new_shelter);
  } 
  catch (err) {
    res.status(err?.status || 500).json({ message: err.message });
  }
};

// get all shelters in db
const getAllShelters = async (req, res) => {
  try {
    const shelters = await shelterRepository.getAllShelters();
    if (!shelters || shelters.length === 0) throw new NotFoundError('shelters');
    return res.status(200).send(shelters);
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};

// get shelter by id
const getShelterById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === ':id') throw new BadRequsetError('id');
    const shelter = await shelterRepository.getShelterById(id);
    if (!shelter || shelter.length === 0) throw new NotFoundError(`Shelter with ${id}`);
    return res.status(200).send(shelter);
  } 
  catch (err) {
    res.status(err?.status || 500).json({ message: err.message });
  }
};

// update shelter in db
const shelter_put = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === ':id') throw new BadRequsetError('id');
    const updatedShelter = await shelterRepository.updateShelter(id, req.body);
    if (!updatedShelter || updatedShelter.length === 0) throw new NotFoundError(`Shelter with ${id}`);
    return res.status(200).send(updatedShelter);
  } 
  catch (err) {
    res.status(err?.status || 500).json({ message: err.message });
  }
};

module.exports = {
  shelter_delete,
  shelter_put,
  shelter_post,
  getAllShelters,
  getShelterById,
};
