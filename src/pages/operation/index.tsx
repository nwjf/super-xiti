/**
 * operation page
 * 运算题生成
 */

import './index.less';
import LeftPanel, { Modules } from '../../components/leftPanel';
import PageConfig from '../../components/pageConfig';
import OperationConfig from './components/operationConfig';
import CreateConfig from './components/createConfig';
import PageView from '../../components/pageView';
import ContentView from './components/contentView/index';
import Download from '../../components/download';
import RightPanel from './components/rightPanel';

export default function Operation() {
  const modules: Modules = [
    { name: '页面配置', element: <PageConfig /> },
    { name: '模块配置', element: <OperationConfig /> },
    { name: '创建规则 (A ± B = C)', element: <CreateConfig /> },
    { name: '导出', element: <Download /> },
  ];

  return (
    <div className="operation-warp">
      <LeftPanel modules={modules} />
      <div className="operation-content">
        <ContentView />
      </div>
      <RightPanel />
    </div>
  );
};