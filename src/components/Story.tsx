import { LeafIcon } from './ui/LeafIcon';
import { MadeInDzStamp } from './ui/MadeInDzStamp';
import { SITE } from '../config/site';

export function Story() {
  return (
    <section id="histoire" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">
              Notre histoire
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/85">
              Snaky DZ est une petite équipe partie de zéro qui a construit une entreprise
              de produits végétaliens &amp; naturels. Tous nos ingrédients viennent d’Algérie
              et chaque produit est fabriqué chez nous, en interne. Nous croyons que la
              santé passe par ce qu’il y a dans le pot.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/85">
              L’entreprise est basée à {SITE.city}, {SITE.countryLabel}. Nos produits sont
              aussi disponibles dans de grands supermarchés un peu partout en Algérie.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <LeafIcon className="w-6 h-6 text-leaf-deep mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-display font-bold text-lg">100 % végétal</span>
              </li>
              <li className="flex items-start gap-3">
                <LeafIcon className="w-6 h-6 text-leaf-deep mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-display font-bold text-lg">Ingrédients d’Algérie</span>
              </li>
              <li className="flex items-start gap-3">
                <LeafIcon className="w-6 h-6 text-leaf-deep mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-display font-bold text-lg">Fabriqué par notre équipe</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <MadeInDzStamp className="w-44 h-44 sm:w-56 sm:h-56" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;