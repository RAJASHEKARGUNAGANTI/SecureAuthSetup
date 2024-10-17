const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'  // Replace this with your correct redirect URL
      },
  async (accessToken, refreshToken, profile, done) => {
    const { email, name, picture } = profile._json;

    try {
      // Check if user already exists in the database
      let user = await User.findOne({ email });
      if (!user) {
        // If not, create a new user
        user = new User({
          name,
          email,
          profilePicture: picture
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
}