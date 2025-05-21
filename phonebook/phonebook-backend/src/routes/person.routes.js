const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/person.controller");
const {
  validationMiddleware,
} = require("../middleware/validation/person-api.validator.middleware");

// Apply validation middleware to all routes
router.use(validationMiddleware);

router.get("/", PersonController.getAllPersons);
router.get("/:id", PersonController.getOneById);
router.post("/", PersonController.createPerson);
router.put("/:id", PersonController.updatePerson);
router.delete("/:id", PersonController.deletePerson);

module.exports = router;
