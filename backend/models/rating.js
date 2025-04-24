// models/rating.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Stores',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'storeId']
    }
  ]
});

// Hook to update store's average rating
Rating.addHook('afterSave', async (rating, options) => {
  const Store = sequelize.models.Store;
  const ratings = await Rating.findAll({
    where: { storeId: rating.storeId }
  });
  
  const totalRatings = ratings.length;
  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = sum / totalRatings;
  
  await Store.update(
    { averageRating, totalRatings },
    { where: { id: rating.storeId } }
  );
});

Rating.addHook('afterDestroy', async (rating, options) => {
  const Store = sequelize.models.Store;
  const ratings = await Rating.findAll({
    where: { storeId: rating.storeId }
  });
  
  const totalRatings = ratings.length;
  let averageRating = 0;
  
  if (totalRatings > 0) {
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    averageRating = sum / totalRatings;
  }
  
  await Store.update(
    { averageRating, totalRatings },
    { where: { id: rating.storeId } }
  );
});

module.exports = Rating;