// controllers/userController.js
const { User, Store } = require('../models');
const { Op } = require('sequelize');
const { validatePassword } = require('../utils/validation');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    
    // Build filter conditions
    const whereConditions = {};
    
    if (name) {
      whereConditions.name = { [Op.like]: `%${name}%` };
    }
    
    if (email) {
      whereConditions.email = { [Op.like]: `%${email}%` };
    }
    
    if (address) {
      whereConditions.address = { [Op.like]: `%${address}%` };
    }
    
    if (role) {
      whereConditions.role = role;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    // Sort options
    const sortField = req.query.sortField || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    
    const users = await User.findAndCountAll({
      where: whereConditions,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [[sortField, sortOrder]]
    });
    
    res.status(200).json({
      success: true,
      count: users.count,
      data: users.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(users.count / limit),
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

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Store,
          as: 'ownedStore',
          attributes: ['id', 'name', 'averageRating', 'totalRatings']
        }
      ]
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message
      });
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      address,
      role
    });
    
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
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

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, address, role } = req.body;
    
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if email is already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }
    
    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (role) user.role = role;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
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

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.destroy();
    
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

// Get dashboard stats (admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await sequelize.models.Rating.count();
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings
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