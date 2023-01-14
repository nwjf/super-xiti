/**
 * operation config
 * 运算题模块-配置模块
 */

import './index.less';
import { useCallback } from 'react';
import { Select, Row, Col } from 'antd';
import { columnList } from './constants';
import { useGetContentDataState, useSetContentDataState } from '../../../atoms/contentData';
import MenuItem from '../../common/menuItem';

const MODE_LIST = [
  { label: '背题模式', value: '' },
  { label: '答题模式', value: '' },
];

export default function OperationConfig() {
  const { setModuleConfig } = useSetContentDataState();
  const { currentModuleData, currentModuleId } = useGetContentDataState();
  const config: any = currentModuleData?.config || {};

  const valueChange = useCallback((value: any, key: string) => {
    console.log(key, value);
    setModuleConfig(currentModuleId || '', {
      ...config,
      [key]: value,
    });
  }, [config]);

  return (
    <div className="config-operation-warp">
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="字号">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={columnList}
              onChange={(d) => valueChange(d, 'column')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="行高">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={columnList}
              onChange={(d) => valueChange(d, 'column')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="模式">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={MODE_LIST}
              onChange={(d) => valueChange(d, 'column')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="字号">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={columnList}
              onChange={(d) => valueChange(d, 'column')} />
          </MenuItem>
        </Col>
      </Row>
    </div>
  );
};