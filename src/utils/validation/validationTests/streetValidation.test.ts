import { streetValidation } from '../streetValidation';

describe('streetValidation', () => {
  it('should return error message when value is empty', () => {
    const value = '';

    const result = streetValidation.validate(value)
      ? undefined
      : streetValidation.required;

    expect(result).toBe('Street is required');
  });

  it('should return error message when value contains leading spaces', () => {
    const value = ' Apple St';

    const result = streetValidation.validate(value);

    expect(result).toBe('Street should not have leading or trailing spaces');
  });

  it('should return error message when value contains trailing spaces', () => {
    const value = 'Apple St ';

    const result = streetValidation.validate(value);

    expect(result).toBe('Street should not have leading or trailing spaces');
  });

  it('should return error message when value contains invalid characters', () => {
    const value = '@pple St';

    const result = streetValidation.validate(value);

    expect(result).toBe('Use letters, digits, spaces, and symbols . -');
  });

  it('should return undefined when value is a valid street', () => {
    const value = 'Apple St';

    const result = streetValidation.validate(value)
      ? undefined
      : streetValidation.required;

    expect(result).toBeUndefined();
  });
});
