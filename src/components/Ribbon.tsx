import { LeafIcon } from './ui/LeafIcon';

export function Ribbon() {
  return (
    <section className="bg-cream py-6 border-y border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base font-display font-bold text-ink">
          <span>100 % végétal</span>
          <LeafIcon className="w-4 h-4 text-leaf" aria-hidden="true" />
          <span>Ingrédients d’Algérie</span>
          <LeafIcon className="w-4 h-4 text-leaf" aria-hidden="true" />
          <span>Fabriqué chez Snaky</span>
          <LeafIcon className="w-4 h-4 text-leaf" aria-hidden="true" />
          <span>Made in DZ</span>
        </div>
      </div>
    </section>
  );
}

export default Ribbon;