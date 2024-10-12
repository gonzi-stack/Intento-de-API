const localCache = new Map();

const initializeCache = () => {
  console.log('Usando caché local');
};

const cacheData = (key, data, expiration = 3600) => {
  const expirationTime = Date.now() + expiration * 1000;
  localCache.set(key, { data, expirationTime });
};

const getCache = (key) => {
  const cachedItem = localCache.get(key);
  if (cachedItem && cachedItem.expirationTime > Date.now()) {
    return cachedItem.data;
  }
  localCache.delete(key);
  return null;
};

module.exports = {
  initializeCache,
  cacheData,
  getCache
};