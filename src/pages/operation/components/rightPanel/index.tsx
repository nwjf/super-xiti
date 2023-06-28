/**
 * right panel
 */
import './index.less';
import { useState, useCallback } from 'react';
import { useGetOperationConfigState, useSetOperationConfigState } from '../../atoms/operationConfigState';
import { Button, Space } from 'antd';
import _default from 'antd/es/button/style';
import { DeleteOutlined } from '@ant-design/icons';




export default function RightPanel() {

  const { data } = useGetOperationConfigState();
  const { setOperationData } = useSetOperationConfigState();

  const [show, setShow] = useState<boolean>(false);

  const onShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  const onDeleteData = useCallback((index: number) => {
    const _d = data.filter((item, i) => i !== index)
    setOperationData(_d);
  }, [data])

  const onRepeat = useCallback(() => {
    const _d: Array<any> = [];

    for (let i = 0; i < data.length; i++) {
      let isPush = true;
      
      for (let j = 0; j < _d.length; j++) {
        if (_d[j].opertionType !== data[i].opertionType) {
          continue;
        }
        if (_d[j].a === data[i].a && _d[j].b === data[i].b) {
          isPush = false;
          break;
        }
        if (_d[j].a === data[i].b && _d[j].b === data[i].a) {
          isPush = false;
          break;
        }
      }


      if (isPush) {
        _d.push(data[i]);
      }
      else {
        isPush = true;
        continue;
      }
    }
    
    setOperationData(_d);

  }, [data]);

  return (
    <div className={['right-panel-warp', show ? 'show' : ''].join(' ')}>
      <div className="right-panel-scroll">
        {/* <Button onClick={onRepeat}>去重</Button> */}
        {
          data.map((item, index) => {
            return (
              <div className="operation-data-list-item">
                <div className="operation-data-list-item-index">{index + 1}</div>
                <div className="operation-data-list-item-close" onClick={() => onDeleteData(index)}>
                  <DeleteOutlined rev="example" style={{ fontSize: '16px', color: '#ef4034' }}/>
                </div>
                {item.str}
              </div>
            );
          })
        }
      </div>
      <div className="right-panel-expand" onClick={onShow}>
        {show ? '收起' : '展开'}
      </div>
    </div>
  );
};