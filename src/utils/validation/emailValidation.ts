export const emailValidation = {
  required: 'Email is required',
  validate: (value: string) => {
    if (!/^[^\s]+$/.test(value)) {
      return 'E-mail should not contain spaces';
    }
    const index = value.indexOf('@');
    if (index === -1) {
      return 'Invalid e-mail (e.g. username@example.com)';
    }
    const userName = value.slice(0, index);
    if (!userName) {
      return 'E-mail must contain user name (e.g. username@example.com)';
    }
    if (
      !/[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*/.test(
        userName
      )
    ) {
      return 'Invalid e-mail user name (e.g. username@example.com)';
    }
    const domianName = value.slice(index + 1);
    if (!domianName) {
      return 'E-mail must contain domian name (e.g. username@example.com)';
    }
    if (!/[a-z0-9.-]+\.[a-z]{2,}$/.test(domianName)) {
      return 'Invalid e-mail domian name (e.g. username@example.com)';
    }
    return true;
  }
};
