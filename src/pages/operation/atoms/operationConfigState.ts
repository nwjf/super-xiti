/**
 * operation confit state
 */
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';


import { OperationConfigState, OperationConfig } from './operationConfigState.d';

const OPERATION_CONFIG_STATE_KEY = 'operationConfigState';

export const operationConfigState = atom<OperationConfigState>({
  key: OPERATION_CONFIG_STATE_KEY,
  default: {
    config: {
      column: 3,
      mode: 'read', // read solve
    },
    data: [],
  },
});

export function useGetOperationConfigState() {
  return useRecoilValue(operationConfigState);
}

export function useSetOperationConfigState() {
  const setOperationConfigState = useSetRecoilState(operationConfigState);

  function setOperationConfig(currValue: any) {
    setOperationConfigState((oldValue) => {
      return {
        ...oldValue,
        config: {
          ...oldValue.config,
          ...currValue,
        },
      };
    });
  }

  function setOperationData(currValue: Array<any>) {
    setOperationConfigState((oldValue) => {
      return {
        ...oldValue,
        data: currValue,
      };
    });
  }

  return {
    setOperationConfig,
    setOperationData,
  };
}