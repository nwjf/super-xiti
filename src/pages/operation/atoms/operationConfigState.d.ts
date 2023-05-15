

export interface OperationConfig {
  column: number;
  mode: string;
}


export interface OperationConfigState {
  config: OperationConfig;
  data: Array<any>;
}