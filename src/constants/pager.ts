/**
 * 纸张类型
 */

export interface PagerMapItem {
  name?: string;
  width?: string;
  height?: string;
};
export type PagerMap = Record<string, PagerMapItem>;

export const PAGER_MAP: PagerMap = {
  A0: { name: 'A0', width: '841mm', height: '1189mm' },
  A1: { name: 'A1', width: '594mm', height: '841mm' },
  A2: { name: 'A2', width: '420mm', height: '594mm' },
  A3: { name: 'A3', width: '297mm', height: '420mm' },
  A4: { name: 'A4', width: '210mm', height: '297mm' },
  A5: { name: 'A5', width: '148mm', height: '210mm' },
  A6: { name: 'A6', width: '105mm', height: '148mm' },
  A7: { name: 'A7', width: '74mm', height: '105mm' },
  A8: { name: 'A8', width: '52mm', height: '74mm' },
};

export const PADDING_LIST = [5, 10, 15, 20, 25, 30];
