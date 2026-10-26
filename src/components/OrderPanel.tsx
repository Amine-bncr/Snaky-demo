import { useMemo } from 'react';
import { SITE } from '../config/site';
import { SegmentedControl } from './SegmentedControl';
import { OrderSummary } from './order/OrderSummary';
import { OrderForm } from './order/OrderForm';
import { LeafIcon } from './ui/LeafIcon';
import { formatPrice } from '../lib/format';
import { useOrder } from '../hooks/useOrder';
import { whatsappUrl } from '../lib/whatsapp';

export function OrderPanel() {
  const {
    state, mode, setMode, setQuantity, removeItem, setField, clearOrder,
    totalCount, total, isEmpty,
  } = useOrder();

  const errors = useMemo(() => {
    const e: Partial<Record<'name' | 'company' | 'contact' | 'location', string>> = {};
    if (mode === 'particulier' && !state.customerName.trim()) e.name = 'Le nom est requis.';
    if (mode === 'professionnel') {
      if (!state.company.trim()) e.company = 'La société est requise.';
      if (!state.contactName.trim()) e.contact = 'Le nom du contact est requis.';
    }
    if (!state.location.trim()) e.location = 'La wilaya / ville est requise.';
    return e;
  }, [mode, state.customerName, state.company, state.contactName, state.location]);

  const canSubmit = !isEmpty && Object.keys(errors).length === 0;
  const url = canSubmit ? whatsappUrl(state) : '';

  const totalText = total !== null ? formatPrice(total) : null;

  return (
    <section id="commander" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">
              Commander
            </h2>
            <p className="mt-3 text-ink/75">
              Choisissez votre mode, puis envoyez votre commande par WhatsApp. Aucune donnée n’est
              stockée sur un serveur.
            </p>

            <div className="mt-6">
              <SegmentedControl value={mode} onChange={setMode} />
            </div>

            <div className="mt-8">
              <OrderSummary
                items={state.items}
                mode={mode}
                setQuantity={setQuantity}
                removeItem={removeItem}
              />
            </div>

            <div className="mt-6">
              <OrderForm
                mode={mode}
                values={{
                  customerName: state.customerName,
                  company: state.company,
                  contactName: state.contactName,
                  location: state.location,
                }}
                setField={setField}
                errors={errors}
              />
            </div>
          </div>

          <aside className="mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-24 bg-navy text-cream rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold">Ma commande</span>
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-leaf text-navy-deep font-display font-bold"
                  aria-live="polite"
                >
                  {totalCount}
                </span>
              </div>

              {isEmpty ? (
                <div className="mt-6 text-center">
                  <p className="text-cream/70 text-sm">Votre commande est vide.</p>
                  <a
                    href="#produits"
                    className="mt-3 inline-block text-sm font-display font-bold text-leaf hover:underline"
                  >
                    Ajouter des produits
                  </a>
                  <p className="mt-4 text-xs text-cream/50">
                    Une question ?{' '}
                    <a
                      href={`https://wa.me/${SITE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-leaf hover:underline"
                    >
                      Poser une question sur WhatsApp
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-4 space-y-2 text-sm">
                    {state.items.map((item) => (
                      <div key={item.productId} className="flex justify-between">
                        <span className="text-cream/80">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-display font-bold tabular-nums">
                          {item.priceDA !== null ? formatPrice(item.priceDA * item.quantity) : '—'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {totalText ? (
                    <div className="mt-4 pt-4 border-t border-cream/15 flex justify-between items-baseline">
                      <span className="text-sm text-cream/70">Total</span>
                      <span className="font-display font-extrabold text-2xl tabular-nums">
                        {totalText}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-4 pt-4 border-t border-cream/15 text-xs text-cream/60">
                      Le total sera affiché lorsque les prix seront disponibles.
                    </p>
                  )}

                  <p className="mt-4 text-xs text-cream/70 leading-relaxed">
                    <LeafIcon className="inline w-4 h-4 text-leaf mr-1" aria-hidden="true" />
                    {SITE.deliveryNote}
                  </p>
                  <p className="mt-1 text-xs text-cream/70">{SITE.paymentNote}</p>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!canSubmit}
                    className={`mt-5 w-full inline-flex items-center justify-center gap-2 font-display font-bold text-base px-5 py-3.5 rounded-xl transition-colors ${
                      canSubmit
                        ? 'bg-leaf text-navy-deep hover:bg-leaf-deep hover:text-cream'
                        : 'bg-cream/20 text-cream/60 cursor-not-allowed'
                    }`}
                  >
                    Envoyer ma commande sur WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={clearOrder}
                    className="mt-3 w-full text-xs text-cream/50 hover:text-cream/80"
                  >
                    Vider la commande
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default OrderPanel;