/**
 * chinese config warp
 */
import MenuItem from '../../../../components/menuItem';
import Select from '../../../../components/adapter/select';
import { Row, Col, Radio } from 'antd';
import { LATTICE_TYPE_LIST } from './constants';
import { useGetChineseConfigState } from '../../atoms/chineseConfigState';

export default function ChineseConfig() {

  const { config } = useGetChineseConfigState();

  const onValueChange = (value: any, key: string) => {
    console.log(value, key);
    // setPagerConfit({ [key]: value });
  };

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
    </div>
  );
}