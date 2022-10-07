// Used for GET, POST, PUT, DELETE requests. Can be used for Postman testing or Thunder Client testing.

const express = require("express"); // Import express
const router = express.Router(); // Create express router
const { signup, login, getUser, verification } = require("../controllers/user-controller");
const User = require("../model/User"); // Import user model

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", getUser);
router.get("/verification", verification);

module.exports = router;
