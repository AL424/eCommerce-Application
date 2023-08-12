export const nameValidation = {
  required: 'Name is required',
  pattern: {
    value: /^[A-Za-zА-Яа-я]+$/,
    message:
      'Name should contain at least one character and no special symbols or digits'
  }
};
