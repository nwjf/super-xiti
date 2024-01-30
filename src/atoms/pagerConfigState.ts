/**
 * pager config atoms
 */

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { PAGER_MAP } from '../constants/pager';

export const PAGER_ATOM_KEY = 'pagerConfigStateKey';

interface PagerConfigState {
  title?: string;
  direction?: 'row' | 'column';
  pagerType?: string;
  width: number;
  height: number;
  unit: 'mm' | 'px' | 'pt' | 'em' | 'cm';
  padding?: string;
  fontSize?: number;
  lineHeight?: number;
  scale?: number;
  border: 'none' | 'dashed' | 'solid' | 'double';
  showPersonalDetail?: boolean;
  dpi: number, // dpi
  contentWidthPx: number; // 内容区域实际宽度 px
  contentHeightPx: number; // 内容区域实际高度 px
};

export const pagerConfigState = atom<PagerConfigState>({
  key: PAGER_ATOM_KEY,
  default: {
    title: '超级习题 xiti.junfa.wang',
    direction: 'column',
    pagerType: 'A4',
    width: PAGER_MAP['A4'].width,
    height: PAGER_MAP['A4'].height,
    unit: PAGER_MAP['A4'].unit,
    padding: '5mm',
    fontSize: 16,
    lineHeight: 26,
    scale: 1,
    border: 'dashed',
    showPersonalDetail: true,
    dpi: 96,
    contentWidthPx: 0,
    contentHeightPx: 0,
  },
});

export function useGetPagerConfigState() {
  return useRecoilValue(pagerConfigState);
}

export function useSetPagerConfigState() {
  const setPagerConfigState = useSetRecoilState(pagerConfigState);

  function setPagerConfit(currValue: any) {
    setPagerConfigState((oldValue: PagerConfigState) => {
      return {
        ...oldValue,
        ...currValue,
      };
    })
  }

  return {
    setPagerConfit,
  };
}
