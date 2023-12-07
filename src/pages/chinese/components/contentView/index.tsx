import './index.less';
import { useEffect, useState, useMemo } from 'react';
import Grid from '../grid';
import PageView from '../../../../components/pageView/index';
import Page from '../../../../components/pageView/page';
import { useGetChineseConfigState } from '../../atoms/chineseConfigState';
import { useGetPagerConfigState } from '../../../../atoms/pagerConfigState';
import { LATTICE_SIZE_LIST } from '../../constants';

export default function ContentView() {
  const { config, data } = useGetChineseConfigState();
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

  const gridSize = useMemo(() => {
    const temp = LATTICE_SIZE_LIST.find(item => item.value === config.latticeSize);
    return temp?.size || 40;
  }, [config.latticeSize]);

  const [rowGridNum, setRowGridNum] = useState<number>(1);

  const pageList = useMemo(() => {
    const rowHeight = gridSize;
    const rowGridNum: number = Math.floor(contentSize.width / (gridSize));
    setRowGridNum(rowGridNum);
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const rowList = [...(Array(rowGridNum).fill(data[i]))];
      arr.push(rowList);
    }
    const pageList = [];
    let currentPageData: any[] = []; // 二维数组
    let h = 0;
    const boxHeight = contentSize.height - (showPersonalDetail && !pageList.length ? 94 : 0);
    for (let i = 0;; i++) {
      h += rowHeight;
      if (h < boxHeight) {
        currentPageData.push(arr[i] || [...(Array(rowGridNum).map(() => ({})))]);
      } else {
        h = 0;
        pageList.push(currentPageData);
        currentPageData = [];
        if (!arr[i]) break;
      }
    }
    if (currentPageData.length) {
      pageList.push(currentPageData);
    }
    return pageList;
  }, [data, contentSize, lineHeight, gridSize, showPersonalDetail]);

  return (
    <PageView>
      <>
        {
          pageList.map((page, index) => {
            return <Page currentPage={index + 1} key={'page' + index}>
              {
                page.map((row, rowIndex) => {
                  return <Row rowData={row} key={'row' + rowIndex} />;
                })
              }
            </Page>
          })
        }
      </>
    </PageView>
  );
}

function Row({ rowData }: { rowData: any[] }) {
  const { config } = useGetChineseConfigState();

  const getPaintStyle = (index: number) => {
    if (index <= 0) return {};
    if (index !== 0 && config.paint !== 'none') return { opacity: .2 };
  }

  const getText = (index: number, data: any) => {
    const text = data ? data.text || '' : '';
    const isShowText = index <= 0
      || (config.paint === 'half' && index < rowData.length / 2)
      || config.paint === 'whole';
    return isShowText ? text : '';
  }
  return (
    <div className="chinese-row">
      {
        rowData.map((item, index) => {
          return <Grid
            key={'rowGrid' + index}
            type={config.latticeType}
            size={config.latticeSize}>
              <div className="grid-text" style={getPaintStyle(index)}>
                {getText(index, item)}
              </div>
          </Grid>
        })
      }
    </div>
  );
}