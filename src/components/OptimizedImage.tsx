import React from 'react';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: 'blurred' | 'dominantColor' | 'tracedSVG' | 'none';
  formats?: string[];
  quality?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  placeholder = 'blurred',
  formats = ['auto', 'webp', 'avif'],
  quality = 80,
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Check if it's a local image (starts with /static/ or is a relative path)
  const isLocalImage = src.startsWith('/static/') || !src.startsWith('http');
  
  // For external images (like Contentful), we'll use a regular img with optimization
  if (!isLocalImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        style={{
          ...style,
          objectFit: 'cover',
          ...(width && height ? { aspectRatio: `${width}/${height}` } : {}),
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    );
  }

  // For local images, we can use StaticImage if we know the path
  // This is a fallback for local images that aren't processed by Gatsby
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      style={{
        ...style,
        objectFit: 'cover',
        ...(width && height ? { aspectRatio: `${width}/${height}` } : {}),
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};

export default OptimizedImage; 