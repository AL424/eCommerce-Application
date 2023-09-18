import { passwordValidation } from '../passwordValidation';

describe('passwordValidation', () => {
  it('should return error message when value is empty', () => {
    const value = '';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password is required');
  });

  it('should return error message when value contains spaces', () => {
    const value = 'Password with spaces';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password should not contain spaces');
  });

  it('should return error message when value lacks uppercase letter', () => {
    const value = 'password123$';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password must contain uppercase letter');
  });

  it('should return error message when value lacks lowercase letter', () => {
    const value = 'PASSWORD123$';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password must contain lowercase letter');
  });

  it('should return error message when value lacks digit', () => {
    const value = 'Password$';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password must contain digit');
  });

  it('should return error message when value lacks special character', () => {
    const value = 'Password123';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password must contain special character (#?!@$%^&*-)');
  });

  it('should return error message when value is too short', () => {
    const value = 'Pass1$';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe('Password must be at least 8 characters long');
  });

  it('should return true when value is a valid password', () => {
    const value = 'Password123$';

    const result =
      passwordValidation.validate(value) || passwordValidation.required;

    expect(result).toBe(true);
  });
});
