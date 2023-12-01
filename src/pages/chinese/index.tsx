/**
 * 中文
 * chinese page warp
 */
import './index.less';
import Navbar from '../../components/navbar';
import LeftPanel, { Modules } from '../../components/leftPanel';
import PageConfig from '../../components/pageConfig';
import Download from '../../components/download';
import Feedback from '../../components/feedback';
import PageView from '../../components/pageView/index';
import ChineseConfig from './components/chineseConfig/index';
import ContentView from './components/contentView';

export default function Chinese() {
  const modules: Modules = [
    { name: '页面配置', element: <PageConfig /> },
    { name: '模块配置', element: <ChineseConfig /> },
    { name: '导出', element: <Download /> },
  ];

  return (
    <div className="chinese-warp">
      <Navbar />
      <LeftPanel modules={modules} />
      <div className="operation-content">
        <PageView style={{margin: 'auto'}}>
          <ContentView />
        </PageView>
      </div>
      {/* <RightPanel /> */}
      <Feedback />
    </div>
  );
};
