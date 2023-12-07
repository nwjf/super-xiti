/**
 * page view
 */
import { ReactElement, CSSProperties } from 'react';
import './index.less';

interface Props {
  children?: ReactElement | ReactElement[];
  style?: CSSProperties;
};

export default function PageView({ children, style }: Props) {
  return <div className="page-view-warp" style={style}>{children}</div>
}