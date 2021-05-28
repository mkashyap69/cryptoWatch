// const mongoose = require('mongoose');
// const redis = require('redis');
// const { promisify } = require('util');
// const client = redis.createClient(process.env.REDIS_URL);

// const exec = mongoose.Query.prototype.exec;
// client.hget = promisify(client.hget);

// mongoose.Query.prototype.cache = async function (key) {
//   this.useCache = true;
//   this.hashKey = JSON.stringify(key || 'default');
//   return this;
// };

// mongoose.Query.prototype.exec = async function () {
//   if (!this.useCache) {
//     return exec.apply(this, arguments);
//   }

//   const queryOptions = this.getQuery();
//   const collectionName = this.mongooseCollection.name;
//   const cacheKey = JSON.stringify({
//     ...queryOptions,
//     collectionName,
//   });
//   const cacheValue = await client.hget(this.hashKey, cacheKey);

//   if (cacheValue) {
//     const doc = JSON.parse(cacheValue);
//     return doc;
//   }

//   const res = await exec.apply(this, arguments);

//   client.hset(this.hashKey, cacheKey, JSON.stringify(res));

//   client.expire(this.hashKey, 86400);

//   return res;
// };

// const clearHash = (hashKey) => {
//   client.del(JSON.stringify(hashKey));
// };

// module.exports = clearHash;
