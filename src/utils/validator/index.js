/**
 * Add any validation related utility functions here
 * ex. validateEmail, validatePassword, etc.
 */

/**
 * Validation function to check if a value is required
 * @param {string} value - The value to validate
 * @returns {boolean|string} - True if valid, error message otherwise
 */
export function required(value) {
  return value ? true : 'This field is required';
}

/**
 * Validation function to check if a value meets the minimum length
 * @param {number} length - The minimum length
 * @returns {function} - A function that takes a value and returns true if valid, error message otherwise
 */
export function min(length) {
  return function (value) {
    return value.length >= length ? true : `This field must have at least ${length} characters`;
  };
}

/**
 * Validation function to check if a value does not exceed the maximum length
 * @param {number} length - The maximum length
 * @returns {function} - A function that takes a value and returns true if valid, error message otherwise
 */
export function max(length) {
  return function (value) {
    return value.length <= length ? true : `This field must have no more than ${length} characters`;
  };
}

/**
 * Function to chain multiple validation functions
 * @param {...function} validators - The validation functions to chain
 * @returns {function} - A function that takes a value and returns true if all validations pass, error message otherwise
 */
export function chainValidators(...validators) {
  return function (value) {
    for (let validator of validators) {
      const result = validator(value);
      if (result !== true) {
        return result;
      }
    }
    return true;
  };
}

// Example usage:
// const validateUsername = chainValidators(required, min(3), max(10));
// const validatePassword = chainValidators(required, min(6));
