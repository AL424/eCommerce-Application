export const cityValidation = {
  required: 'City is required',
  validate(value: string | undefined) {
    if (!value) return;

    if (value.trim() !== value) {
      return 'City should not have leading or trailing spaces';
    }

    if (!/^[A-Za-z][A-Za-z\s-]*$/.test(value)) {
      return 'Use letters, spaces, and hyphens';
    }

    return true;
  }
};
