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
} from '../../../atoms/pagerConfig';
import {
  PAGER_MAP,
  LINE_HEIGHT_LIST,
  PADDING_LIST,
  FONT_SIZR_LIST,
} from '../../../constants/pager';
import { useSetContentDataState } from '../../../atoms/contentData';
import MenuItem from '../../common/menuItem';

interface Props {
  style?: React.CSSProperties;
};

export default function PageConfig(props: Props) {
  const configData = useGetPagerConfigState();
  const { setPagerConfit } = useSetPagerConfigState();

  const { setCurrentModule, setModuleList, setCurrentModuleData } = useSetContentDataState();
  const test = () => {
    const list = [];
    const type = 'operation';
    const dataType = 'list';
    const id = 'id' + Math.random().toString(36).substring(2, 8);
    for (let i = 10; i < 1000; i++) {
      list.push([i, '+', i, '=', i + i]);
    }
    const modulelist = [
      {
        id,
        type,
        dataType,
        list,
      }
    ];
    setCurrentModule(id, type);
    setCurrentModuleData(modulelist[0]);

    setModuleList(modulelist);
  };


  const pagerList = Object.values(PAGER_MAP).map(item => ({ label: item.name + '纸', value: item.name}));
  const directionList = [
    { label: '纵向', value: 'column' },
    { label: '横向', value: 'row' },
  ];
  const valueChange = (value: any, key: string) => {
    setPagerConfit({ [key]: value });
  };
  const pagerChange = (value: any) => {
    const pagerData = PAGER_MAP[value];
    setPagerConfit({
      pagerType: value,
      width: pagerData.width,
      height: pagerData.height,
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
              onChange={(d) => pagerChange(d)} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="纸张方向">
            <Select
              style={{width: '100%'}}
              options={directionList}
              value={configData.direction}
              onChange={(d) => valueChange(d, 'direction')} />
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
              onChange={(d) => valueChange(d, 'fontSize')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="行距">
            <Select
              style={{width: '100%'}}
              options={LINE_HEIGHT_LIST}
              value={configData.lineHeight}
              onChange={(d) => valueChange(d, 'lineHeight')} />
          </MenuItem>
        </Col>
      </Row>

      <Button className="test" onClick={test}>test create</Button>
    </div>
  );
};