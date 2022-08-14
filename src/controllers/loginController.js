const loginServices = require('../services/loginServices');
const userServices = require('../services/userServices');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginServices.signIn(email, password);
    if (response.message) {
    return res.status(response.status).json({ message: response.message });
  } return res.status(response.status).json({ token: response.token });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (_req, res) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
};

module.exports = {
  signIn,
  getAllUsers,
};