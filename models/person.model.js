/** Create a 'Person' Model */
// Create a person having this prototype :

// - Person Prototype -
// --------------------
// name : string [required]
// age :  number
// favoriteFoods : array of strings (*)

const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    favoriteFoods: [String],
});
//virtual field
// personSchema.virtual('id').get(function () {
//     return this._id
// })

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
