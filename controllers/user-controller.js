// Dito ako naglalagay ng mga functions na gagamitin ko sa ibang file at mag momodify ng data sa database.

const User = require("../model/User"); // Import user model
const bcrypt = require("bcryptjs"); // Import bcrypt
const nodemailer = require("nodemailer");
let userLogged = "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abelardeadrianangelo@gmail.com",
    pass: "dkcjgxhrwpefzjrk",
  },
});

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: req.body.email }); // Find user by email
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" }); // Return error if user already exists
  }
  const hashedPassword = bcrypt.hashSync(password); // Hash password
  // Hash password

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
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  userLogged = "";
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); // Find user by email
  } catch {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // Compare password

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email / password!" }); // Return error if password is incorrect
  }

  userLogged = existingUser.email;
  return res.status(200).json({ message: "Logged in!", user: userLogged });
};

// const verifyToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const token = cookies.split("=")[1];

//   if (!token) {
//     res.status(404).json({ message: "No token found" });
//   }
//   jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(400).json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//   });
//   next();
// };

const getUser = async (req, res, next) => {
  // Get the database and send a json response
  // Get the database and send a json response based on the user logged in (userLogged) find
  // the user in the database and send the user's data as a json response

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
  // Generate a 4 digit OTP code that expires in 10 seconds that is based on User model otpCode field
  try {
    existingUser = await User.findOne({ email: userLogged }); // Find user by email
  } catch {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Please signup!" }); // Return error if user doesn't exist
  }

  // Send a code as a json response
  return res.status(200).json({ message: `OTP code sent! to ${userLogged}`, code: otpCode });
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.verification = verification;
