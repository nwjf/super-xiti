/**
 * content panel main
 */

import './index.less';
import { useMemo } from 'react';
import Operation from './operation';
import PageView from './pageView';
import { useGetContentDataState } from '../../atoms/contentData';

export default function ContentPanel() {
  const { moduleList } = useGetContentDataState();

  const moduleListDom = useMemo(() => {
    return moduleList.map((item, index) => {
      return (
        <Operation moduleData={item} key={index}/>
      );
    });
  }, [moduleList]);


  return (
    <div className="content-panel">
      <PageView>
        { moduleListDom }
      </PageView>
    </div>
  );
};