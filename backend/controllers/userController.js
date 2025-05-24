const UserModel = require("../models/userModel.js");

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

            const result = await UserModel.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({
                message: "Error when deleting the user.",
                error: err.message,
            });
        }
    },

    login: function (req, res, next) {
        UserModel.authenticate(
            req.body.username,
            req.body.password,
            function (err, user) {
                if (err || !user) {
                    return res.status(401).json({
                        message: "Wrong username or password",
                    });
                }

                req.session.userId = user._id;

                return res.json({
                    message: "Login successful",
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
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: "Logout failed" });
                }
                return res.json({ message: "Logout successful" });
            });
        } else {
            return res.json({ message: "No session to log out" });
        }
    },
    
    profile: function (req, res, next) {
        UserModel.findById(req.session.userId).exec(function (error, user) {
            if (error) {
                return res
                    .status(500)
                    .json({ message: "Internal error", error });
            }
            if (!user) {
                return res.status(400).json({ message: "Not authorized" });
            }
            return res.json({
                id: user._id,
                username: user.username,
                email: user.email,
            });
        });
    },
};
