// This creates a new model class called User that contains the following fields:
// - name: string
// - email: string
// - password: string
// This model is used to store user information in the database inside MongoDB.

// Parang gumagawa ako ng Table sa SQL. Ang mga fields na ito ay mga column sa Table.
// Tapos i-eexport ko ito para ma-access ko ito sa ibang file. Ang ibang file na ito ay yung mga file na nasa routes folder.
// Fill-upan

const mongoose = require("mongoose"); // Import mongoose
const Schema = mongoose.Schema; // Create mongoose schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}); // Create user schema

module.exports = mongoose.model("User", userSchema); // Export user schema
