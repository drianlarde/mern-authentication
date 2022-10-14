const express = require("express"); // Import express
const router = express.Router(); // Create express router
const { signup, login, getUser, verification } = require("../controllers/user-controller");
const User = require("../model/User"); // Import user model
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");

// Controllers
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abelardeadrianangelo@gmail.com",
    pass: "dkcjgxhrwpefzjrk",
  },
});

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

const getUsers = async (req, res, next) => {
  // Get all users
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

const updateVerified = async (req, res, next) => {
  // Update verified
  const { id } = req.body;
  User.findOneAndUpdate({ _id: id }, { verified: true }) // Update verified
    .then((result) => {
      res.status(200).json(result);
    });
};

const firstEmailVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  // const encryptedId = await bcrypt.hash(user._id.toString(), 10);
  // const encryptedIdFilteredSlash = encryptedId.replace(/\//g, "slash");

  const options = {
    from: "abelardeadrianangelo@gmail.com",
    to: email,
    subject: "First Email Verification",
    text: `Go to http://localhost:3000/update-verified/${user._id}`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({
    message: `Go to http://localhost:3000/update-verified/${user._id}`,
    id: user._id,
  });
};

const firstEmailVerificationUniqueLink = async (req, res) => {
  const { id } = req.params;
  // const decryptedIdFilteredSlash = id.replace(/slash/g, "/");

  const users = await User.find({}).sort({ createdAt: -1 });
  const user = users.map((user) => {
    if (user._id == id) {
      return user._id.toString();
    }
  });

  if (user) {
    User.findOneAndUpdate({ _id: user }, { verified: true }) // Update verified
      .then((result) => {
        res.status(200).json({ message: "Successfully Verified!", result: result });
      });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
};

const formatDatabase = async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "Deleted all users" });
};

const forgotPasswordSendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Email not found!" }); // Return error if user doesn't exist
  }

  const options = {
    from: "abelardeadrianangelo@gmail.com",
    to: email,
    subject: "First Email Verification",
    text: `Go to http://localhost:3000/forgot-password/${user._id}`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({
    message: `Go to http://localhost:3000/forgot-password/${user._id}`,
    id: user._id,
  });
};

const forgotPasswordUniqueLink = async (req, res) => {
  const { id } = req.params; // Get id from params
  const { newPassword, confirmPassword } = req.body; // Get new password and confirm password from request body

  const users = await User.find({}).sort({ createdAt: -1 });
  const previousPassword = users.map((user) => {
    if (user._id == id) {
      return user.password.toString();
    }
  }); // Get previous password

  if (!previousPassword) {
    res.status(404).json({ message: "User not found!" });
    // Return error if user doesn't exist
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Password does not match!" });
    // Return error if password and confirm password don't match
  }

  // const isNewPassSameAsPreviousPass = bcrypt.compareSync(newPassword, previousPassword);

  return res.status(200).json({ previousPassword: previousPassword, newPassword: newPassword });

  // if (isNewPassSameAsPreviousPass) {
  //   return res.status(400).json({ message: "Password shouldn't be the same with previous password" });
  //   // Return error if password and confirm password don't match
  // }

  // User.findOneAndUpdate({ _id: id }, { password: newPassword }) // Update password
  //   .then((result) => {
  //     res.status(200).json({ message: "Successfully Updated!", result: result });
  //   });
};

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.get(`/c0e0b35e-8943-4641-a35a-48113935133e`, getUsers);
router.get("/user", authenticateToken, getUser);
router.get("/verification", verification);
router.post("/update-verified", updateVerified);

router.post("/update-verified/send-email", firstEmailVerification); // Send an email
router.patch("/update-verified/:id", firstEmailVerificationUniqueLink);

router.post("/forgot-password/send-email", forgotPasswordSendEmail); // Send an email
router.patch("/forgot-password/:id", forgotPasswordUniqueLink);

router.delete("/e2883483-bb04-48de-b497-cefc9880d227", formatDatabase);

// Export router
module.exports = router;
