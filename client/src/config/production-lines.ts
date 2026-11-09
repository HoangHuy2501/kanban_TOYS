import type { ProductionLine } from '@shared/api.interface';

export const PRODUCTION_LINES: ProductionLine[] = [
  {
    id: 'a307a6b1-c76a-460f-a813-7ae5abbc2b2a',
    code: 'F11-FINISHING',
    name: 'F11 FINISHING',
    subtitle: 'Finishing Line',
    accent: 'blue',
    targetLabel: 'Kiểm hàng',
  },
  {
    id: '8881886b-637e-4d6f-9c50-fe6fe874ed9b',
    code: 'F11-INJMOLDING',
    name: 'F11 INJMOLDING',
    subtitle: 'Injection Molding Line',
    accent: 'green',
    targetLabel: 'Ép nhựa',
  },
  {
    id: 'a77b5c92-cfee-4592-a9c1-08ba1d3a50dc',
    code: 'ASSEMBLY',
    name: 'ASSEMBLY',
    subtitle: 'Assembly Line',
    accent: 'orange',
    targetLabel: 'Lắp ráp',
  },
];

export const findProductionLine = (code: string): ProductionLine | null =>
  PRODUCTION_LINES.find((line: ProductionLine) => line.code === code) ?? null;
