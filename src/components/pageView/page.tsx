/**
 * page view
 * 展示当前页面的page box
 */
import { useMemo, ReactNode, forwardRef, useRef, useEffect, useCallback, useState } from 'react';
import './page.less';
import { useGetPagerConfigState } from '../../atoms/pagerConfigState';
import PersonalDetail from '../personalDetail/index';

interface Props {
  currentPage: number;
  offsetTop?: number;
  setIsShowNextPage?: (oldIsShowNextPage?: any) => void;
  setNextOffsetTop?: (old: number) => void;
  children?: ReactNode;
  ref?: any;
};

function Page(props: Props, ref: any) {
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
    showPersonalDetail
  } = useGetPagerConfigState();
  
  const [offsetBottom, setOffsetBottom] = useState<number>(0);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const pageBoxRef = useRef<HTMLDivElement>(null);
  const pageContentViewRef = useRef<HTMLDivElement>(null);

  const pageStyle = useMemo(() => {
    return {
      width: `${direction === 'column' ? width : height}${unit}`,
      height: `${direction === 'column' ? height : width}${unit}`,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      padding,
    };
  }, [width, height, fontSize, lineHeight, padding, offsetBottom]);

  const computeNextInfo = useCallback(() => {
    if (!pageContentViewRef.current) return;
    const pageContentNode = pageContentViewRef.current;
    const pageBoxNode = pageBoxRef.current;
    if (!pageBoxRef.current) return;
    const pageBoxHeight: number = pageBoxNode?.clientHeight || 0;
    const pageContentHeight: number = pageContentNode?.clientHeight;
    const offsetTop = props.offsetTop || 0;
    const isTrue = pageContentHeight - offsetTop > pageBoxHeight
      || pageContentHeight - offsetTop > pageBoxHeight - offsetBottom
    if (isTrue && props.currentPage && props.currentPage < 100) {
      props.setNextOffsetTop && props.setNextOffsetTop(offsetTop + pageBoxHeight - offsetBottom);
      props.setIsShowNextPage && props.setIsShowNextPage(true);
    }
  }, [pageContentRef, props, offsetBottom]);

  const computeDomOffset = useCallback(() => {
    if (!pageContentRef.current) return;
    const pageContentNode = pageContentRef.current;
    const pageBoxNode = pageBoxRef.current;
    if (!pageBoxRef.current) return;

    const height = pageBoxNode?.clientHeight || 0;
    const pageBoxTop = pageBoxNode?.offsetTop || 0;
    if (height <= 0) return;
    const listNodes: any = pageBoxNode?.childNodes[0]?.childNodes[0].childNodes;
    computeNextInfo()

    for (let i = 0; i < listNodes?.length; i++) {
      const node = listNodes[i];
      const nodeHeight = node.clientHeight || 0;
      const nodeTop = node.offsetTop;
      const top = nodeHeight - (nodeTop + nodeHeight - height);
      const isTrue = nodeTop + nodeHeight > height && nodeTop < height;
      if (isTrue) {
        setOffsetBottom(top);
        computeNextInfo();
        break;
      }
    }
  }, [pageContentRef, pageBoxRef, computeNextInfo]);

  


  // 监听dom变化
  useEffect(() => {
    const pageContentNode = pageContentRef.current;

    if (!pageContentNode) {
      return;
    }

    let run: any = null;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          clearTimeout(run);
          run = setTimeout(() => {
            computeDomOffset();
          }, 100);
        }
      });
    });

    observer.observe(pageContentNode, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [computeDomOffset]);

  useEffect(() => {
    computeDomOffset();
  }, [computeDomOffset, border, lineHeight, fontSize, direction, width, height, padding, showPersonalDetail]);


  return (
    <div className="page-wrap export-pdf-page" style={pageStyle}>
      {/* <div className="page-wrap-num">{props.currentPage} <br/> {props.offsetTop}</div> */}
      <div
        ref={pageContentRef}
        className="page-content"
        style={{ border: `${border === 'double' ? '3px' : '1px'} ${border} rgba(229,231,235, 0.9)` }}
      >
        { showPersonalDetail && props.currentPage <= 1 ? <PersonalDetail /> : null }
        <div
          ref={pageBoxRef}
          className="page-box"
          style={{ width: '100%', height: `${showPersonalDetail && props.currentPage <= 1 ? 'calc(100% - 94px)' : '100%'}` }}
        >
          <div ref={pageContentViewRef} className="page-offsettop" style={{ marginTop: `-${props.offsetTop || 0}px`}}>
            { props.children ? props.children : null }
          </div>
          <div className="page-box-cover" style={{height: `${offsetBottom}px`}}></div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Page);