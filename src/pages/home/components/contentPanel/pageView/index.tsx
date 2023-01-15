/**
 * page view
 */
import { ReactNode, useEffect, useRef } from 'react';
import './index.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../../atoms/pagerConfig';
import { PAGER_MAP } from '../../../constants/pager';
import { useWindowSize } from 'react-use';

interface Props {
  children?: ReactNode;
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
  } = useGetPagerConfigState();

  const refPageView = useRef(null);

  useEffect(() => {
    setPagerConfit({
      width: PAGER_MAP['A4'].width,
      height: PAGER_MAP['A4'].height,
    });
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
    }
    setPagerConfit({ scale });
  }, [height, windowHeight]);

  return (
    <div className="page-view-scroll">
      <div
        ref={refPageView}
        className="page-view-p"
        style={{
          width: direction === 'column' ? width : height,
          height: direction === 'column' ? height : width,
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}px`,
          padding,
          transform: `scale(${scale || 1})`
        }}
      >
        {props.children || null}
      </div>
    </div>
  );
};