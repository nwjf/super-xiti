/**
 * chinese config store
 */
import { atom, useRecoilValue } from 'recoil';
import { ChineseConfigState } from './chineseConfigState.d';

const CHINESE_CONFIG_STATAE_KEY = 'chineseConfigState';

const chineseConfigState = atom<ChineseConfigState>({
  key: CHINESE_CONFIG_STATAE_KEY,
  default: {
    config: {
      latticeType: 'rectangleGrid',
    },
    data: [],
  }
});

export function useGetChineseConfigState() {
  return useRecoilValue(chineseConfigState);
}

export function useSetChineseConfigState() {
  function setChineseConfig() {}
  function setChineseData() {}
}