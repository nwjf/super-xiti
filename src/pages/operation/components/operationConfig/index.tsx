/**
 * operation config
 * 运算题模块-配置模块
 */

import './index.less';
import { useCallback } from 'react';
import { Select, Row, Col, Input, Button } from 'antd';
import { useGetPagerConfigState } from '../../../../atoms/pagerConfigState';
import { useGetOperationConfigState, useSetOperationConfigState } from '../../atoms/operationConfigState';
import MenuItem from '../../../../components/menuItem';
import {
  FONT_SIZR_LIST,
  LINE_HEIGHT_LIST,
  MODE_LIST,
} from '../../../../constants/pager';
import { COLUMN_LIST, OPERATION_TYPE_LIST } from './constants';


export default function OperationConfig() {
  const pagerConfig = useGetPagerConfigState();
  const operationConfig = useGetOperationConfigState();
  const { config, data } = operationConfig;
  const { setOperationConfig } = useSetOperationConfigState();

  const onValueChange = useCallback((value: any, key: string) => {
    setOperationConfig({ [key]: value });
  }, [config]);


  return (
    <div className="config-operation-warp">
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="列数">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={COLUMN_LIST}
              onChange={(d) => onValueChange(d, 'column')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="模式">
            <Select
              style={{width: '100%'}}
              defaultValue="read"
              value={config.mode}
              options={MODE_LIST}
              onChange={(d) => onValueChange(d, 'mode')} />
          </MenuItem>
        </Col>
      </Row>

    </div>
  );
};