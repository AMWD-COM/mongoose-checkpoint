const Person = require("../controllers/person.controller.js");

const router = require("express").Router();
// Create a one and new person
router.post("/person/register", Person.createAndSavePerson);
// Create a many and news persons
router.post("/persons/register", Person.createManyPerson);
// Retrieve all persons (with name if exist or without)
router.get("/persons/name/:name", Person.findByName);
// Retrieve person with food key
router.get("/persons/food/:food", Person.findOneByFood);
// Retrieve person with id
router.get("/persons/id/:id", Person.findPersonById);
// Classic Update : Find, Edit then Save
router.patch("/update/:id", Person.findEditSavePerson);
// New Update : Use `findOneAndUpdate()`
router.patch("/updatePerson/:name", Person.updatePerson);
// Delete one Person by Id
router.delete("/deletePerson/:id", Person.deleteByPersonId);
//Delete many People
router.delete("/deleteAll/:name", Person.removeManyPeople);
// Find person by favoriteFoods and use Chain Query helpers
router.get("/foodToSearch/:foodToSearch", Person.findPersonsByFood);

module.exports = router;
