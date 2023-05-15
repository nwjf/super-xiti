/**
 * left panel main
 */

import './index.less';
import { Divider } from 'antd';
import { ReactElement, Fragment } from 'react';

export interface ModulesItem {
  name: string;
  element: ReactElement;
};
export type Modules = Array<ModulesItem>;

export default function LeftPanel({ modules = [] }: { modules: Modules }) {
  return (
    <div className="left-panel">
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
  );
};