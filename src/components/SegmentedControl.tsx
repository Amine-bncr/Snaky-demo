import type { OrderMode } from '../hooks/useOrder';

interface SegmentedControlProps {
  value: OrderMode;
  onChange: (m: OrderMode) => void;
}

export function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex rounded-xl bg-cream border border-ink/10 p-1">
      <button
        type="button"
        onClick={() => onChange('particulier')}
        className={`px-5 py-2 rounded-lg font-display font-bold text-sm transition-colors ${
          value === 'particulier' ? 'bg-navy text-cream' : 'text-ink hover:bg-navy/5'
        }`}
      >
        Particulier
      </button>
      <button
        type="button"
        onClick={() => onChange('professionnel')}
        className={`px-5 py-2 rounded-lg font-display font-bold text-sm transition-colors ${
          value === 'professionnel' ? 'bg-navy text-cream' : 'text-ink hover:bg-navy/5'
        }`}
      >
        Professionnel
      </button>
    </div>
  );
}

export default SegmentedControl;