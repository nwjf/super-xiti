/**
 * 
 */

import './index.less';
import { useGetOperationConfigState } from '../../atoms/operationConfigState';
import { Fragment, useMemo } from 'react';

export default function ContentPage() {
  const { config, data } = useGetOperationConfigState();

  const itemWidth = useMemo(() => {
    const column = config.column || 1;
    return 100 / column + '%';
  }, [config.column]);

  const getOpertionTypeTxt = (opertionType: string) => {
    if (opertionType === '*') return 'x';
    if (opertionType === '/') return '÷';
    else return opertionType;
  };

  return <div className="operation-content-list">
    {
      data.map((item, index) => {
        return (
          <Fragment>
            <div className="operation-content-item" style={{width: itemWidth}} >
              <div className="item-left">
                {item.a}
                <div className="item-symbol">{getOpertionTypeTxt(item.opertionType)}</div>
                {item.b}
              </div>
              <div className="item-symbol">=</div>
              <div className="item-value">
                {config.mode === 'read' ? item.c : ''}
              </div>
            </div>
            {
              (index + 1) % (config.column || 1) !== 0
                ? <div className="operation-column-spacing"></div>
                : null
            }
            
          </Fragment>
        );
      })
    }
  </div>
}
