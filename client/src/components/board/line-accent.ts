import { Layers, type LucideIcon } from 'lucide-react';

import assemblyIcon from '@client/src/assets/assembly-icon.png';
import injectionIcon from '@client/src/assets/injection-icon.png';
import sewingIcon from '@client/src/assets/sewing-icon.png';
import type { ProductionAccent } from '@shared/api.interface';

interface AccentStyle {
  icon?: LucideIcon;
  imageSrc?: string;
  bar: string;
  tile: string;
  text: string;
  border: string;
}

export const LINE_ACCENT_STYLES: Record<ProductionAccent, AccentStyle> = {
  blue: {
    imageSrc: sewingIcon,
    bar: 'bg-line-blue',
    tile: 'bg-line-blue/10',
    text: 'text-line-blue',
    border: 'hover:border-line-blue focus-visible:border-line-blue',
  },
  green: {
    imageSrc: injectionIcon,
    bar: 'bg-line-green',
    tile: 'bg-line-green/10',
    text: 'text-line-green',
    border: 'hover:border-line-green focus-visible:border-line-green',
  },
  orange: {
    imageSrc: assemblyIcon,
    bar: 'bg-line-orange',
    tile: 'bg-line-orange/10',
    text: 'text-line-orange',
    border: 'hover:border-line-orange focus-visible:border-line-orange',
  },
  violet: {
    icon: Layers,
    bar: 'bg-line-violet',
    tile: 'bg-line-violet/10',
    text: 'text-line-violet',
    border: 'hover:border-line-violet focus-visible:border-line-violet',
  },
};
