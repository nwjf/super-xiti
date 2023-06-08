/**
 * 纸张类型
 */

export interface PagerMapItem {
  name?: string;
  width: number;
  height: number;
  unit: 'mm'
};
export type PagerMap = Record<string, PagerMapItem>;

export const PAGER_MAP: PagerMap = {
  // A0: { name: 'A0', width: '841mm', height: '1189mm' },
  // A1: { name: 'A1', width: '594mm', height: '841mm' },
  // A2: { name: 'A2', width: '420mm', height: '594mm' },
  // A3: { name: 'A3', width: '297mm', height: '420mm' },
  A4: { name: 'A4', width: 210, height: 297, unit: 'mm' },
  // A5: { name: 'A5', width: '148mm', height: '210mm' },
  // A6: { name: 'A6', width: '105mm', height: '148mm' },
  // A7: { name: 'A7', width: '74mm', height: '105mm' },
  // A8: { name: 'A8', width: '52mm', height: '74mm' },
};

export const PAGER_LIST = Object.values(PAGER_MAP).map(item => ({ label: item.name + '纸', value: item.name}));

export const DIRECTION_LIST = [
  { label: '纵向', value: 'column' },
  { label: '横向', value: 'row' },
];

export const PADDING_LIST = [
  { label: '5mm', value: '5mm' },
  { label: '10mm', value: '10mm' },
  { label: '15mm', value: '15mm' },
  { label: '20mm', value: '20mm' },
  { label: '25mm', value: '25mm' },
];

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

export const BORDER_COLOR_LIST = [];

export const LINE_HEIGHT_LIST = [
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '23', value: 23 },
  { label: '24', value: 24 },
  { label: '25', value: 25 },
  { label: '26', value: 26 },
  { label: '27', value: 27 },
  { label: '28', value: 28 },
  { label: '29', value: 29 },
  { label: '30', value: 30 },
  { label: '31', value: 31 },
  { label: '32', value: 32 },
  { label: '33', value: 33 },
  { label: '34', value: 34 },
  { label: '35', value: 35 },
  { label: '36', value: 36 },
  { label: '37', value: 37 },
  { label: '38', value: 38 },
  { label: '39', value: 39 },
  { label: '40', value: 40 },
  { label: '41', value: 41 },
  { label: '42', value: 42 },
  { label: '43', value: 43 },
  { label: '44', value: 44 },
  { label: '45', value: 45 },
  { label: '46', value: 46 },
  { label: '47', value: 47 },
  { label: '48', value: 48 },
  { label: '49', value: 49 },
  { label: '50', value: 50 },
];

export const MODE_LIST = [
  { label: '背题模式', value: 'read' },
  { label: '答题模式', value: 'solve' },
];
