const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {

  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      // console.log(email, password);
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          message: 'User not found !'
        })
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        res.status(404).json({
          message: "Incorrect password"
        })
      }
      if (user && isEqual) {
        const access_token = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1h" }
        );
        const refreshtoken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_REFRESH_KEY,
          { expiresIn: "365d" }
        );
        const newRefreshToken = new RefreshToken({
          refreshToken: refreshtoken,
        });
        const save = await newRefreshToken.save();
        res.cookie("refresh_token", refreshtoken, {
          httpOnly: true,
          secure: false,

        })
        res.status(200).json({
          access_token,
          refreshtoken,
          roleId: user.isAdmin,
        })
      }

    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refresh_token;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    const checkRefreshToken = await RefreshToken.findOneAndDelete({
      refreshToken: refreshToken
    })
    if (!checkRefreshToken) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }

      const newAccess_token = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1h" }
      );
      const newRefreshtoken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" }
      );
      const saveRefreshToken = new RefreshToken({ refreshToken: newRefreshtoken });
      saveRefreshToken.save();
      res.cookie("refresh_token", newRefreshtoken, {
        httpOnly: true,
        secure: false,
      })
      res.status(200).json({
        newAccess_token,
        newRefreshtoken,
        isAdmin: user.isAdmin,
      })
    });
  },
}