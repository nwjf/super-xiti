export interface ChineseConfig {
  latticeType: string; // 格子类型
  latticeSize: string; // 格子大小
  paint: string; // 描红 none, half, whole
}
export interface ChineseConfigState {
  config: ChineseConfig,
  data: any[]
}