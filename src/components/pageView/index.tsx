/**
 * page view
 */
import { ReactElement, CSSProperties, useMemo, useState } from 'react';
import './index.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../atoms/pagerConfigState';
import { Slider } from 'antd';

interface Props {
  children?: ReactElement | ReactElement[];
  style?: CSSProperties;
};

const marks = {
  20: '20%',
  100: '100%',
  200: '200%',
};

export default function PageView({ children, style }: Props) {
  const pageConfig= useGetPagerConfigState();
  const { setPagerConfit } = useSetPagerConfigState();
  const [scale, setScale] = useState<number>((pageConfig.scale || 1) * 100);

  const onSliderChange = (data: any) => {
    console.log(data);
    setPagerConfit({ scale: data / 100 })
  }

  return (
    <div
      className="page-view-warp"
      style={{ ...style }}>
      {children}
      <div className="page-view-slider">
        <Slider
          style={{ width: '100%' }}
          marks={marks}
          step={0.01}
          max={200}
          min={20}
          defaultValue={scale}
          onChange={onSliderChange} />
      </div>
    </div>
  );
}