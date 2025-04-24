// routes/ratingRoutes.js
const express = require('express');
const {
  submitRating,
  getStoreRatings,
  getUserRating,
  deleteRating
} = require('../controllers/ratingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/store/:storeId', getStoreRatings);

// Protected routes
router.use(protect);
router.post('/', submitRating);
router.get('/user/store/:storeId', getUserRating);
router.delete('/:ratingId', deleteRating);

module.exports = router;