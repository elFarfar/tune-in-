import User from "../models/User.js";
import bcrypt from "bcryptjs";

//GET ALL USERS

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// UPDATE USER_ROLE

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
};

//DELETE_USER

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found!" });

    await User.deleteOne();
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user!" });
  }
};

//ADD NEW USER

export const addNewUser = async (req, res) => {
  try {
    const { username, role, password, email } = req.body;

    //VALIDATE
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //CHECK IF USER EXIST
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE NEW USER
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Add new user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
