import { ageValidation } from '../ageValidation';

describe('ageValidation', () => {
  it('should return error message when age is less than 13', () => {
    const value = '2020-01-01'; // Less than 13

    const result = ageValidation.validate(value);

    expect(result).toBe('You must be at least 13 years old');
  });

  it('should return true when age is 13 or older', () => {
    const value = '2000-01-01'; // More than 13

    const result = ageValidation.validate(value);

    expect(result).toBe(true);
  });

  it('should return undefined when value is empty', () => {
    const value = undefined; // Empty value

    const result = ageValidation.validate(value);

    expect(result).toBeUndefined();
  });
});
