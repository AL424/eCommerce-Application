import { postalCodeValidation } from '../postalCodeValidation';

describe('postalCodeValidation', () => {
  it('should return error message when value is empty', () => {
    const value = '';

    const result = postalCodeValidation.pattern.value.test(value)
      ? undefined
      : postalCodeValidation.required;

    expect(result).toBe('Postal code is required');
  });

  it('should return error message when value does not consist of 6 digits', () => {
    const value = '12345';

    const result = postalCodeValidation.pattern.value.test(value)
      ? undefined
      : postalCodeValidation.required;

    expect(result).toBe('Postal code is required');
  });

  it('should return error message when value contains non-digit characters', () => {
    const value = 'A12345';

    const result = postalCodeValidation.pattern.value.test(value)
      ? undefined
      : postalCodeValidation.required;

    expect(result).toBe('Postal code is required');
  });

  it('should return undefined when value is a valid postal code', () => {
    const value = '123456';

    const result = postalCodeValidation.pattern.value.test(value)
      ? undefined
      : postalCodeValidation.required;

    expect(result).toBeUndefined();
  });
});
