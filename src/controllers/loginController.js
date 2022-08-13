const loginServices = require('../services/loginServices');

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

module.exports = {
  signIn,
};