// utils/validation.js
/**
 * Validates password according to requirements
 * - 8-16 characters
 * - At least one uppercase letter
 * - At least one special character
 */
exports.validatePassword = (password) => {
    if (!password || password.length < 8 || password.length > 16) {
      return {
        isValid: false,
        message: 'Password must be between 8 and 16 characters'
      };
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter'
      };
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one special character'
      };
    }
    
    return {
      isValid: true
    };
  };
  
  /**
   * Validates name length (20-60 characters)
   */
  exports.validateName = (name) => {
    if (!name || name.length < 20 || name.length > 60) {
      return {
        isValid: false,
        message: 'Name must be between 20 and 60 characters'
      };
    }
    
    return {
      isValid: true
    };
  };
  
  /**
   * Validates address length (max 400 characters)
   */
  exports.validateAddress = (address) => {
    if (!address || address.length > 400) {
      return {
        isValid: false,
        message: 'Address must not exceed 400 characters'
      };
    }
    
    return {
      isValid: true
    };
  };
  
  /**
   * Validates email format
   */
  exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Please provide a valid email address'
      };
    }
    
    return {
      isValid: true
    };
  };