/**
 * content list state
 */

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export interface ModulesData {
  id?: string;
  type?: string;
  dataType: string;
  list?: Array<any>;
  map?: object;
  config?: object;
};

export interface ContentDataState {
  currentModuleId: string;
  currentModuleType: string;
  moduleList: Array<ModulesData>;
};

export const contentDataState = atom({
  key: 'contentDataState',
  default: {
    currentModuleId: '',
    currentModuleType: '',
    moduleList: [],
  },
});

export function useGetContentDataState() {
  return useRecoilValue(contentDataState);
};

export function useSetContentDataState() {
  const setContentDataState = useSetRecoilState(contentDataState);

  function setCurrentModule(id: string, type: string) {
    setContentDataState((oldValue) => {
      return {
        ...oldValue,
        currentModuleId: id,
        currentModuleType: type,
      }
    });
  }
  
  function setCurrentModuleId(id: string) {
    setContentDataState((oldValue) => {
      return {
        ...oldValue,
        currentModuleId: id,
      }
    });
  }

  function setCurrentModuleType(type: string) {
    setContentDataState((oldValue) => {
      return {
        ...oldValue,
        currentModuleType: type,
      }
    });
  }

  function setModuleList(currentValue: any) {
    setContentDataState((oldValue) => {
      return {
        ...oldValue,
        moduleList: currentValue,
      }
    });
  }

  return {
    setCurrentModule,
    setCurrentModuleId,
    setCurrentModuleType,
    setModuleList,
  };
};