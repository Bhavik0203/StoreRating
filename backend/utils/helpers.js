// utils/helpers.js
const { Op } = require('sequelize');

/**
 * Build filter conditions for search queries
 */
exports.buildFilterConditions = (filters) => {
  const whereConditions = {};
  
  Object.keys(filters).forEach(key => {
    if (filters[key] && filters[key].trim() !== '') {
      whereConditions[key] = { [Op.like]: `%${filters[key]}%` };
    }
  });
  
  return whereConditions;
};

/**
 * Parse pagination parameters
 */
exports.getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
};

/**
 * Parse sorting parameters
 */
exports.getSortingOptions = (query, defaultSortField = 'id') => {
  const sortField = query.sortField || defaultSortField;
  const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';
  
  return { sortField, sortOrder };
};

/**
 * Format pagination response
 */
exports.formatPaginationResponse = (data, page, limit) => {
  return {
    count: data.count,
    rows: data.rows,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.count / limit),
      itemsPerPage: limit
    }
  };
};