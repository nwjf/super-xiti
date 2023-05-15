/**
 * page config component
 */
import './index.less';
import React from 'react';
import {
  Tooltip,
  Select,
  Button,
  Row,
  Col,
} from 'antd';
import {
  useGetPagerConfigState,
  useSetPagerConfigState,
} from '../../atoms/pagerConfigState';
import {
  PAGER_MAP,
  LINE_HEIGHT_LIST,
  PADDING_LIST,
  FONT_SIZR_LIST,
} from '../../constants/pager';
import MenuItem from '../menuItem';

interface Props {
  style?: React.CSSProperties;
};

export default function PageConfig(props: Props) {
  const configData = useGetPagerConfigState();
  const { setPagerConfit } = useSetPagerConfigState();

  const pagerList = Object.values(PAGER_MAP).map(item => ({ label: item.name + '纸', value: item.name}));
  const directionList = [
    { label: '纵向', value: 'column' },
    { label: '横向', value: 'row' },
  ];
  const onValueChange = (value: any, key: string) => {
    setPagerConfit({ [key]: value });
  };

  const onPagerChange = (value: any) => {
    const pagerData = PAGER_MAP[value];
    setPagerConfit({
      pagerType: value,
      width: pagerData.width,
      height: pagerData.height,
      unit: pagerData.unit,
    });
  };

  return (
    <div
      className="page-config-warp"
      style={props.style}
    >
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="纸张类型">
            <Select
              style={{width: '100%'}}
              options={pagerList}
              value={configData.pagerType}
              onChange={(d) => onPagerChange(d)} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="纸张方向">
            <Select
              style={{width: '100%'}}
              options={directionList}
              value={configData.direction}
              onChange={(d) => onValueChange(d, 'direction')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="字号">
            <Select
              style={{width: '100%'}}
              options={FONT_SIZR_LIST}
              value={configData.fontSize}
              onChange={(d) => onValueChange(d, 'fontSize')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="行距">
            <Select
              style={{width: '100%'}}
              options={LINE_HEIGHT_LIST}
              value={configData.lineHeight}
              onChange={(d) => onValueChange(d, 'lineHeight')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="页边距">
            <Select
              style={{width: '100%'}}
              options={PADDING_LIST}
              value={configData.padding}
              onChange={(d) => onValueChange(d, 'padding')} />
          </MenuItem>
        </Col>
        <Col span={12}>
        </Col>
      </Row>

      
    </div>
  );
};