/**
 * chinese config store
 */
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChineseConfigState, ChineseConfig } from './chineseConfigState.d';

const CHINESE_CONFIG_STATAE_KEY = 'chineseConfigState';

const chineseConfigState = atom<ChineseConfigState>({
  key: CHINESE_CONFIG_STATAE_KEY,
  default: {
    config: {
      latticeType: 'rectangleGrid',
      latticeSize: 'medium',
      paint: 'none',
    },
    data: [
      { text: '壹' },
      { text: '贰' },
      { text: '叁' },
      { text: '肆' },
      { text: '伍' },
      { text: '陆' },
      { text: '柒' },
      { text: '捌' },
      { text: '玖' },
      { text: '拾' },
      { text: '佰' },
      { text: '仟' },
      { text: '万' },
      { text: '亿' },
      { text: '元' },
      { text: '角' },
      { text: '分' },
    ],
  }
});

export function useGetChineseConfigState() {
  return useRecoilValue(chineseConfigState);
}

export function useSetChineseConfigState() {
  const setChineseConfigState = useSetRecoilState(chineseConfigState);
  function setChineseConfig(currValue: any) {
    setChineseConfigState((oldValue: ChineseConfigState) => {
      return {
        ...oldValue,
        config: {
          ...oldValue.config,
          ...currValue
        },
      };
    });
  }
  function setChineseData(data: any[]) {
    setChineseConfigState((oldValue: ChineseConfigState) => {
      return {
        ...oldValue,
        data
      };
    });
  }
  return {
    setChineseConfig,
    setChineseData,
  };
}