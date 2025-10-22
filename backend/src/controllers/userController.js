import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    //Check fields
    if (!username || !password || !email || !role) {
      return res.status(400).json({ message: "All fields are empty " });
    }

    //Check existing User
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE USER
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: " User crated succefully!", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if email & Username exists
    if (!email || !password) {
      return res.status(400).json({ message: "Mail & Password required" });
    }

    //FIND USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //CHECK PASSWORD

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Create JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1id" }
    );

    res.status(200).json({ message: "Login succeful", token });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
