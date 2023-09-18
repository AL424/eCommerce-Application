import { buildingValidation } from './buildingValidation';

describe('buildingValidation', () => {
  it('should return error message when value has leading or trailing spaces', () => {
    const value = ' Wall Street ';

    const result = buildingValidation.validate(value);

    expect(result).toBe('Building should not have leading or trailing spaces');
  });

  it('should return error message when value contains invalid characters', () => {
    const value = 'W@ll Street'; // (@)

    const result = buildingValidation.validate(value);

    expect(result).toBe('Use numbers, letters, symbol /');
  });

  it('should return true when value is valid', () => {
    const value = 'Wall Street';

    const result = buildingValidation.validate(value);

    expect(result).toBe(true);
  });

  it('should return undefined when value is empty', () => {
    const value = undefined;

    const result = buildingValidation.validate(value);

    expect(result).toBeUndefined();
  });
});
