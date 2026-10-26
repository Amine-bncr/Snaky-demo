export function MadeInDzStamp({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Made in DZ"
    >
      <circle cx="100" cy="100" r="92" fill="#0E5F36" stroke="#263478" strokeWidth="6" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#FBF7EE" strokeWidth="3" strokeDasharray="8 10" />
      <text
        x="100"
        y="78"
        textAnchor="middle"
        fill="#FBF7EE"
        fontFamily="system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="2"
      >
        MADE
      </text>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill="#FBF7EE"
        fontFamily="system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="2"
      >
        IN
      </text>
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill="#FBF7EE"
        fontFamily="system-ui, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="4"
      >
        DZ
      </text>
    </svg>
  );
}

export default MadeInDzStamp;