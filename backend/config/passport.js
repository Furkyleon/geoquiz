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
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email =
                    profile.emails?.find((e) => e.primary && e.verified)
                        ?.value || profile.emails?.[0]?.value;

                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        username: profile.username,
                        email,
                    });
                } else if (!user.email && email) {
                    user.email = email;
                    await user.save();
                }

                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);
