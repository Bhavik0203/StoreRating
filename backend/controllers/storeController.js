// controllers/storeController.js
const { Store, User, Rating } = require('../models');
const { Op } = require('sequelize');

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    
    // Build filter conditions
    const whereConditions = {};
    
    if (name) {
      whereConditions.name = { [Op.like]: `%${name}%` };
    }
    
    if (address) {
      whereConditions.address = { [Op.like]: `%${address}%` };
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    // Sort options
    const sortField = req.query.sortField || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    
    const stores = await Store.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit,
      offset,
      order: [[sortField, sortOrder]]
    });
    
    // Get user's ratings if user is authenticated
    let userRatings = {};
    
    if (req.user) {
      const ratings = await Rating.findAll({
        where: { userId: req.user.id },
        attributes: ['storeId', 'rating']
      });
      
      userRatings = ratings.reduce((acc, rating) => {
        acc[rating.storeId] = rating.rating;
        return acc;
      }, {});
    }
    
    // Add user's rating to the response
    const storesWithUserRating = stores.rows.map(store => {
      const storeObj = store.toJSON();
      storeObj.userRating = userRatings[store.id] || null;
      return storeObj;
    });
    
    res.status(200).json({
      success: true,
      count: stores.count,
      data: storesWithUserRating,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(stores.count / limit),
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

// Get store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    // Get user's rating if user is authenticated
    let userRating = null;
    
    if (req.user) {
      const rating = await Rating.findOne({
        where: {
          storeId: store.id,
          userId: req.user.id
        },
        attributes: ['rating']
      });
      
      if (rating) {
        userRating = rating.rating;
      }
    }
    
    const storeData = store.toJSON();
    storeData.userRating = userRating;
    
    res.status(200).json({
      success: true,
      data: storeData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create store (admin only)
exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    
    // Check if owner exists and is a store owner
    const owner = await User.findByPk(ownerId);
    
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found'
      });
    }
    
    // If user is not a store owner, make them one
    if (owner.role !== 'STORE_OWNER') {
      owner.role = 'STORE_OWNER';
      await owner.save();
    }
    
    // Check if owner already has a store
    const existingStore = await Store.findOne({ where: { ownerId } });
    
    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: 'This user already owns a store'
      });
    }
    
    // Create store
    const store = await Store.create({
      name,
      email,
      address,
      ownerId
    });
    
    res.status(201).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update store
exports.updateStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    
    const store = await Store.findByPk(req.params.id);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    // Only admin or the store owner can update a store
    if (req.user.role !== 'ADMIN' && store.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this store'
      });
    }
    
    // Update store fields
    if (name) store.name = name;
    if (email) store.email = email;
    if (address) store.address = address;
    
    await store.save();
    
    res.status(200).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete store (admin only)
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    await store.destroy();
    
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

// Get store dashboard (store owner only)
exports.getStoreDashboard = async (req, res) => {
    try {
      // Find store owned by the current user
      const store = await Store.findOne({
        where: { ownerId: req.user.id }
      });
      
      if (!store) {
        return res.status(404).json({
          success: false,
          message: 'No store found for this user'
        });
      }
      
      // Get ratings for the store
      const ratings = await Rating.findAll({
        where: { storeId: store.id },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        ]
      });
      
      res.status(200).json({
        success: true,
        data: {
          store,
          ratings
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