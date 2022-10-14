// Dito ako naglalagay ng mga functions na gagamitin ko sa ibang file at mag momodify ng data sa database.
const User = require("../model/User"); // Import user model
const bcrypt = require("bcryptjs"); // Import bcrypt
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
let userLogged = "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abelardeadrianangelo@gmail.com",
    pass: "dkcjgxhrwpefzjrk",
  },
});

const signup = async (req, res, next) => {
  let invalidPassMessage = "Password must have: \n";
  const { name, email, password } = req.body;

  let existingUser = await User.findOne({ email: req.body.email }); // Find user by email

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Please fill out all fields!" }); // Return error if not all fields are filled out
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" }); // Return error if user already exists
  }

  // Check if password is valid, have symbols, numbers, and letters, capital letters, and is at least 6 characters long.
  if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm)) {
    if (!password.match(/^(?=.*[!@#$%^&*])/gm)) {
      invalidPassMessage = invalidPassMessage + "1 special character!\n";
    }
    // Check if the password have number
    if (!password.match(/^(?=.*\d)/gm)) {
      invalidPassMessage = invalidPassMessage + "1 number!\n";
    }
    // Check if the password have lowercase letter
    if (!password.match(/^(?=.*[a-z])/gm)) {
      invalidPassMessage = invalidPassMessage + "1 lowercase letter!\n";
    }
    // Check if the password have uppercase letter
    if (!password.match(/^(?=.*[A-Z])/gm)) {
      invalidPassMessage = invalidPassMessage + "1 uppercase letter!\n";
    }
    // Check if the password have 8 characters
    if (!password.match(/^(?=.{8,})/gm)) {
      invalidPassMessage = invalidPassMessage + "atleast 8 characters!\n";
    }

    return res.status(400).json({ message: invalidPassMessage });
  }

  const otpCode = Math.floor(1000 + Math.random() * 9000);

  const options = {
    from: "abelardeadrianangelo@gmail.com",
    to: email,
    subject: "Verification",
    text: otpCode + " is your email verification code.",
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  const hashedPassword = bcrypt.hashSync(password); // Hash password

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({ message: `Email verification sent to ${email}`, code: otpCode, id: user._id });
};

const login = async (req, res, next) => {
  userLogged = "";
  var isVerified = false;
  let existingUser;
  const { email, password } = req.body;

  try {
    existingUser = await User.findOne({ email: email }); // Find user by email
  } catch {
    return res.status(400).json({ message: "User not found. Please signup!" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  await User.findOne({ email: req.body.email }).then((user) => {
    isVerified = user;
  });

  if (!isVerified.verified) {
    return res.status(400).json({ message: "Please verify your email!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // Compare password

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email / password!" }); // Return error if password is incorrect
  }
  const accessToken = jwt.sign({ existingUser }, process.env.ACCESS_TOKEN_SECRET);

  userLogged = existingUser.email;
  return res.status(200).json({ message: "Logged in!", user: userLogged, accessToken: accessToken });
};

const getUser = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ email: userLogged }); // Find user by email
  } catch {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  return res.status(200).json({ message: "User found!", user: existingUser.name });
};

const verification = async (req, res, next) => {
  try {
    existingUser = await User.findOne({ email: userLogged }); // Find user by email
  } catch {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  const otpCode = Math.floor(1000 + Math.random() * 9000);

  const options = {
    from: "abelardeadrianangelo@gmail.com",
    to: userLogged,
    subject: "Verification",
    text: otpCode + " is your verification code.",
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({ message: `Enter the OTP you received to ${userLogged}`, code: otpCode });
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.verification = verification;
