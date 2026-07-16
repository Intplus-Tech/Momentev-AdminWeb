import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoneyFromMinorUnits(
  amount: number | string | null | undefined,
  currency = "GBP",
  locale = "en-GB"
) {
  const numericAmount = typeof amount === "string" ? Number(amount) : amount;
  const majorUnits = (numericAmount ?? 0) / 100;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(majorUnits);
}
