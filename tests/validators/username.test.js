const { validateUsername } = require('../../src/validators/username');

describe('Username Validator', () => {
  describe('Generic validation', () => {
    test('should reject empty username', () => {
      const result = validateUsername('');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Username is required');
    });

    test('should reject username shorter than 3 characters', () => {
      const result = validateUsername('ab');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Username must be at least 3 characters long');
    });

    test('should reject username with invalid characters', () => {
      const result = validateUsername('user@name!');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Username can only contain letters, numbers, hyphens, underscores, @ and dots');
    });

    test('should accept valid username with letters and numbers', () => {
      const result = validateUsername('user123');
      expect(result.success).toBe(true);
      expect(result.error).toBe(null);
    });

    test('should accept valid username with hyphens and underscores', () => {
      const result = validateUsername('user_name-123');
      expect(result.success).toBe(true);
      expect(result.error).toBe(null);
    });
  });

  describe('SaaS-specific validation', () => {
    test('should validate tenant domain for tenant-001', () => {
      const result = validateUsername('john@acme.com', { tenantId: 'tenant-001' });
      expect(result.success).toBe(true);
    });

    test('should reject wrong tenant domain', () => {
      const result = validateUsername('john@wrong.com', { tenantId: 'tenant-001' });
      expect(result.success).toBe(false);
      expect(result.error).toContain('acme.com');
    });

    test('should reject invalid tenant ID', () => {
      const result = validateUsername('john@test.com', { tenantId: 'invalid-tenant' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid tenant ID');
    });

    test('should validate enterprise domain restriction', () => {
      const result = validateUsername('john@company.com', { enterpriseDomain: 'company.com' });
      expect(result.success).toBe(true);
    });

    test('should reject username not matching enterprise domain', () => {
      const result = validateUsername('john@other.com', { enterpriseDomain: 'company.com' });
      expect(result.success).toBe(false);
      expect(result.error).toContain('company.com');
    });
  });
});
