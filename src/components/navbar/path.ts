
export interface Path {
  label: string;
  key: string;
  path: string;
  target?: '_balnk' | '';
  children?: Path[]
};
export const pathList: Path[] = [
  { label: '官网', key: 'index', path: '/index', target: '' },
  { label: '运算题', key: 'operation', path: '/operation', target: '' },
  { label: '中文', key: 'chinese', path: '/chinese', target: '' },
  { label: '条形码', key: 'barcode', path: '/barcode', target: '' },
];