export const nameValidation = {
  required: 'Name is required',
  pattern: {
    value: /^[A-Za-zА-Яа-я]+$/,
    message:
      'This field should contain at least one character and no special symbols or digits'
  }
};
