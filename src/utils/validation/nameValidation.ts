export const nameValidation = {
  required: 'Name is required',
  minLength: {
    value: 1,
    message: 'Name must be at least 1 characters long'
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message:
      'Name should contain at least one character and no special symbols or digits'
  }
};
