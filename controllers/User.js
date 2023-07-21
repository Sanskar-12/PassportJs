import { User } from "../models/User.js";

export const register = async (req, res, next) => {
  const { name, username, password } = req.body;
  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  user = await User.create({
    name,
    username,
    password,
  });
  res.status(200).json({
    success: true,
    message: "User created",
  });
};

export const login = async (req, res, next) => {};

export const profile = (req, res, next) => {
  res.send(req.user);
};

export const logout = (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
