/**
 * pager config atoms
 */

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { PAGER_MAP } from '../constants/pager';

export const PAGER_ATOM_KEY = 'pagerConfigState';

interface PagerConfigState {
  direction?: 'row' | 'column';
  pagerType?: string;
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: number;
  lineHeight?: number;
};

export const pagerConfigState = atom<PagerConfigState>({
  key: PAGER_ATOM_KEY,
  default: {
    direction: 'column',
    pagerType: 'A4',
    width: PAGER_MAP['A4'].width,
    height: PAGER_MAP['A4'].height,
    padding: '',
  },
});

export function useGetPagerConfigState() {
  return useRecoilValue(pagerConfigState);
}

export function useSetPagerConfigState() {
  const setPagerConfigState = useSetRecoilState(pagerConfigState);

  function setPagerConfit(currValue: PagerConfigState) {
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
