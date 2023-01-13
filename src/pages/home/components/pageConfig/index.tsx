/**
 * page config component
 */
import './index.less';
import React from 'react';
import { Tooltip, Select } from 'antd';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../../../atoms/pager';
import { PAGER_MAP } from '../../../../constants/pager';

interface Props {
  style?: React.CSSProperties;
};

export default function PageConfig(props: Props) {
  const { direction, pagerType } = useGetPagerConfigState();
  const { setPagerConfit } = useSetPagerConfigState();


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
      <Tooltip placement="top" title="纸张大小">
        <Select
          options={pagerList}
          value={pagerType}
          onChange={(d) => pagerChange(d)} />
      </Tooltip>

      <Tooltip placement="top" title="纸张方向">
        <Select
          options={directionList}
          value={direction}
          onChange={(d) => valueChange(d, 'direction')} />
      </Tooltip>
    </div>
  );
};