interface LeafIconProps {
  className?: string;
  'aria-hidden'?: boolean | string;
}

export function LeafIcon({ className = '', 'aria-hidden': ariaHidden = true, ...rest }: LeafIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden === true}
      {...rest}
    >
      <path d="M17 8C8 10 5 17 8 20C19 20 12 5 20 3C11 2 17 8 17 8Z" />
      <path d="M12 12C12 12 9 15 6 18" />
    </svg>
  );
}

export default LeafIcon;