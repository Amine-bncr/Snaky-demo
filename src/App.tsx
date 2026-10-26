import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ribbon } from './components/Ribbon';
import { ProductGrid } from './components/ProductGrid';
import { Story } from './components/Story';
import { OrderPanel } from './components/OrderPanel';
import { OrderBar } from './components/OrderBar';
import { Footer } from './components/Footer';
import { getProducts } from './data/products';
import { useOrder } from './hooks/useOrder';

export function App() {
  const products = getProducts();
  const { mode, addItem } = useOrder();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Ribbon />
        <section id="produits" className="py-16 sm:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight text-center">
              Nos 6 produits
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1.5 rounded-full bg-leaf" />
            </div>
            <div className="mt-10">
              <ProductGrid products={products} mode={mode} onAdd={addItem} />
            </div>
          </div>
        </section>
        <Story />
        <OrderPanel />
      </main>
      <OrderBar />
      <Footer />
    </div>
  );
}

export default App;