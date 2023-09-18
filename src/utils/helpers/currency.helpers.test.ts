import formatCurrency from './currency.helpers';

describe('formatCurrency function', () => {
  it('should format currency correctly', () => {
    const amount = 1000;
    const currencyCode = 'USD';

    const formattedCurrency = formatCurrency(amount, currencyCode);

    // Получается строкa, начинающаяся с "$" и два знака после запятой
    expect(formattedCurrency).toMatch('$1,000.00');
  });

  it('should format currency with different currency code', () => {
    const amount = 500;
    const currencyCode = 'EUR';

    const formattedCurrency = formatCurrency(amount, currencyCode);

    // Строка, начинающаяся с "€"
    expect(formattedCurrency).toMatch(/^€/);

    // Два знака после запятой
    expect(formattedCurrency).toMatch(/^€\d+\.\d{2}$/);
  });
});
