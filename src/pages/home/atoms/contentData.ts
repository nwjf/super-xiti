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
  config?: Config;
};

export interface ContentDataState {
  currentModuleId: string | null;
  currentModuleType: string | null;
  currentModuleData: ModulesData | null;
  moduleList: Array<ModulesData>;
};

export interface Config {
  fontSize?: number | null,
  lineHeight?: number | null,
  border?: number | null,
  borderColor?: string | null,
  [key: string]: any;
}

export const contentDataState = atom<ContentDataState>({
  key: 'contentDataState',
  default: {
    currentModuleId: '',
    currentModuleType: '',
    currentModuleData: null,
    moduleList: [],
  },
});

export function useGetContentDataState() {
  return useRecoilValue(contentDataState);
};

/**
 * 
 * @returns {
 *  setCurrentModule,
 *  setCurrentModuleId,
 *  setCurrentModuleType,
 *  setModuleList,
 *  setModuleConfig,
 * }
 */
export function useSetContentDataState() {
  const setContentDataState = useSetRecoilState(contentDataState);

  function setCurrentModuleData(currentValue: ModulesData | null) {
    setContentDataState((oldValue: ContentDataState) => {
      return {
        ...oldValue,
        currentModuleData: currentValue,
        currentModuleId: currentValue?.id || null,
        currentModuleType: currentValue?.type || null,
      };
    });
  }

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

  function setModuleConfig(moduleId: string, config: any) {
    setContentDataState((oldValue) => {
      let moduleList: Array<ModulesData> = [...oldValue.moduleList];
      const index: number = moduleList.findIndex((item: ModulesData) => item.id === moduleId);
      if (index >= 0) {
        moduleList[index] = {
          ...moduleList[index],
          config,
        };
      }
      return {
        ...oldValue,
        moduleList,
      };
    });
  }

  return {
    setCurrentModuleData,
    setCurrentModule,
    setCurrentModuleId,
    setCurrentModuleType,
    setModuleList,
    setModuleConfig,
  };
};