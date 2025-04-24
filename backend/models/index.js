// models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Store = require('./store');
const Rating = require('./rating');

// Define associations
User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

// Store owner association
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasOne(Store, { foreignKey: 'ownerId', as: 'ownedStore' });

const models = {
  User,
  Store,
  Rating,
  sequelize
};

module.exports = models;