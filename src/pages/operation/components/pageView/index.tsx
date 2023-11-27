/**
 * page view
 */
import { ReactNode, useEffect, useRef, useMemo, useCallback, useState, Fragment } from 'react';
import './index.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../../../atoms/pagerConfigState';
import { PAGER_MAP } from '../../../../constants/pager';
import { useWindowSize } from 'react-use';
import { useGetOperationConfigState } from '../../atoms/operationConfigState';
import PersonalDetail from '../../../../components/personalDetail';

interface Props {
  children?: ReactNode;
  offsetTop?: number;
  currPage?: number; // 当前页码
};

export default function PageView(props: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { setPagerConfit } = useSetPagerConfigState();
  const operationConfigState = useGetOperationConfigState();
  const {
    width,
    height,
    direction,
    fontSize,
    lineHeight,
    padding,
    scale,
    unit,
    border,
  } = useGetPagerConfigState();

  const refPageView = useRef(null);
  const [currPage, setCurrPage] = useState<number>(props.currPage || 1); // 当前页码

  const [contentBHeight, setContentBHeight] = useState<number>(0);
  const [contentCHeight, setContentCHeight] = useState<number>(0);

  const offsetTop = props.offsetTop || 0;

  const refPageContentBFn = (dom: any) => {
    if (!dom) return null;
    const h = dom.clientHeight;
    setContentBHeight(h);
  };
  const refPageContentCFn = (dom: any) => {
    if (!dom) return null;
    const h = dom.clientHeight;
    setContentCHeight(h);
  };

  // 底部半行字问题遮盖高度
  const bottomOffset = useMemo(() => {
    return contentBHeight % (lineHeight || contentBHeight) || 0;
  }, [lineHeight, contentBHeight, currPage]);

  // 下一页应该的的偏移量
  const nextOffsetTop = useMemo(() => {
    return (offsetTop || 0) + contentBHeight - bottomOffset;
  }, [offsetTop, contentBHeight, bottomOffset]);


  const isShowNextPage = useMemo(
    () => {
      if (currPage > 1 && offsetTop <= 0) {
        return false;
      }
      if (contentBHeight < contentCHeight - offsetTop) {
        return true;
      }
      return false;
    },
    [
      currPage,
      operationConfigState.data,
      contentBHeight,
      contentCHeight,
      offsetTop
    ]
  );


  useEffect(() => {
    setPagerConfit({
      width: PAGER_MAP['A4'].width,
      height: PAGER_MAP['A4'].height,
    });
    // showNextPage();
  }, []);

  // 设置缩放比例
  useEffect(() => {
    let scale = 1;
    const dom: any = refPageView.current;
    if (dom) {
      const h = dom.clientHeight;
      if (h > windowHeight) {
        scale = (windowHeight - 40) / h;
      }
      const w = dom.clientWidth;
      if (w > windowWidth) {
        scale = (windowWidth - 20) / w;
      }
    }
    setPagerConfit({ scale });
  }, [height, windowHeight, width, windowWidth]);

  // 外部容器宽度
  const boxStyle = useMemo(() => {
    const w = direction === 'column' ? width : height;
    const _w = w * (scale || 1);
    const h = direction === 'column' ? height : width;
    const _h = h * (scale || 1);
    return {
      width: _w + unit,
      height: _h + unit,
    }
  }, [width, height, scale, direction, unit]);



  const pageDom =
    <>
      <div className="page-view-box" style={{...boxStyle}}>
        <div
          ref={refPageView}
          className="page-view-p"
          style={{
            width: `${direction === 'column' ? width : height}${unit}`,
            height: `${direction === 'column' ? height : width}${unit}`,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            padding,
            transform: `scale(${scale || 1})`
          }}>
          {/* page content */}
          <div
            className="page-view-pcontent-b"
            ref={refPageContentBFn}
            style={{ border: `1px ${border} rgba(229,231,235, 0.9)`}}
          >
            <PersonalDetail />
            <div className="page-view-pcontent-c" ref={refPageContentCFn} style={{marginTop: -offsetTop + 'px'}}>
              {props.children || null}
            </div>

            <div className="page-view-bottom-offset" style={{ height: bottomOffset + 'px' }}></div>
          </div>
        </div>
      </div>
      {
        isShowNextPage
        ?
          <PageView
            currPage={currPage + 1}
            offsetTop={nextOffsetTop}>
            {props.children || null}
          </PageView>
        : null
      }
    </>

  if (currPage !== 1) {
    return pageDom;
  }
  else
    return (
      <div className="page-view-scroll export-pdf-page" style={{width: boxStyle.width}}>
        { pageDom }
      </div>
    );
};