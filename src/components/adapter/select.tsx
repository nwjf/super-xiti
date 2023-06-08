/**
 * select
 * 文档参考 ant design pc
 */
import React, { useCallback, useState, useMemo } from 'react';
import { Select as SelectPc, Button } from 'antd';
import { Picker } from 'antd-mobile';
import { useWindowSize } from 'react-use';

interface Props {
  style?: React.CSSProperties;
  options: Array<any>;
  value?: any;
  onChange?: (data: any) => void;
};
export default function Select(props: Props) {
  const { width } = useWindowSize();

  const onChange = useCallback((data: any) => {
    if (props.onChange) props.onChange(data);
  }, [props.onChange]);

  const [visible, setVisible] = useState(false);


  const currText = useMemo(() => {
    const temp = props.options.find(item => item.value === props.value);
    if (temp?.label || temp?.label === 0) return temp?.label;
    else return '请选择';
  }, [props.value, props.options]);

  if (width > 500) {
    return <SelectPc
      style={props.style}
      value={props.value}
      options={props.options}
      onChange={(d) => onChange(d)}/>
  }
  else {
    return <>
      <Button style={props.style} onClick={() => setVisible(true)}>{currText}</Button>
      <Picker
        visible={visible}
        columns={[props.options]}
        onConfirm={(d) => onChange(d[0])}
        onClose={() => setVisible(false)}/>
    </>
  }
};