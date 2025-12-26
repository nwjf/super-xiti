export interface BarcodeConfig {
  fontSize: number; // 字体大小
  lineHeight: number; // 行距
  rowNum: number|string; // 一行多少个
}
export interface BarcodeConfigState {
  config: BarcodeConfig,
  data: any[]
}