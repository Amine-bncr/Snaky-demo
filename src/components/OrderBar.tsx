import { LeafIcon } from './ui/LeafIcon';
import { useOrder } from '../hooks/useOrder';

export function OrderBar() {
  const { totalCount, isEmpty, clearOrder } = useOrder();

  if (isEmpty) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-navy-deep text-cream border-t border-cream/10"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LeafIcon className="w-5 h-5 text-leaf" aria-hidden="true" />
          <span className="font-display font-bold text-sm">
            Ma commande · {totalCount} article{totalCount > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearOrder}
            className="text-xs text-cream/60 hover:text-cream/80 px-3 py-2"
          >
            Vider
          </button>
          <a
            href="#commander"
            className="inline-flex items-center font-display font-bold text-sm px-5 py-2.5 rounded-xl bg-leaf text-navy-deep hover:bg-leaf-deep hover:text-cream transition-colors"
          >
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderBar;