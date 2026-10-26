import { SITE } from '../../config/site';

export function HeroBackdrop() {
  if (SITE.HERO_IMAGE) {
    return (
      <img
        className="hero-media"
        src={SITE.HERO_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
    );
  }

  return (
    <svg
      className="hero-fallback"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="heroNavy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2358" />
          <stop offset="100%" stopColor="#263478" />
        </linearGradient>
        <linearGradient id="heroGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BBF3E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7BBF3E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#heroNavy)" />

      {/* Large two-leaf mark, right side, ~10% opacity */}
      <g opacity="0.10" fill="#7BBF3E">
        <path d="M1080 180C950 210 900 330 960 420C1130 420 1010 150 1240 120C1030 100 1080 180 1080 180Z" />
        <path d="M1030 300C1030 300 990 360 930 410" stroke="#7BBF3E" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M1180 240C1120 270 1080 330 1120 400C1240 400 1160 210 1300 190C1150 170 1180 240 1180 240Z" opacity="0.7" />
        <path d="M1140 330C1140 330 1110 370 1060 410" stroke="#7BBF3E" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>

      {/* Logo concave banner curve: a large soft arc sweeping near the bottom */}
      <path
        d="M-40 640 Q260 760 600 720 T1240 660"
        stroke="#FBF7EE"
        strokeWidth="2"
        fill="none"
        opacity="0.08"
        strokeLinecap="round"
      />
      <path
        d="M-20 690 Q280 790 600 760 T1220 710"
        stroke="#7BBF3E"
        strokeWidth="2"
        fill="none"
        opacity="0.06"
        strokeLinecap="round"
      />

      <rect width="1200" height="800" fill="url(#heroGlow)" />
    </svg>
  );
}

export default HeroBackdrop;