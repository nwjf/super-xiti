/**
 * home page
 */

import './index.less';
import PageView from './components/pageView';
import PageConfig from './components/pageConfig';
import OperationView from './components/modules/operation/view';
import { useGetContentDataState } from '../../atoms/contentData';
import ConfigPanel from './components/configPanel';
import ContentPanel from './components/contentPanel';

export default function Home() {
  const { moduleList } = useGetContentDataState();
  console.log('modulelist', moduleList);
  return (
    <div className="home-warp">
      <ConfigPanel />
      <div className="home-content">
        <ContentPanel />
      </div>
      <PageConfig style={{ marginBottom: '10px' }} />
      <PageView>
        {/* <OperationView /> */}
        {
          moduleList.map((item: any) => <OperationView moduleData={item} key={item.id}/>)
        }
      </PageView>
    </div>
  );
};