/**
 * page view
 * 展示当前页面的page box
 */
import { useMemo, ReactNode, forwardRef, useRef, useEffect, useCallback, useState } from 'react';
import './page.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../atoms/pagerConfigState';
import PersonalDetail from '../personalDetail/index';
import { useWindowSize } from 'react-use'

interface Props {
  currentPage: number;
  children?: ReactNode;
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
  
  const pageContentRef = useRef<HTMLDivElement>(null);
  const pageBoxRef = useRef<HTMLDivElement>(null);

  const pageStyle = useMemo(() => {
    return {
      width: `${direction === 'column' ? width : height}${unit}`,
      height: `${direction === 'column' ? height : width}${unit}`,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      padding,
    };
  }, [width, height, fontSize, lineHeight, padding]);




  return (
    <div className="page-wrap export-pdf-page" style={pageStyle}>
      <div
        ref={pageContentRef}
        className="page-content"
        style={{ border: `${border === 'double' ? '3px' : '1px'} ${border} rgba(229,231,235, 0.9)` }}
      >
        {
          showPersonalDetail && props.currentPage <= 1
            ? <PersonalDetail />
            : null
        }
        <div
          ref={pageBoxRef}
          className="page-box"
          style={{
            width: '100%',
            height: `${showPersonalDetail && props.currentPage <= 1 ? 'calc(100% - 94px)' : '100%'}`
          }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Page);