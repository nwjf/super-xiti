import type { GetProp, MenuProps } from 'antd';
export interface Path {
  label: string;
  key: string;
  path: string;
  type?: string;
  target?: '_balnk' | '';
  children?: Path[]
};
type MenuItem = GetProp<MenuProps, 'items'>[number];

type PathList = MenuItem & Path;

export const pathList: PathList[] = [
  { label: '官网', key: 'index', path: '/index', target: '' },
  { label: '运算题', key: 'operation', path: '/operation', target: '' },
  { label: '中文', key: 'chinese', path: '/chinese', target: '' },
  { label: '条形码', key: 'barcode', path: '/barcode', target: '' },
];