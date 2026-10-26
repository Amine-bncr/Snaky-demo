export function formatDA(value: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/ /g, ' ');
}

export function formatPrice(value: number | null): string | null {
  if (value === null) return null;
  return `${formatDA(value)} DA`;
}

export function formatQuantity(n: number, unit: string): string {
  return `${n} ${unit}`;
}