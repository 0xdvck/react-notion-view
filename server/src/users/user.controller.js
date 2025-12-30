const createError = require('http-errors');
const userService = require('./user.service');

/**
 * GET /users
 */
async function getUsers(req, res, next) {
  try {
    const { sorts, filters } = req.body;
    const users = await userService.getAllUsers({ sorts, filters });
    res.json(users);
  } catch (err) {
    next(createError(500, err.message));
  }
}

module.exports = {
  getUsers,
};
