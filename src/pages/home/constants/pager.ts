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

export const FONT_SIZR_LIST: Array<Record<string, any>> = [
  { label: '10pt', value: 10 },
  { label: '11pt', value: 11 },
  { label: '12pt', value: 12 },
  { label: '13pt', value: 13 },
  { label: '14pt', value: 14 },
  { label: '15pt', value: 15 },
  { label: '16pt', value: 16 },
  { label: '17pt', value: 17 },
  { label: '18pt', value: 18 },
  { label: '19pt', value: 19 },
  { label: '20pt', value: 20 },
];

export const BORDER_WIDTH_LIST = [
  { label: '0mm', value: '0' },
  { label: '1mm', value: '1mm' },
  { label: '2mm', value: '2mm' },
  { label: '3mm', value: '3mm' },
  { label: '4mm', value: '4mm' },
  { label: '5mm', value: '5mm' },
];
