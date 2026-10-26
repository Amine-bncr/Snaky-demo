import type { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import type { OrderMode } from '../hooks/useOrder';

interface ProductGridProps {
  products: Product[];
  mode: OrderMode;
  onAdd: (product: Product, quantity: number) => void;
}

export function ProductGrid({ products, mode, onAdd }: ProductGridProps) {
  return (
    <div
      className="grid gap-5"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          mode={mode}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

export default ProductGrid;