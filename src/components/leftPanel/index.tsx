/**
 * left panel main
 */

import './index.less';
import { Divider } from 'antd';
import { ReactDOM } from 'react';

interface Modules {
  name: string;
  element: ReactDOM;
};
interface Props {
  modules: Array<Modules>;
};

export default function LeftPanel({ modules = [] }: Props) {
  return (
    <div className="left-panel">
      {
        modules.map((item: Modules) => {
          return (
            <>
              <Divider dashed orientation="center">{item.name}</Divider>
              { item.element }
            </>
          );
        })
      }
    </div>
  );
};