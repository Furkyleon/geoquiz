const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// 1) Redirect to GitHub for authentication
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
);

// 2) GitHub callback: issue a JWT and redirect
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
        session: false,
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, username: req.user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        // send the token to React
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    }
);

module.exports = router;
