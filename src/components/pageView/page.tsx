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
    scale = 1,
    unit,
    border,
    showPersonalDetail,
    dpi,
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
      transform: `scale(${scale})`,
      transformOrigin: '0 0'
    };
  }, [width, height, fontSize, lineHeight, padding, scale]);

  const pageViewStyle = useMemo(() => {
    return {
      width: `${(direction === 'column' ? width : height) * scale}${unit}`,
      height: `${(direction === 'column' ? height : width) * scale}${unit}`,
      overflow: 'hidden',
      marginBottom: '30px',
      flex: 'none'
    };
  }, [direction, width, height, unit, scale]);




  return (
    <div style={pageViewStyle} className="page-outer export-pdf-page">
      <div className="page-wrap" style={pageStyle}>
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
    </div>
  );
}

export default forwardRef(Page);