/**
 * page view
 */
import { ReactNode, useEffect } from 'react';
import './index.less';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../../../atoms/pager';
import { PAGER_MAP } from '../../../../constants/pager';

interface Props {
  children?: ReactNode;
};

export default function PageView(props: Props) {
  const { setPagerConfit } = useSetPagerConfigState();
  const { width, height, direction } = useGetPagerConfigState();

  useEffect(() => {
    setPagerConfit({
      width: PAGER_MAP['A4'].width,
      height: PAGER_MAP['A4'].height,
    });
  }, []);

  return (
    <div className="page-view-scroll">
      <div
        className="page-view-p"
        style={{
          width: direction === 'column' ? width : height,
          height: direction === 'column' ? height : width,
        }}
      >
        {props.children || null}
      </div>
    </div>
  );
};