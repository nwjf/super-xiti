/**
 * home page
 */

import './index.less';
import ConfigPanel from './components/configPanel';
import ContentPanel from './components/contentPanel';

export default function Home() {
  return (
    <div className="home-warp">
      <ConfigPanel />
      <div className="home-content">
        <ContentPanel />
      </div>
    </div>
  );
};