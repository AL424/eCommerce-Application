export const ageValidation = {
  required: 'Date of birth is required',
  validate: (value: string) => {
    const currentDate = new Date();
    const inputDate = new Date(value);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 13);

    if (inputDate > minAgeDate) {
      return 'You must be at least 13 years old';
    }

    return true;
  }
};
