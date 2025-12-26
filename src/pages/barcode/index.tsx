

import './index.less';
import Navbar from '../../components/navbar';
import LeftPanel, { Modules } from '../../components/leftPanel';
import PageConfig from '../../components/pageConfig';
import Download from '../../components/download';
import BarcodeConfig from './components/barcodeConfig';
import PageView from '../../components/pageView/index';
import ContentView from './components/contentView';

export default function Barcode() {
  const modules: Modules = [
    { name: '页面配置', element: <PageConfig /> },
    { name: '条形码配置', element: <BarcodeConfig /> },
    { name: '导出', element: <Download /> },
  ];
  return (
    <div className="barcode-warp">
      <Navbar />
      <LeftPanel modules={modules} />
      <div className="barcode-content">
        <PageView>
          <ContentView />
        </PageView>
      </div>
    </div>
  );
}