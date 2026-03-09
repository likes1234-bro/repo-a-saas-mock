/**
 * SaaS-specific tenant validation logic
 * This module contains business logic specific to the SaaS platform
 */

/**
 * Validates username against tenant domain rules
 * @param {string} username - The username to validate
 * @param {string} tenantId - The tenant ID
 * @returns {Object} Validation result
 */
function validateTenantDomain(username, tenantId) {
  // Mock tenant domain mapping
  const tenantDomains = {
    'tenant-001': 'acme.com',
    'tenant-002': 'globex.com',
    'tenant-003': 'initech.com'
  };

  const expectedDomain = tenantDomains[tenantId];

  if (!expectedDomain) {
    return {
      success: false,
      error: 'Invalid tenant ID'
    };
  }

  // Check if username contains the tenant domain
  if (username.includes('@') && !username.endsWith(`@${expectedDomain}`)) {
    return {
      success: false,
      error: `Username must use ${expectedDomain} domain for this tenant`
    };
  }

  return {
    success: true,
    error: null
  };
}

module.exports = { validateTenantDomain };
