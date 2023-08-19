export const buildingValidation = {
  required: 'Building is required',
  validate(value: string | undefined) {
    if (!value) return;
    if (value.trim() !== value) {
      return 'Building should not have leading or trailing spaces';
    }
    if (!/^[\d\w\/.\s]/.test(value)) {
      return 'Use numbers, letters, symbol /';
    }
    return true;
  }
};
