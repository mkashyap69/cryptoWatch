const clearHash = require('../utils/cache');

const clearCache = async (req, res, next) => {
  await next();
  clearHash(req.user._id);
};

module.exports = clearCache;
