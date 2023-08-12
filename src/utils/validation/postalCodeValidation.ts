export const postalCodeValidation = {
  required: 'Postal code is required',
  pattern: {
    value:
      /^([ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d|^\d{6}|^\d{5}([\-]?\d{4})?)$/, // USA, Canada, Russia, Belarus
    message: 'Invalid postal code format'
  }
};
