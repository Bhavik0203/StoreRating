// routes/storeRoutes.js
const express = require('express');
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getStoreDashboard
} = require('../controllers/storeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllStores);
router.get('/:id', getStoreById);

// Protected routes
router.use(protect);

// Store owner routes
router.get('/dashboard/owner', authorize('STORE_OWNER'), getStoreDashboard);

// Admin routes
router.post('/', authorize('ADMIN'), createStore);
router.put('/:id', authorize('ADMIN'), updateStore);
router.delete('/:id', authorize('ADMIN'), deleteStore);

module.exports = router;