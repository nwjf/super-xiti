/**
 * home page
 */

import './index.less';
import PageView from './components/pageView';
import PageConfig from './components/pageConfig';
import OperationView from './components/modules/operation/view';

export default function Home() {
  return (
    <div className="home-warp">
      <PageConfig style={{ marginBottom: '10px' }} />
      <PageView>
        <OperationView />
      </PageView>
    </div>
  );
};