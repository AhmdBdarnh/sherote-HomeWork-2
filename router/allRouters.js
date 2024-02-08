const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterControler');

router.get("/", shelterController.getAllShelters);
router.get("/:id", shelterController.getShelterById);

router.post("/", shelterController.shelter_post);

router.delete("/:id", shelterController.shelter_delete);

router.put("/:id", shelterController.shelter_put);

module.exports = router;
