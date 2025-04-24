// controllers/ratingController.js
const { Rating, Store, User } = require('../models');

// Submit or update a rating
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating, comment } = req.body;
    const userId = req.user.id;
    
    // Validate rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    // Check if store exists
    const store = await Store.findByPk(storeId);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    // Check if user is the store owner
    if (store.ownerId === userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot rate your own store'
      });
    }
    
    // Check if user has already rated this store
    let userRating = await Rating.findOne({
      where: { userId, storeId }
    });
    
    if (userRating) {
      // Update existing rating
      userRating.rating = rating;
      if (comment !== undefined) {
        userRating.comment = comment;
      }
      
      await userRating.save();
      
      res.status(200).json({
        success: true,
        message: 'Rating updated successfully',
        data: userRating
      });
    } else {
      // Create new rating
      userRating = await Rating.create({
        userId,
        storeId,
        rating,
        comment
      });
      
      res.status(201).json({
        success: true,
        message: 'Rating submitted successfully',
        data: userRating
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all ratings for a store
exports.getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;
    
    // Check if store exists
    const store = await Store.findByPk(storeId);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    // Sort options
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    
    const ratings = await Rating.findAndCountAll({
      where: { storeId },
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        }
      ],
      limit,
      offset,
      order: [[sortField, sortOrder]]
    });
    
    res.status(200).json({
      success: true,
      count: ratings.count,
      data: ratings.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(ratings.count / limit),
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get user's rating for a store
exports.getUserRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;
    
    const rating = await Rating.findOne({
      where: { userId, storeId }
    });
    
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: rating
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    
    const rating = await Rating.findByPk(ratingId);
    
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }
    
    // Check if user is authorized to delete this rating
    if (rating.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this rating'
      });
    }
    
    await rating.destroy();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};