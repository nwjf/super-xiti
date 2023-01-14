/**
 * config panel main
 */

import './index.less';
import { Divider } from 'antd';
import PageConfig from './pageConfig';
import OperationConfig from './operation';

export default function ConfigPanel() {
  return (
    <div className="config-panel">
      <Divider dashed orientation="center">全局配置</Divider>
      <PageConfig />
      <Divider dashed orientation="center">模块配置</Divider>
      <OperationConfig />
    </div>
  );
};