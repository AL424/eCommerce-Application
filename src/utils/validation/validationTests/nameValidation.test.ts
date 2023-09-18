import { nameValidation } from '../nameValidation';

describe('nameValidation', () => {
  it('should return error message when value is empty', () => {
    const value = '';

    const result = nameValidation.pattern.value.test(value)
      ? undefined
      : nameValidation.pattern.message;

    expect(result).toBe(
      'This field should contain at least one character and no special symbols or digits'
    );
  });

  it('should return error message when value contains special symbols', () => {
    const value = 'John@Doe'; // "@"

    const result = nameValidation.pattern.value.test(value)
      ? undefined
      : nameValidation.pattern.message;

    expect(result).toBe(
      'This field should contain at least one character and no special symbols or digits'
    );
  });

  it('should return error message when value contains digits', () => {
    const value = 'John123';

    const result = nameValidation.pattern.value.test(value)
      ? undefined
      : nameValidation.pattern.message;

    expect(result).toBe(
      'This field should contain at least one character and no special symbols or digits'
    );
  });

  it('should return undefined when value is a valid name', () => {
    const value = 'John';

    const result = nameValidation.pattern.value.test(value)
      ? undefined
      : nameValidation.pattern.message;

    expect(result).toBeUndefined();
  });
});
