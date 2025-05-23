const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

// Password hashing middleware
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// Authentication static method
userSchema.statics.authenticate = async function (
    username,
    password,
    callback
) {
    try {
        const user = await this.findOne({ username });

        if (!user) {
            const err = new Error("User not found.");
            err.status = 401;
            return callback(err);
        }

        const result = await bcrypt.compare(password, user.password);
        if (result === true) {
            return callback(null, user);
        } else {
            return callback(new Error("Incorrect password"));
        }
    } catch (err) {
        return callback(err);
    }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
