import { TYPE_COLORS, TYPE_NAMES_FR } from '../lib/utils';

interface TypeBadgeProps {
  typeName: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ typeName, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[typeName] || '#888';
  const label = TYPE_NAMES_FR[typeName] || typeName;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-block rounded-full font-semibold text-white shadow-sm ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}
