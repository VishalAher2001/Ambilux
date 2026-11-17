import { useState } from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
  darkFallback?: boolean;
  fit?: 'cover' | 'contain';
}

export default function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspect = 'aspect-[4/3]',
  darkFallback = false,
  fit = 'cover',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${aspect} ${
        darkFallback ? 'bg-[#222220]' : 'bg-[#ECEAE3]'
      } ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full ${
            fit === 'contain' ? 'object-contain' : 'object-cover'
          } transition-transform duration-700 ease-out ${imgClassName}`}
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center p-6 text-center ${
            darkFallback
              ? 'bg-gradient-to-br from-[#262624] to-[#171717] text-[#F7F6F2]'
              : 'bg-gradient-to-br from-[#F7F6F2] to-[#ECEAE3] text-[#171717]'
          }`}
        >
          <span className="mb-3 h-1 w-10 rounded-full bg-[#F5A623]" aria-hidden="true" />
          <span className="max-w-xs text-xs font-medium tracking-wide opacity-75">{alt}</span>
        </div>
      )}
    </div>
  );
}
