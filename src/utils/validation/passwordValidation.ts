export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long'
  },
  validate: (value: string) => {
    if (value.trim() !== value) {
      return 'Password should not start or end with spaces';
    }
    if (!/^[^\s]+$/.test(value)) {
      return 'Password should not contain spaces';
    }
    if (!/^(?=.*?[A-Z])/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/^(?=.*?[a-z])/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/^(?=.*?[0-9])/.test(value)) {
      return 'Password must contain at least one digit';
    }
    if (!/^(?=.*?[#?!@$%^&*-])/.test(value)) {
      return 'Password must contain at least one special character (#?!@$%^&*-)';
    }
    return true;
  }
};
