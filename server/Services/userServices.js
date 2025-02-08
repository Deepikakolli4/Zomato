const User = require("../Schema/schema");
const bcrypt = require("bcrypt");
const utils = require("../Utils/util");

// Get all users
const getUsers = async () => {
  try {
    const users = await User.find();
    console.log(users, "helloo");
    return users;
  } catch (error) {
    throw Error("Error in Fetching Users");
  }
};

// Create a new user
const createUser = async (name, email, password) => {
  try {
    // Validate name
    if (!name || name.trim() === "") {
      throw Error("Name is required");
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }

    // Ensure password is valid
    if (!password || password.trim() === "") {
      console.log(password);
      throw Error("Password is required");
    }

    // Encrypt password with a salt round of 10
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: encryptedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw Error(error.message); 
  }
}

// User login
const userLogin = async (email, password) => {
  try {
    // Find user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw Error("Not an existing user");
    }

    // Compare the entered password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      throw Error("Invalid Password");
    }

    // Generate tokens
    const access_token = await utils.generateAccessToken(existingUser);
    const refresh_token = await utils.generateRefreshToken(existingUser);

    return { access_token, refresh_token, existingUser };
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getUsers, createUser, userLogin };
