import { LeafIcon } from './ui/LeafIcon';
import { SITE } from '../config/site';
import { SplitWords } from './hero/SplitWords';
import { HeroBackdrop } from './hero/HeroBackdrop';
import { useHeroProgress } from '../hooks/useHeroProgress';
import '../Hero.css';

const headlineWords = [
  { text: 'La' },
  { text: 'santé' },
  { br: true as const, className: 'sm:hidden' },
  { text: 'dans' },
  { text: 'chaque' },
  { br: true as const },
  { text: 'gorgée.', em: true },
];

const kickerWords = [
  { text: 'PRODUITS' },
  { text: 'VÉGÉTALIENS' },
  { text: 'NATURELS' },
  { text: 'MADE' },
  { text: 'IN' },
  { text: 'DZ' },
];

const subWords = [
  { text: 'Produits' },
  { text: 'végétaliens' },
  { text: '&' },
  { text: 'naturels.' },
  { text: 'Fabriqués' },
  { text: 'en' },
  { text: 'Algérie.' },
];

const strapWords = [
  { text: '100' },
  { text: '%' },
  { text: 'végétal' },
  { text: 'Ingrédients' },
  { text: "d'Algérie" },
  { text: 'Fabriqué' },
  { text: 'chez' },
  { text: 'Snaky' },
];

export function Hero() {
  const stageRef = useHeroProgress();

  return (
    <section id="accueil" className="hero-stage" ref={stageRef}>
      <div className="hero-pin">
        <HeroBackdrop />
        <div className="hero-veil" />
        <div className="hero-type">
          <p className="hero-kicker">
            <SplitWords words={kickerWords} startIndex={0} />
          </p>
          <h1 className="hero-h1" aria-label={SITE.tagline}>
            <SplitWords words={headlineWords} startIndex={6} />
          </h1>
          <p className="hero-sub">
            <SplitWords words={subWords} startIndex={14} />
          </p>
          <div className="hero-cta">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-bold text-base px-6 py-3.5 rounded-xl bg-leaf text-navy-deep hover:bg-leaf-deep hover:text-cream transition-colors"
            >
              Commander sur WhatsApp
            </a>
            <a
              href="#produits"
              className="inline-flex items-center gap-2 font-display font-bold text-base px-6 py-3.5 rounded-xl border border-cream/40 text-cream hover:bg-cream/10 transition-colors"
            >
              Voir les produits
            </a>
          </div>
        </div>
        <div className="hero-strap">
          <span className="leaf">
            <LeafIcon className="w-4 h-4" aria-hidden="true" />
          </span>
          <SplitWords words={strapWords} startIndex={22} />
        </div>
      </div>
    </section>
  );
}

export default Hero;