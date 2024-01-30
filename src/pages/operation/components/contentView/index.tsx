/**
 * content view
 */

import './index.less';
import { useGetOperationConfigState } from '../../atoms/operationConfigState';
import { useGetPagerConfigState } from '../../../../atoms/pagerConfigState';
import { Fragment, useMemo, useState, useEffect } from 'react';
import PageView from '../../../../components/pageView/index';
import Page from '../../../../components/pageView/page';

interface Props {};
export default function Content(props: Props) {
  const { config, data } = useGetOperationConfigState();
  const {
    width,
    height,
    padding,
    unit,
    showPersonalDetail,
    dpi,
    border,
    lineHeight,
  } = useGetPagerConfigState();

  // page 内容区域大小
  const [contentSize, setContentSize] = useState({ width: 100, height: 100 });
  useEffect(() => {
    const p = Number(padding?.replace(unit, '')) || 0;
    const b = border === 'none' ? 0 : border === 'double' ? 4 : 2;
    const w = (width * dpi / 25.4) - (p * 2 * dpi / 25.4) - b;
    const h = (height * dpi / 25.4) - (p * 2 * dpi / 25.4) - b;
    setContentSize({ width: w, height: h });
  }, [width, height, padding, unit, dpi, border]);

  // 一维数组转为二维
  const pageList = useMemo(() => {
    // 一维数组转为二维
    const arr = []; // 二维数组
    const step = config.column || 1;
    if (!data.length) arr.push([]);
    const _data = data.map((item, index) => ({...item, index: index + 1}));
    for (let i = 0; i < _data.length; i += step) {
      arr.push(_data.slice(i, i + step));
    }
    // return arr;
    let h = 0;
    const pageList: any[] = []; // 三维数组
    let currentPageData: any[] = []; // 二维数组
    for (let i = 0; i < arr.length; i++) {
      const boxHeight = contentSize.height - (showPersonalDetail && !pageList.length ? 94 : 0);
      h = h + (lineHeight || 0);
      if (h < boxHeight) {
        currentPageData.push(arr[i]);
      } else {
        // 下一页
        pageList.push(currentPageData);
        currentPageData = [];
        h = 0;
      }
    }
    if (currentPageData.length) {
      pageList.push(currentPageData);
    }
    return pageList;
  }, [data, config, lineHeight, contentSize, showPersonalDetail]);



  return <>
    <PageView>
      <>
        {
          pageList.map((page, index) => {
            return (
              <Page currentPage={index + 1} key={index}>
                {
                  page.map((row: any, i: number) => <Row rowsData={row} key={i} />)
                }
              </Page>
            );
          })
        }
      </>
    </PageView>
  </>
}

function Row({ rowsData }: { rowsData: any[] }) {
  const { lineHeight } = useGetPagerConfigState();
  const spacing = <div className="operation-column-spacing"></div>
  return <div className="operation-content-row" data-height={lineHeight}>
    {
      rowsData.map((item, index) => {
        return <Fragment key={index}>
          <Item {...item} />
          {index >= rowsData.length - 1 ? spacing : null}
        </Fragment>;
      })
    }
  </div>;
}


function Item(props: any) {
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

  return (
    <div className="operation-content-item" style={{width: itemWidth}}>
      <div className="item-index">{props.index}</div>
      {
        props.arr.map((item: any, index: number) => {
          if (typeof item === 'number') {
            return (
              <div className="item-num">
                {
                  props.arr.length !== index + 1 || config.mode === 'read'
                    ? item
                    : ''
                }
              </div>
            )
          } else {
            return <div className="item-symbol">{item}</div>
          }
        })
      }
    </div>
  );
}
