/**
 * chinese config warp
 */
import { useEffect, useState } from 'react';
import MenuItem from '../../../../components/menuItem';
import Select from '../../../../components/adapter/select';
import { Row, Col, Radio, Input } from 'antd';
import {
  LATTICE_TYPE_LIST,
  LATTICE_SIZE_LIST,
  PAINT_LIST,
} from '../../constants';
import { useGetChineseConfigState, useSetChineseConfigState } from '../../atoms/chineseConfigState';

export default function ChineseConfig() {

  const { config, data } = useGetChineseConfigState();
  const { setChineseConfig, setChineseData } = useSetChineseConfigState();

  const onValueChange = (value: any, key: string) => {
    setChineseConfig({ [key]: value });
  };

  const [text, setText] = useState<string>('');
  const onTextChange = (e: any) => {
    const text = e.target.value || '';
    setText(text);
    const data = text.split('').map((item: string) => ({ text: item }));
    setChineseData(data);
  };
  useEffect(() => {
    const text = data.map(item => item.text);
    setText(text.join(''));
  }, []);

  return (
    <div className="chinese-config-warp">
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="格子">
            <Select
              style={{width: '100%'}}
              options={LATTICE_TYPE_LIST}
              value={config.latticeType}
              onChange={(d) => onValueChange(d, 'latticeType')} />
          </MenuItem>
        </Col>
        <Col span={0}>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="格子">
            <Select
              style={{width: '100%'}}
              options={LATTICE_SIZE_LIST}
              value={config.latticeSize}
              onChange={(d) => onValueChange(d, 'latticeSize')} />
          </MenuItem>
        </Col>
        <Col span={0}>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="描红">
            <Select
              style={{width: '100%'}}
              options={PAINT_LIST}
              value={config.paint}
              onChange={(d) => onValueChange(d, 'paint')} />
          </MenuItem>
        </Col>
        <Col span={0}>
        </Col>
      </Row>

      <MenuItem name="内容">
        <Input.TextArea
          rows={4}
          value={text}
          onInput={onTextChange} />
      </MenuItem>
    </div>
  );
}