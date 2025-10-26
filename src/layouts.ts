import { Layout, Paper } from './types.js';

export const defaultLayouts: Record<Paper, Layout> = {
  A4: {
    scale: 1.0,
    margin: {
      top: '12mm',
      right: '12mm',
      bottom: '12mm',
      left: '12mm',
    },
  },
  A5: {
    scale: 0.95,
    margin: {
      top: '9mm',
      right: '9mm',
      bottom: '9mm',
      left: '9mm',
    },
  },
};
