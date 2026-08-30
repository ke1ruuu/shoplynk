/**
 * Peso amounts render identically on every surface: en-PH grouping, always two
 * decimals, so a column of prices aligns on the decimal point. Pair with the
 * `.tabular` class so the numerals are monospaced too.
 */
export function peso(amount: number): string {
  return `₱${Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
