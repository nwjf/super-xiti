/**
 * operation config
 * 运算题模块-配置模块
 */

import './index.less';
import { useCallback } from 'react';
import { Select, Row, Col } from 'antd';
import { columnList } from './constants';
import { useGetContentDataState, useSetContentDataState } from '../../../atoms/contentData';
import { useGetPagerConfigState } from '../../../atoms/pagerConfig';
import MenuItem from '../../common/menuItem';
import PageConfig from '../pageConfig';
import {
  FONT_SIZR_LIST,
  LINE_HEIGHT_LIST,
  MODE_LIST,
} from '../../../constants/pager';


export default function OperationConfig() {
  const { setModuleConfig } = useSetContentDataState();
  const { currentModuleData, currentModuleId } = useGetContentDataState();
  const config: any = currentModuleData?.config || {};
  const pagerConfig = useGetPagerConfigState();

  const valueChange = useCallback((value: any, key: string) => {
    setModuleConfig(currentModuleId || '', {
      ...config,
      [key]: value,
    });
  }, [config]);

  return (
    <div className="config-operation-warp">
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="行数">
            <Select
              style={{width: '100%'}}
              value={config.row}
              options={columnList}
              onChange={(d) => valueChange(d, 'row')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="列数">
            <Select
              style={{width: '100%'}}
              value={config.column}
              options={columnList}
              onChange={(d) => valueChange(d, 'column')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="模式">
            <Select
              style={{width: '100%'}}
              defaultValue="read"
              value={config.mode}
              options={MODE_LIST}
              onChange={(d) => valueChange(d, 'mode')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="字号">
            <Select
              style={{width: '100%'}}
              defaultValue={pagerConfig.fontSize}
              value={config.fontSize}
              options={FONT_SIZR_LIST}
              onChange={(d) => valueChange(d, 'fontSize')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="行高">
            <Select
              style={{width: '100%'}}
              value={config.lineHeight || pagerConfig.lineHeight}
              options={LINE_HEIGHT_LIST}
              onChange={(d) => valueChange(d, 'lineHeight')} />
          </MenuItem>
        </Col>
      </Row>
    </div>
  );
};