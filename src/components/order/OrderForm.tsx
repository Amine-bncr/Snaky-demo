import type { OrderMode } from '../../hooks/useOrder';

interface OrderFormProps {
  mode: OrderMode;
  values: {
    customerName: string;
    company: string;
    contactName: string;
    location: string;
  };
  setField: (field: 'customerName' | 'company' | 'contactName' | 'location', value: string) => void;
  errors: { location?: string };
}

export function OrderForm({ mode, values, setField, errors }: OrderFormProps) {
  const locationError = errors.location;

  return (
    <div className="space-y-3">
      {mode === 'particulier' ? (
        <>
          <label className="block">
            <span className="text-sm font-display font-bold">Nom</span>
            <input
              type="text"
              required
              value={values.customerName}
              onChange={(e) => setField('customerName', e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Votre nom"
            />
          </label>
        </>
      ) : (
        <>
          <label className="block">
            <span className="text-sm font-display font-bold">Société</span>
            <input
              type="text"
              required
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nom de la société"
            />
          </label>
          <label className="block">
            <span className="text-sm font-display font-bold">Nom du contact</span>
            <input
              type="text"
              required
              value={values.contactName}
              onChange={(e) => setField('contactName', e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nom de la personne de contact"
            />
          </label>
        </>
      )}
      <label className="block">
        <span className="text-sm font-display font-bold">Wilaya / ville</span>
        <input
          type="text"
          required
          value={values.location}
          onChange={(e) => setField('location', e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
          placeholder="Ex. Alger, Oran…"
        />
        {locationError ? (
          <p className="mt-1 text-sm text-cocoa" role="alert">
            {locationError}
          </p>
        ) : null}
      </label>
    </div>
  );
}

export default OrderForm;