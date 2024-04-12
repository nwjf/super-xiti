/**
 * page config component
 */
import './index.less';
import React, { useEffect, useState } from 'react';
import Select from '../adapter/select';
import { Row, Col, Radio, Input } from 'antd';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../atoms/pagerConfigState';
import {
  PAGER_MAP,
  LINE_HEIGHT_LIST,
  PADDING_LIST,
  FONT_SIZR_LIST,
  DIRECTION_LIST,
  PAGER_LIST,
} from '../../constants/pager';
import MenuItem from '../menuItem';
import { useWindowSize } from 'react-use';


interface Props {
  style?: React.CSSProperties;
};

export default function PageConfig(props: Props) {
  const configData = useGetPagerConfigState();
  const { setPagerConfit } = useSetPagerConfigState();

  const { width: windowWidth } = useWindowSize();

  const [dpi, setDpi] = useState<number>(96);

  // dpi计算逻辑
  useEffect(() => {
    const div = document.createElement('div');
    div.style.width = '1in';
    document.body.appendChild(div);
    const w = div.offsetWidth || 60;
    document.body.removeChild(div);
    setDpi(w || 96);
    setPagerConfit({ dpi: w || 96 });
  }, []);

  useEffect(() => {
    if (!windowWidth) return;
    console.log('windowWidth', windowWidth, configData);
    const w = configData.width * dpi / 25.4;
    let scale = 1;
    scale = windowWidth / ( w + 40);
    scale = scale > 1 ? 1 : scale;
    setPagerConfit({ scale });
  }, [windowWidth, dpi]);

  const onValueChange = (value: any, key: string) => {
    console.log(value, key);
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
        <Col span={24}>
          <MenuItem name="标题">
            <Input value={configData.title} onChange={e => onValueChange(e.target.value, 'title')} />
          </MenuItem>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="纸张类型">
            <Select
              disabled
              style={{width: '100%'}}
              options={PAGER_LIST}
              value={configData.pagerType}
              onChange={(d) => onPagerChange(d)} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="纸张方向">
            <Select
              disabled
              style={{width: '100%'}}
              options={DIRECTION_LIST}
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
          <MenuItem name="个人信息栏目">
            <Radio.Group
              onChange={(d) => onValueChange(d.target.value, 'showPersonalDetail')}
              defaultValue={configData.showPersonalDetail}>
              <Radio.Button value={false}>不显示</Radio.Button>
              <Radio.Button value={true}>显示</Radio.Button>
            </Radio.Group>
          </MenuItem>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="页面边框">
            <Radio.Group
              onChange={(d) => onValueChange(d.target.value, 'border')}
              defaultValue={configData.border}>
              <Radio.Button value="none">不显示</Radio.Button>
              <Radio.Button value="dashed">虚线</Radio.Button>
              <Radio.Button value="solid">实线</Radio.Button>
              <Radio.Button value="double">双实线</Radio.Button>
            </Radio.Group>
          </MenuItem>
        </Col>
      </Row>

      
    </div>
  );
};