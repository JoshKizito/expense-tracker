export type Currency = "EUR" | "USD" | "RUB";

const LOCALE_BY_CURRENCY: Record<Currency, string> = {
  EUR: "fr-FR",
  USD: "en-US",
  RUB: "ru-RU",
};

export function formatMoney(amount: number, currency: Currency = "EUR"): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
