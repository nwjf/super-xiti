
import { useMemo } from 'react';
import { useGetBarcodeConfigState, useSetBarcodeConfigState } from '../../atoms/barcodeConfigState';

import BarcodeItem from './barcodeItem';
import './index.less';
import Page from '../../../../components/pageView/page';

export default function ContentView() {
  const { config, data } = useGetBarcodeConfigState();
  const list = useMemo(() => {
    console.log('=====')
    const temp = [];
    let index = 0;
    const len = Number(config.rowNum) || 0
    if (index >= index + len) {
      return data;
    }
    for (;;) {
      const startIndex = index;
      const endIndex = index + len > data.length ? data.length : index + len;
      console.log('startIndex=', startIndex)
      console.log('endIndex=', endIndex)
      temp.push(data.slice(startIndex, endIndex));
      index = endIndex;
      if (index >= data.length) {
        break;
      }
    }
    console.log('temp', temp)
    return temp;
  }, [config, data])
  return (
    <Page currentPage={1}>
      <div className="content-view">
        {
          list.map((item, index) => {
            return (
              <div className="row">
                {
                  item.map((ele: any) => <BarcodeItem style={{width: 100 / Number(config.rowNum) + '%'}} {...config} text={ele.text} />)
                }
              </div>
            )
          })
        }
      </div>
    </Page>
  );
};