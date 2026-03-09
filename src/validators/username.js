/**
 * Username validator for SaaS platform
 * Contains both generic validation logic and SaaS-specific tenant validation
 */

const { validateTenantDomain } = require('../saas/tenant-validator');

/**
 * Validates username according to platform rules
 * @param {string} username - The username to validate
 * @param {Object} options - Validation options
 * @param {string} options.tenantId - Tenant ID for SaaS validation
 * @param {string} options.enterpriseDomain - Enterprise domain for validation
 * @returns {Object} Validation result with success flag and error message
 */
function validateUsername(username, options = {}) {
  // Generic validation: Check if username exists
  if (!username) {
    return {
      success: false,
      error: 'Username is required'
    };
  }

  // Generic validation: Check minimum length
  if (username.length < 3) {
    return {
      success: false,
      error: 'Username must be at least 3 characters long'
    };
  }

  // Generic validation: Check character format
  const validFormat = /^[a-zA-Z0-9_-]+$/;
  if (!validFormat.test(username)) {
    return {
      success: false,
      error: 'Username can only contain letters, numbers, hyphens, and underscores'
    };
  }

  // SaaS-specific validation: Tenant domain validation
  if (options.tenantId) {
    const tenantValidation = validateTenantDomain(username, options.tenantId);
    if (!tenantValidation.success) {
      return tenantValidation;
    }
  }

  // SaaS-specific validation: Enterprise domain restriction
  if (options.enterpriseDomain) {
    const emailPattern = new RegExp(`@${options.enterpriseDomain}$`);
    if (!emailPattern.test(username)) {
      return {
        success: false,
        error: `Username must belong to ${options.enterpriseDomain} domain`
      };
    }
  }

  return {
    success: true,
    error: null
  };
}

module.exports = { validateUsername };
