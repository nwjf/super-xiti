/**
 * chinese config store
 */
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { BarcodeConfigState, BarcodeConfig } from './barcodeConfigState.d';

const BARCODE_CONFIG_STATAE_KEY = 'barcodeConfigState';

const barcodeConfigState = atom<BarcodeConfigState>({
  key: BARCODE_CONFIG_STATAE_KEY,
  default: {
    config: {
      fontSize: 20,
      lineHeight: 20,
      rowNum: 4,
    },
    data: [
      { text: 'A-2-11' },
      { text: 'A-3-12' },
      { text: 'A-3-12' },
    ],
  }
});

export function useGetBarcodeConfigState() {
  return useRecoilValue(barcodeConfigState);
}

export function useSetBarcodeConfigState() {
  const setBarcodeConfigState = useSetRecoilState(barcodeConfigState);
  function setBarcodeConfig(currValue: any) {
    setBarcodeConfigState((oldValue: BarcodeConfigState) => {
      return {
        ...oldValue,
        config: {
          ...oldValue.config,
          ...currValue
        },
      };
    });
  }
  function setBarcodeData(data: any[]) {
    setBarcodeConfigState((oldValue: BarcodeConfigState) => {
      return {
        ...oldValue,
        data
      };
    });
  }
  return {
    setBarcodeConfig,
    setBarcodeData,
  };
}