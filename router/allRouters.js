const express = require("express");
const router = express.Router();
const shelterController = require("../controllers/shelterControler");

router.get("/shelters", shelterController.getAllShelters);
router.get("/shelter/:id", shelterController.getShelterById);

router.post("/shelter", shelterController.shelter_post);

router.delete("/shelter/:id", shelterController.shelter_delete);

router.put("/shelter/:id", shelterController.shelter_put);

router.use((req, res) => {
    res.status(400).json({ message: "Route not found" });
  });

module.exports = router;
