export const passwordValidation = {
  validate: (value: string) => {
    if (!/^[^\s]+$/.test(value)) {
      return 'Password should not contain spaces';
    }
    const errors: Array<string> = [];
    if (!/^(?=.*?[A-Z])/.test(value)) {
      errors.push('uppercase letter');
    }
    if (!/^(?=.*?[a-z])/.test(value)) {
      errors.push('lowercase letter');
    }
    if (!/^(?=.*?[0-9])/.test(value)) {
      errors.push('digit');
    }
    if (!/^(?=.*?[#?!@$%^&*-])/.test(value)) {
      errors.push('special character (#?!@$%^&*-)');
    }
    if (errors.length > 0) {
      return `Password must contain ${errors.join(', ')}`;
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
  }
};
