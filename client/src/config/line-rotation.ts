export const LINE_ROTATION_INTERVAL_MS = 180_000;

export const ROTATING_LINE_CODES: string[] = ['F11-FINISHING', 'ASSEMBLY'];

export const isRotatingLine = (code: string): boolean =>
  ROTATING_LINE_CODES.includes(code);
