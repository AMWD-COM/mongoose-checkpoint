// Create a `document` instance using the `Person` model you build before.
const Person = require("../models/person.model.js");

/** Create and Save a Person */

exports.createAndSavePerson = async (req, res) => {
    const { name, age, favoriteFoods } = req.body;
    let newPerson = new Person({ name, age, favoriteFoods });
    await newPerson.save(function (err, data) {
        if (err) {
            return res.status(500).send({
                message:
                    err.message ||
                    "some error occured while creating the new person",
            });
        } else {
            res.send(data);
            console.log(`${newPerson.name} was registred`);
        }
    });
};

/**Create Many Records with model.create() */

exports.createManyPerson = async (req, res) => {
    let arrayOfPerson = req.body;
    await Person.create(arrayOfPerson, function (err, data) {
        if (err) {
            return res.status(500).send({
                message:
                    err.message ||
                    "some error occured while creating the tutorial",
            });
        } else {
            res.send(data);
            console.log(`All Persons was registred`);
        }
    });
};

/**Use model.find() to Search Your Database*/

exports.findByName = async (req, res) => {
    //get  query params
    let name = req.params.name;
    //let condition to use as option to search
    let condition = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};
    //Find all the people having a given name, using Model.find() -> [Person]

    await Person.find(condition)
        .then((data) => {
            res.send(data);
            console.log(`${name} was founded`);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving tutorials.",
            });
        });
};

/**Use model.findOne() to Return a Single Matching Document from Your Database */
// Find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person.
// Use the function argument food as a search key.

exports.findOneByFood = async (req, res) => {
    // get one category req.params
    let { food } = req.params;

    await Person.findOne({ favoriteFoods: { $all: [food] } })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with favoriteFoods:  " + food,
                });
                return;
            }
            res.send(data);
            // console.log(`A person how like ${data} was found`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with food key: " + food,
            });
        });
};

/**Use model.findById() to Search Your Database By _id
Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key. */

exports.findPersonById = async (req, res) => {
    let id = req.params.id;
    await Person.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with id:  " + id,
                });
                return;
            }
            res.send(data);
            console.log(`A person with id : >> ${id} was found`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with id: " + id,
            });
        });
};

/**Perform Classic Updates by Running Find, Edit, then Save */

exports.findEditSavePerson = async (req, res) => {
    let foodToAdd = req.body.favoriteFoods;
    let id = req.params.id;
    await Person.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with id:  " + id,
                });
                return;
            }
            data.favoriteFoods.push(foodToAdd);
            data.save(function (err, data) {
                if (err) {
                    return res.status(500).send({
                        message:
                            err.message ||
                            "some error occured while updating the data with id :" +
                                id,
                    });
                } else {
                    res.send(data);
                    console.log(`${foodToAdd} was add successfully`);
                }
            });
            console.log(`A person with id : >> ${id} was Updated`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with id: " + id,
            });
        });
};

/**Perform New Updates on a Document Using model.findOneAndUpdate() */

exports.updatePerson = async (req, res) => {
    let { age } = req.body;
    let { name } = req.params;

    await Person.findOneAndUpdate({ name }, { age }, { new: true })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with name:  " + name,
                });
                return;
            }
            res.send(data);
            console.log(`A person named: ${name} was updated`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with name: " + name,
            });
        });
};

/**Delete One Document Using model.findByIdAndRemove */

exports.deleteByPersonId = async (req, res) => {
    let personId = req.params.id;

    await Person.findByIdAndRemove(personId)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with id:  " + personId,
                });
                return;
            }
            res.send(data);
            console.log(`A person with id : >> ${personId} was removed`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with id: " + personId,
            });
        });
};

/**MongoDB and Mongoose - Delete Many Documents with model.remove() */

exports.removeManyPeople = async (req, res) => {
    let { name } = req.params;
    await Person.remove({ name })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Person with name:  " + name,
                });
                return;
            }
            res.send(data);
            console.log(`A person with name : >> ${name} was removed`);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while retrieving Person with name: " + name,
            });
        });
};

/**Chain Search Query Helpers to Narrow Search Results */

exports.findPersonsByFood = (req, res) => {
    let { foodToSearch } = req.params;
    Person.find({ favoriteFoods: { $all: [foodToSearch] } })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 })
        .exec((err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error while retrieving Person with name: " +
                        foodToSearch,
                });
            } else {
                console.log("data :>> ", data);

                if (data.length <= 0) {
                    return res.status(404).send({
                        message: "Not found Person how liked:  " + foodToSearch,
                    });
                } else {
                    res.send(data);
                    console.log(
                        `A person with liked: >> ${foodToSearch} was found`
                    );
                }
            }
        });
};
