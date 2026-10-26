import React from 'react';

interface BannerFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  rotation?: number;
  className?: string;
  children: React.ReactNode;
}

export function BannerFrame({
  rotation = 0,
  className = '',
  children,
  ...rest
}: BannerFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        clipPath:
          'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 12% 100%, 0 88%)',
        transform: `rotate(${rotation}deg)`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default BannerFrame;