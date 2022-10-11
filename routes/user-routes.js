// Used for GET, POST, PUT, DELETE requests. Can be used for Postman testing or Thunder Client testing.

const express = require("express"); // Import express
const router = express.Router(); // Create express router
const { signup, login, getUser, verification } = require("../controllers/user-controller");
const User = require("../model/User"); // Import user model
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", authenticateToken, getUser);
router.get("/verification", verification);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
