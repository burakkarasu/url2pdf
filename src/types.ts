export type Paper = 'A4' | 'A5' | 'CUSTOM';

export type Layout = {
  scale: number;
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
};
