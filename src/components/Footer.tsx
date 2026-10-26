import { SITE } from '../config/site';
import { LeafIcon } from './ui/LeafIcon';
import logoSnaky from '../assets/logo-snaky.png';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream/90 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-cream px-3 py-1">
              <img src={logoSnaky} alt="Snaky DZ" className="h-10 w-auto" />
            </span>
          </a>
          <div className="flex items-center gap-5 text-sm">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-leaf transition-colors"
            >
              Instagram
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-leaf transition-colors"
            >
              Facebook
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-leaf transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-cream/10 text-center text-xs text-cream/50 flex items-center justify-center gap-2">
          <LeafIcon className="w-4 h-4 text-leaf" aria-hidden="true" />
          Entreprise basée à {SITE.city}, {SITE.countryLabel}.
        </div>
        <div className="mt-2 text-center text-xs text-cream/40">
          © 2026 Snaky DZ
        </div>
      </div>
    </footer>
  );
}

export default Footer;