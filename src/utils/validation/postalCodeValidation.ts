export const postalCodeValidation = {
  required: 'Postal code is required',
  pattern: {
    value: /^\d{6}$/,
    message: 'Postal code consists of 6 digits'
  }
};
