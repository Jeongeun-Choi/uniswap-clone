export function calculateExchangeFloat(
  currencyExchangeRate: number,
  value: string
) {
  const currencyExchangeRateDecimal =
    currencyExchangeRate.toString().split(".")[1] || "";
  const valueDecimal = value.split(".")[1] || "";

  const exchangeRateNumericalIndex = currencyExchangeRateDecimal.length;
  const valueNumericalIndex = valueDecimal.length;

  const totalNumericalIndex = exchangeRateNumericalIndex + valueNumericalIndex;
  return (
    (currencyExchangeRate *
      10 ** exchangeRateNumericalIndex *
      (parseFloat(value || "0") * 10 ** valueNumericalIndex)) /
    10 ** totalNumericalIndex
  );
}
