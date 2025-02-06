const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { success, message, data: { user, authTokens }} = await userService.loginUser(req.body);

    if (success) {
      res.cookie('refreshToken', authTokens.refresh, { httpOnly: true, secure: true, sameSite: 'strict' });
      return res.status(200).json({ success, message, data: { user, token: authTokens.access }});
    } else {
      return res.status(401).json({ success, message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser
};
