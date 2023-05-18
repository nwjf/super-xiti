/**
 * page view
 */
import { ReactNode, useEffect, useRef, useMemo, useCallback, useState, Fragment } from 'react';
import './index.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../atoms/pagerConfigState';
import { PAGER_MAP } from '../../constants/pager';
import { useWindowSize } from 'react-use';

interface Props {
  children?: ReactNode;
  offsetTop?: number;
  currPage?: number;
};

export default function PageView(props: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { setPagerConfit } = useSetPagerConfigState();
  const {
    width,
    height,
    direction,
    fontSize,
    lineHeight,
    padding,
    scale,
    unit,
  } = useGetPagerConfigState();

  const refPageView = useRef(null);
  const refPageContentB = useRef(null);
  const refPageContentC = useRef(null);
  const [isShowNextPage, setIsShowNextPage] = useState<boolean>(false);
  const [nextOffsetTop, setNextOffsetTop] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(props.currPage || 1); // 当前页码

  const showNextPage = useCallback(() => {
    const bDom: any = refPageContentB.current;
    const cDom: any = refPageContentC.current;
    const bHeight = bDom.clientHeight;
    const cHeight = cDom.clientHeight;
    console.log(bHeight, cHeight)
    if (cHeight > bHeight - (props.offsetTop || 0)) {
      setIsShowNextPage(true);
    }
    setNextOffsetTop(bHeight * (currPage - 1));
  }, [props.offsetTop, currPage]);

  useEffect(() => {
    setPagerConfit({
      width: PAGER_MAP['A4'].width,
      height: PAGER_MAP['A4'].height,
    });
    showNextPage();
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


  return (
    <>
      <div className="page-view-scroll" style={{width: boxStyle.width}}>
        {/* page */}
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
            }}
          >
            {/* page content */}
            <div className="page-view-pcontent-b" ref={refPageContentB}>
              <div className="page-view-pcontent-c" ref={refPageContentC} style={{marginTop: nextOffsetTop + 'px'}}>
                {props.children || null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isShowNextPage ? <PageView offsetTop={nextOffsetTop} currPage={currPage}>{props.children || null}</PageView> : null}
    </>
  );
};