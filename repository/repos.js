const Shelter = require('../models/mydataSchema');

const getAllShelters = async () => {
    try {
    const shelters = await Shelter.find();
    return shelters;
    } 
    catch{
        return false;
    }
};

const getShelterById = async shelterId => {
    try {
        const shelter = await Shelter.findById(shelterId);
        return shelter;
    } 
    catch{
        return false;
    }
};

const addShelter = async shelterData => {
    try {
        const newShelter = new Shelter(shelterData);
        await newShelter.save();
        return newShelter;
    } 
    catch{
        return false;
    }
};

const updateShelter = async (shelterId, shelterData) => {
    try {
        const updatedShelter = await Shelter.findByIdAndUpdate(shelterId, shelterData, { new: true });
        return updatedShelter;
    } 
    catch{
        return [];
    }
};

const deleteShelter = async shelterId => {
    try {
        const deletedShelter = await Shelter.findByIdAndDelete(shelterId);
        return deletedShelter;
    } 
    catch{
        return false;
    }

};

module.exports = {
    getAllShelters,
    getShelterById,
    addShelter,
    updateShelter,
    deleteShelter
};