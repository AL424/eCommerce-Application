import { emailValidation } from './emailValidation';

describe('emailValidation', () => {
  it('should return error message when value contains spaces', () => {
    const value = 'john doe@example.ru';

    const result = emailValidation.validate(value);

    expect(result).toBe('E-mail should not contain spaces');
  });

  it('should return error message when value is missing "@"', () => {
    const value = 'johndoeexample.ru';

    const result = emailValidation.validate(value);

    expect(result).toBe('Invalid e-mail (e.g. username@example.com)');
  });

  it('should return error message when user name is missing', () => {
    const value = '@example.ru';

    const result = emailValidation.validate(value);

    expect(result).toBe(
      'E-mail must contain user name (e.g. username@example.com)'
    );
  });

  it('should return error message when user name is invalid', () => {
    const value = 'ДжонДои@example.ru';

    const result = emailValidation.validate(value);

    expect(result).toBe('Invalid e-mail user name (e.g. username@example.com)');
  });

  it('should return error message when domain name is missing', () => {
    const value = 'johndoe@';

    const result = emailValidation.validate(value);

    expect(result).toBe(
      'E-mail must contain domain name (e.g. username@example.com)'
    );
  });

  it('should return error message when domain name is invalid', () => {
    const value = 'johndoe@example';

    const result = emailValidation.validate(value);

    expect(result).toBe(
      'Invalid e-mail domain name (e.g. username@example.com)'
    );
  });

  it('should return true when value is a valid email', () => {
    const value = 'johndoe@example.com';

    const result = emailValidation.validate(value);

    expect(result).toBe(true);
  });

  it('should return undefined when value is empty', () => {
    const value = '';

    const result = emailValidation.validate(value);

    expect(result).toBe('E-mail should not contain spaces');
  });
});
