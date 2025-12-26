import React, { useMemo } from 'react';
import { BarcodeConfig } from '../../atoms/barcodeConfigState.d';
import { ReactBarcode } from 'react-jsbarcode';
import './index.less';

interface Props extends BarcodeConfig {
  style: React.CSSProperties;
  text: any;
}
export default function BarcodeItem(props: Props) {
  const options = useMemo(() => {
    return {
      height: 100,
      fontSize: props.fontSize,
      textMargin: props.lineHeight
    };
  }, [props]);
  if (!props.text) {
    return null;
  }
  return (
    <div className="barcodeItem-box" style={props.style}>
      <ReactBarcode value={props.text} options={options} />
    </div>
  );
};