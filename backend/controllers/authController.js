const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have UserSchema ready
// const bcrypt = require('bcrypt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const SECRET_KEY = "Rwb5y46a2E7s7y0is4XsGNqyvxxw";
const REFRESH_SECRET_KEY = 'Rwb5y46a2E7s7y0is4XsGNqy';
// Helper function to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

// Setup Google OAuth2 client
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthController = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email, picture } = response.payload;

    if (email_verified) {
      let user = await User.findOne({ email });

      if (user) {
        // Existing user logic
        const userData = { name: user.name, email: user.email, profilePicture: user.profilePicture, userType: user.userType };
        const token = generateAccessToken({ _id: user._id, user: userData });
        const refreshToken = generateRefreshToken({ _id: user._id, user: userData });
        
        user.token = token;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Adjust for local development
          sameSite: 'strict',
        });

        return res.json({
          token,
          user: { name: user.name, email: user.email, profilePicture: user.profilePicture, userType: "student" }
        });
      } else {
        // New user creation
        const newUser = new User({
          name,
          email,
          profilePicture: picture,
          googleId: response.payload.sub,
          userType: "student",
        });

        const token = generateAccessToken({ _id: newUser._id, user: newUser }); // Use newUser._id
        const refreshToken = generateRefreshToken({ _id: newUser._id, user: newUser }); // Use newUser._id
        
        newUser.token = token;
        await newUser.save();

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        return res.json({
          token,
          // user: { name: newUser.name, email: newUser.email, profilePicture: newUser.profilePicture, userType: "student" }
        });
      }
    } else {
      return res.status(400).json({ error: 'Email not verified' });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    return res.status(500).json({ error: 'Google login failed' });
  }
};

const refreshToken = (req, res) => {
  // console.log(req.cookies.refreshToken,"==================req===============")
  const refreshToken = req.cookies.refreshToken;
  // console.log(req.cookies,"========================")
  if (!refreshToken) {
    // console.error("No refresh token found=========");
    return res.sendStatus(403);
}

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    console.log(REFRESH_SECRET_KEY,"================================")
    if (err) {
      console.error("Failed to verify refresh token:", err);
      return res.sendStatus(403);
  }
// console.log(user.user,"==================================from auth========================")
// const userData = { name: user.name, email: user.email, profilePicture: user.profilePicture, userType: user.userType };
// const token = generateAccessToken({ _id: user._id, user: userData });
      const newToken = generateAccessToken({ id: user._id, name: user.user.name, email: user.user.email , userType:"student"});
      res.json({ token: newToken , user: user.user });
  });
}

const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(200);
}



module.exports = {googleAuthController, refreshToken, logout}