/**
 * 生成数据配置
 */

import { Select, Row, Col, Input, Button } from 'antd';
import MenuItem from '../../../../components/menuItem';
import { useState, useCallback } from 'react';

import { CreateDataConfig } from './index.d';
import { OPERATION_TYPE_LIST } from '../../constants';

import { useGetOperationConfigState, useSetOperationConfigState } from '../../atoms/operationConfigState';

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default function CreateConfig() {
  const operationConfigState = useGetOperationConfigState();
  const { setOperationData } = useSetOperationConfigState();

  const [createDataConfig, setCreateDataConfig] = useState({
    aMin: 0,
    aMax: 100,
    bMin: 0,
    bMax: 100,
    opertionType: '+',
    createTotal: 10,
  });

  const optionsList = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
    { label: 50, value: 50 },
    { label: 60, value: 60 },
    { label: 70, value: 70 },
    { label: 80, value: 80 },
    { label: 90, value: 90 },
    { label: 100, value: 100 },
    { label: 150, value: 150 },
    { label: 200, value: 200 },
  ];

  const onValueChange = useCallback((data: any, key: string) => {
    setCreateDataConfig((d) => {
      return {
        ...d,
        [key]: data,
      }
    })
  }, [setCreateDataConfig]);

  const onCreate = useCallback(() => {
    const {
      aMin,
      aMax,
      bMin,
      bMax,
      opertionType,
      createTotal,
    } = createDataConfig;
    let list = [];
    for (let i = 0; i < createTotal; i++) {
      const a = random(aMin, aMax);
      const b = random(bMin, bMax);
      let c = 0;
      if (opertionType === '+') { c = a + b; }
      if (opertionType === '-') { c = a - b; }
      if (opertionType === '*') { c = a * b; }
      if (opertionType === '/') { c = a / b; }
      const temp = {
        a,
        b,
        c,
        str: `${a} ${opertionType} ${b} = ${c}`,
        opertionType: opertionType,
      };
      list.push(temp);
    }
    list = list.sort((a, b) => a.a - b.a)
    setOperationData([...operationConfigState.data, ...list]);
  }, [createDataConfig, operationConfigState.data]);

  const onCleanData = () => {
    setOperationData([]);
  };

  return (
    <div className="create-config-operation-warp">
      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="数据A MIN">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.aMin}
              options={optionsList}
              onChange={(d) => onValueChange(d, 'aMin')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="数据A MAX">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.aMax}
              options={optionsList}
              onChange={(d) => onValueChange(d, 'aMax')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="数据B MIN">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.bMin}
              options={optionsList}
              onChange={(d) => onValueChange(d, 'bMin')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="数据B MAX">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.bMax}
              options={optionsList}
              onChange={(d) => onValueChange(d, 'bMax')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="运算类型">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.opertionType}
              options={OPERATION_TYPE_LIST}
              onChange={(d) => onValueChange(d, 'opertionType')} />
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="生成数量">
            <Select
              style={{width: '100%'}}
              value={createDataConfig.createTotal}
              options={optionsList}
              onChange={(d) => onValueChange(d, 'createTotal')} />
          </MenuItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <MenuItem name="操作">
            <Button
              style={{width: '100%'}}
              className="test"
              onClick={onCleanData}
              type="dashed"
              danger>清除所有数据</Button>
          </MenuItem>
        </Col>
        <Col span={12}>
          <MenuItem name="运算">
            <Button
              style={{width: '100%'}}
              className="test"
              onClick={onCreate}
              type="primary">创建运算题</Button>
          </MenuItem>
        </Col>
      </Row>
    </div>
  );
}