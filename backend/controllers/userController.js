const UserModel = require("../models/userModel.js");
const QuizAttempt = require("../models/quizModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    list: async function (req, res) {
        try {
            const users = await UserModel.find();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: "Error when getting users.",
                error: err,
            });
        }
    },

    show: async function (req, res) {
        const id = req.params.id;

        try {
            const user = await UserModel.findOne({ _id: id });

            if (!user) {
                return res.status(404).json({
                    message: "No such user",
                });
            }

            return res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: "Error when getting user.",
                error: err,
            });
        }
    },

    create: async function (req, res) {
        try {
            const user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            const savedUser = await user.save();
            return res.status(201).json(savedUser);
        } catch (err) {
            return res.status(500).json({
                message: "Error when creating user",
                error: err,
            });
        }
    },

    update: async function (req, res) {
        const id = req.params.id;

        try {
            const user = await UserModel.findOne({ _id: id });

            if (!user) {
                return res.status(404).json({
                    message: "No such user",
                });
            }

            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;

            const updatedUser = await user.save();
            return res.json(updatedUser);
        } catch (err) {
            return res.status(500).json({
                message: "Error when updating user.",
                error: err,
            });
        }
    },

    remove: async function (req, res) {
        const id = req.params.id;

        try {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }

            // 1) Delete the user
            const user = await UserModel.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // 2) Delete all of their quiz attempts
            await QuizAttempt.deleteMany({ userId: id });

            // 3) All done
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({
                message: "Error when deleting the user.",
                error: err.message,
            });
        }
    },

    login: function (req, res) {
        UserModel.authenticate(
            req.body.username,
            req.body.password,
            (err, user) => {
                if (err || !user) {
                    return res
                        .status(401)
                        .json({ message: "Wrong username or password" });
                }
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                return res.json({
                    message: "Login successful",
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                });
            }
        );
    },

    logout: function (req, res) {
        return res.json({
            message: "Logout successful (client should discard the token)",
        });
    },

    profile: function (req, res) {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        return res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        });
    },
};
