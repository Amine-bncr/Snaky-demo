import type { OrderItem } from '../../hooks/useOrder';
import { formatPrice } from '../../lib/format';

interface OrderSummaryProps {
  items: OrderItem[];
  mode: 'particulier' | 'professionnel';
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
}

export function OrderSummary({ items, mode, setQuantity, removeItem }: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-ink/60 text-sm">Votre commande est vide.</p>
        <p className="text-ink/60 text-sm mt-1">
          Ajoutez des produits depuis le catalogue ci-dessus.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.productId}
          className="flex items-center gap-3 bg-cream/60 rounded-xl p-3"
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Diminuer"
              onClick={() => setQuantity(item.productId, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 rounded-lg bg-navy text-cream font-bold"
            >
              −
            </button>
            <span className="w-8 text-center font-display font-bold tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Augmenter"
              onClick={() => setQuantity(item.productId, item.quantity + 1)}
              className="w-8 h-8 rounded-lg bg-navy text-cream font-bold"
            >
              +
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-sm leading-tight truncate">{item.name}</p>
            <p className="text-xs text-ink/60">
              {mode === 'particulier' ? 'unité' : 'carton'}
              {item.priceDA !== null ? ` · ${formatPrice(item.priceDA)}` : ''}
            </p>
          </div>
          <button
            type="button"
            aria-label="Supprimer"
            onClick={() => removeItem(item.productId)}
            className="text-ink/40 hover:text-cocoa text-sm font-bold"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

export default OrderSummary;