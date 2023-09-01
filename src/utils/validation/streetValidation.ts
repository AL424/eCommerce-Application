export const streetValidation = {
  required: 'Street is required',
  validate(value: string | undefined) {
    if (!value) return;

    if (value.trim() !== value) {
      return 'Street should not have leading or trailing spaces';
    }

    if (!/^[\d\w\s\.\-]*$/.test(value)) {
      return 'Use letters, digits, spaces, and symbols . -';
    }

    return true;
  }
};
