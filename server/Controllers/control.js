const UserService = require("../Services/userServices");

const createUser = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    user = UserService.createUser(name,email, password);
    if (user) {
      return res
        .status(200)
        .json({ status: 201, message: "Succesfully Created User" });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user alreeady exits" });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
const bcrypt = require('bcrypt'); // Ensure bcrypt is required

const getUser = async (req, res) => {
  try {
    const { email, password } = req.query; // Using query params
    const users = await UserService.getUsers(email); // Fetch user based on email

    if (users.length === 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const user = users[0]; // Assuming first user is the correct one
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed password

    if (isPasswordValid) {
      return res.status(200).json({ status: 200, data: user });
    } else {
      return res.status(400).json({ status: 400, message: "Invalid password" });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.userLogin(email, password);
    console.log(user);
    if (user) {
      return res.status(200).json({
        status: 200,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        message: "user successfully logged in",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = { createUser, getUser, loginUser };