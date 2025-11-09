import React from 'react';

export type Variant = 'gray' | 'green' | 'yellow' | 'red' | 'blue' | 'purple';

const VARIANT_BASE: Record<Variant, { hex: string; text: string }> = {
  gray: { hex: '#8B8B8B', text: '#E5E5E5' }, // neon silver-gray
  green: { hex: '#39FF14', text: '#0B8000' }, // neon green
  yellow: { hex: '#FFFF33', text: '#8A8000' }, // neon yellow
  red: { hex: '#FF073A', text: '#80001A' }, // neon red/pinkish
  blue: { hex: '#00FFFF', text: '#004D4D' }, // neon cyan
  purple: { hex: '#BF00FF', text: '#4B0082' }, // neon purple
};

function hexToRgb(hex: string) {
  const c = hex.replace('#', '');
  const n = parseInt(c, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/**
 * Badge
 *
 * Lightweight inline badge for MDX. Renders a thin colored border and a
 * subtle translucent background derived from the variant color so it blends
 * visually with Nextra callouts while remaining an inline element.
 *
 */
export default function Badge({
  children,
  variant = 'gray',
  style,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  style?: React.CSSProperties;
  className?: string;
}) {
  const base = VARIANT_BASE[variant];
  const { r, g, b } = hexToRgb(base.hex);

  const border = `1px solid rgba(${r}, ${g}, ${b}, 0.50)`;
  const background = `rgba(${r}, ${g}, ${b}, 0.06)`;

  const styles: React.CSSProperties = {
    display: 'inline-block',
    padding: '0.2rem 0.66rem',
    borderRadius: 6,
    borderWidth: 0.1,
    fontSize: '0.82rem',
    fontWeight: 400,
    lineHeight: 1,
    background,
    color: `rgba(${r}, ${g}, ${b}, 0.92)`,
    border,
    boxShadow: '0 2px 6px rgba(2, 6, 23, 0.10)',
  };

  return (
    <span className={className} style={{ ...styles, ...style }}>
      {children}
    </span>
  );
}
