/**
 * chinese config warp
 */
import { useEffect, useState } from 'react';
import MenuItem from '../../../../components/menuItem';
import Select from '../../../../components/adapter/select';
import { Row, Col, Radio, Input } from 'antd';
import {
  FONT_SIZE_LIST,
} from '../../constants';
import { useGetBarcodeConfigState, useSetBarcodeConfigState } from '../../atoms/barcodeConfigState';

export default function ChineseConfig() {

  const { config, data } = useGetBarcodeConfigState();
  const { setBarcodeConfig, setBarcodeData } = useSetBarcodeConfigState();

  const onValueChange = (value: any, key: string) => {
    setBarcodeConfig({ [key]: value });
  };

  const [text, setText] = useState<string>('');
  const onTextChange = (e: any) => {
    const text = e.target.value || '';
    setText(text);
    const data = text.split('\n').map((item: string) => ({ text: item }));
    setBarcodeData(data);
  };
  useEffect(() => {
    const text = data.map(item => item.text);
    setText(text.join('\n'));
  }, []);

  return (
    <div className="chinese-config-warp">
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="字体大小">
            <Select
              style={{width: '100%'}}
              options={FONT_SIZE_LIST}
              value={config.fontSize}
              onChange={(d) => onValueChange(d, 'fontSize')} />
          </MenuItem>
        </Col>
        <Col span={0}>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="行距">
            <Select
              style={{width: '100%'}}
              options={FONT_SIZE_LIST}
              value={config.lineHeight}
              onChange={(d) => onValueChange(d, 'lineHeight')} />
          </MenuItem>
        </Col>
        <Col span={0}>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <MenuItem name="一行数量">
            <Input
              value={config.rowNum}
              onInput={(e: any) => onValueChange(e.target.value, 'rowNum')} />
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