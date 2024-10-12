const { getCache } = require('../utils/cache');

exports.cacheMiddleware = (key) => {
  return (req, res, next) => {
    const cachedData = getCache(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    next();
  };
};