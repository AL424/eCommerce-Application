import { cityValidation } from './cityValidation';

describe('cityValidation', () => {
  it('should return error message when value has leading or trailing spaces', () => {
    const value = ' New York ';

    const result = cityValidation.validate(value);

    expect(result).toBe('City should not have leading or trailing spaces');
  });

  it('should return error message when value contains invalid characters', () => {
    const value = 'New Y@rk'; // (@)

    const result = cityValidation.validate(value);

    expect(result).toBe('Use letters, spaces, and hyphens');
  });

  it('should return true when value is valid', () => {
    const value = 'New York';

    const result = cityValidation.validate(value);

    expect(result).toBe(true);
  });

  it('should return undefined when value is empty', () => {
    const value = undefined;

    const result = cityValidation.validate(value);

    expect(result).toBeUndefined();
  });
});
