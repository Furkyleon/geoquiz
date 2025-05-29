const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/userModel");
require("dotenv").config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails?.[0]?.value || null,
                        avatar: profile.photos?.[0]?.value || null,
                    });
                }
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);
