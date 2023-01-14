/**
 * config panel main
 */

import './index.less';
import PageConfig from './pageConfig';
import OperationConfig from './operation';

export default function ConfigPanel() {
  return (
    <div className="config-panel">
      <PageConfig />
      <OperationConfig />
    </div>
  );
};