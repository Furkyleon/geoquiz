const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    githubId: { type: String, unique: true, sparse: true },
});

// Password hashing middleware
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
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
        const match = await bcrypt.compare(password, user.password);
        if (match) return callback(null, user);
        else return callback(new Error("Incorrect password"));
    } catch (err) {
        return callback(err);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
