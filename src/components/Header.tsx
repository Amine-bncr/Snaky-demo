import { SITE } from '../config/site';
import { WhatsAppIcon } from './ui/WhatsAppIcon';
import logoSnaky from '../assets/logo-snaky.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[var(--header-h)] flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center">
          <img
            src={logoSnaky}
            alt="Snaky DZ"
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 font-display font-bold text-sm">
          <a href="#produits" className="text-ink hover:text-leaf transition-colors">
            Produits
          </a>
          <a href="#histoire" className="text-ink hover:text-leaf transition-colors">
            Notre histoire
          </a>
          <a href="#commander" className="text-ink hover:text-leaf transition-colors">
            Commander
          </a>
        </nav>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous contacter sur WhatsApp"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-leaf text-navy-deep hover:bg-leaf-deep hover:text-cream transition-colors"
        >
          <WhatsAppIcon className="w-6 h-6" aria-hidden={true} />
        </a>
      </div>
    </header>
  );
}

export default Header;