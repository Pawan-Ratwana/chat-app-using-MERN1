const User = require('../model/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
}

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Validate input fields
        if (!email || !name || !password) {
            return res.status(400).json({ error: "All input fields are required. Please enter all fields." });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Please enter a valid email address." });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Please enter a strong password. it contain atleast one uppercase, one special character like @,#,$etc or min 8 character" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = createToken(newUser._id);

        // Respond with user details and token
        // res.status(200).json({ user: { _id: newUser._id, name, email }, token });
        res.status(200).json({ user: { _id: newUser._id, name: newUser.name, email: newUser.email }, token });
    } catch (error) {
        console.error("Error occurred during user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json("Invalid email or password");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid Password");

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email: user.password, token });

    } catch (error) {
        console.error("Error occurred during user login: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        res.status(200).json({ user })
    } catch (error) {
        console.error("Error to finding the user by id");
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports.getUser = async (req, res) => {
    try {
        let users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error("Error to finding the users");
        res.status(500).json({ error: "Internal server error" });
    }
}