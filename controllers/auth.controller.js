import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // add user in database
  const user = await User.create({
    username:name,
    email,
    password: hashedPassword,
  });

  await user.save();

  if (user) {
    return res.status(201).json({ message: "User created successfully" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  // check if user exists

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if password is correct

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // create token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({ message: "Login successful", token });
};

export const logout = (req, res) => {
  res.send("Hello World!");
};
