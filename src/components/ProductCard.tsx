import { useState } from 'react';
import type { Product } from '../data/products';
import { BannerFrame } from './ui/BannerFrame';
import { formatPrice } from '../lib/format';

interface ProductCardProps {
  product: Product;
  index: number;
  onAdd: (product: Product, quantity: number) => void;
  mode: 'particulier' | 'professionnel';
}

export function ProductCard({ product, index, onAdd, mode }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const max = mode === 'particulier' ? 20 : 999;

  const handleAdd = () => {
    onAdd(product, quantity);
  };

  const priceText = formatPrice(product.priceDA);

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-ink/5"
      style={{ backgroundColor: product.theme.bg, color: product.theme.text }}
    >
      <div className="relative aspect-[4/3]">
        <BannerFrame rotation={index % 2 === 0 ? -1.2 : 1.4} className="h-full w-full">
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            width="600"
            height="450"
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
          />
        </BannerFrame>
        <span
          className="absolute top-3 left-3 font-display font-extrabold text-5xl leading-none"
          style={{ color: product.theme.accent }}
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-bold text-xl leading-tight">{product.name}</h3>
        <p className="text-sm opacity-80 leading-snug">{product.tagline}</p>

        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.badges.map((b) => (
              <span
                key={b}
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: product.theme.accent, color: '#FBF7EE' }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3">
          {priceText ? (
            <p className="font-display font-bold text-lg">
              {priceText}
              {product.sizeLabel ? (
                <span className="text-sm font-normal opacity-70"> / {product.sizeLabel}</span>
              ) : null}
            </p>
          ) : (
            <span className="inline-block text-sm font-semibold opacity-70 border border-current rounded-full px-3 py-1">
              Prix bientôt disponible
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center rounded-lg border border-current/30">
            <button
              type="button"
              aria-label="Diminuer la quantité"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-current/10 rounded-l-lg"
            >
              −
            </button>
            <span className="w-9 text-center font-display font-bold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Augmenter la quantité"
              onClick={() => setQuantity((q) => Math.min(max, q + 1))}
              className="w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-current/10 rounded-r-lg"
            >
              +
            </button>
          </div>
          <span className="text-xs opacity-70 mr-auto">
            {mode === 'particulier' ? 'unité' : 'carton'}
            {mode === 'professionnel' && product.packSize
              ? ` (${product.packSize} u/carton)`
              : ''}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 font-display font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: product.theme.accent, color: '#FBF7EE' }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;