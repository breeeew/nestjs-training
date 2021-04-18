import * as bwip from 'bwip-js';
import { Imports } from './types';

export const importsProviders = [
  {
    provide: Imports.BARCODE_MODULE,
    useFactory: () => bwip,
  },
];
