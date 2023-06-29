/**
 * left panel main
 */

import './index.less';
import { Divider } from 'antd';
import { ReactElement, Fragment, useState, useCallback } from 'react';

export interface ModulesItem {
  name: string;
  element: ReactElement;
};
export type Modules = Array<ModulesItem>;

export default function LeftPanel({ modules = [] }: { modules: Modules }) {

  const [show, setShow] = useState<boolean>(false);

  const onShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <div className={['left-panel', show ? 'show' : ''].join(' ')}>
      <div className="left-panel-scroll">
        {
          modules.map((item: ModulesItem) => {
            return (
              <Fragment key={item.name}>
                <Divider dashed orientation="center">{item.name}</Divider>
                { item.element }
              </Fragment>
            );
          })
        }
      </div>
      <div className="left-panel-expand" onClick={onShow}>
        {show ? '收起' : '展开'}
      </div>
    </div>
  );
};