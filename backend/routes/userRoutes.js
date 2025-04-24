// routes/userRoutes.js
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('ADMIN'));

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/dashboard-stats')
  .get(getDashboardStats);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;