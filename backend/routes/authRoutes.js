const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
        session: false,
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, username: req.user.username, email: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        // send the token to React
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    }
);

module.exports = router;
