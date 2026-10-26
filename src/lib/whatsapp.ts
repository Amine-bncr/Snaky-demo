import { SITE } from '../config/site';
import type { OrderState, OrderItem } from '../hooks/useOrder';

export function buildWhatsAppMessage(order: OrderState): string {
  const lines: string[] = [];
  lines.push('Bonjour Snaky DZ,');
  lines.push('');
  lines.push(
    order.mode === 'particulier'
      ? 'Je souhaite passer une commande (Particulier).'
      : 'Je souhaite passer une commande (Professionnel).',
  );
  lines.push('');

  order.items.forEach((item: OrderItem) => {
    const pricePart =
      item.priceDA !== null
        ? ` — ${item.priceDA.toLocaleString('fr-DZ')} DA`
        : '';
    lines.push(`• ${item.name} × ${item.quantity}${pricePart}`);
  });

  lines.push('');

  if (order.mode === 'particulier') {
    lines.push(`Nom : ${order.customerName || '—'}`);
  } else {
    lines.push(`Société : ${order.company || '—'}`);
    lines.push(`Nom du contact : ${order.contactName || '—'}`);
  }
  lines.push(`Wilaya / ville : ${order.location || '—'}`);
  lines.push('');

  const allPriced = order.items.every((i: OrderItem) => i.priceDA !== null);
  if (allPriced && order.items.length > 0) {
    const total = order.items.reduce(
      (sum: number, i: OrderItem) => sum + (i.priceDA ?? 0) * i.quantity,
      0,
    );
    lines.push(`Total : ${total.toLocaleString('fr-DZ')} DA`);
    lines.push('');
  }

  lines.push(SITE.paymentNote);
  lines.push(SITE.deliveryNote);
  lines.push('');
  lines.push('Merci !');

  return lines.join('\n');
}

export function whatsappUrl(order: OrderState): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage(order))}`;
}