const User = require('../model/user');

module.exports.home = (req, res) => {
    res.send("<h1>Welcome to our chat application home page.</h1>")
}



// user controller better code
// const User = require('../model/user');
// const bcrypt = require('bcrypt');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');

// const createToken = (_id) => {
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;
//     return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
// }

// module.exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         // Validate input fields
//         if (!email || !name || !password) {
//             return res.status(400).json({ error: "All input fields are required. Please enter all fields." });
//         }
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ error: "Please enter a valid email address." });
//         }

//         // Check password strength
//         const passwordStrengthError = checkPasswordStrength(password);
//         if (passwordStrengthError) {
//             return res.status(400).json({ error: passwordStrengthError });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create a new user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         // Generate JWT token
//         const token = createToken(newUser._id);

//         // Respond with user details and token
//         res.status(200).json({ user: { _id: newUser._id, name, email }, token });
//     } catch (error) {
//         console.error("Error occurred during user registration:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

// function checkPasswordStrength(password) {
//     if (password.length < 8) {
//         return "Password must be at least 8 characters long.";
//     }
//     if (!/[A-Z]/.test(password)) {
//         return "Password must contain at least one uppercase letter.";
//     }
//     if (!/[a-z]/.test(password)) {
//         return "Password must contain at least one lowercase letter.";
//     }
//     if (!/[0-9]/.test(password)) {
//         return "Password must contain at least one digit.";
//     }
//     if (!/[$@$!%*?&]/.test(password)) {
//         return "Password must contain at least one special character.";
//     }
//     return null; // Password meets all criteria
// }
