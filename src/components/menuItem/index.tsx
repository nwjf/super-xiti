
import './index.less';
import { ReactNode } from 'react';

interface Props {
  name?: string;
  children?: ReactNode;
};

export default function MenuItem(props: Props) {
  return (
    <div className="menu-item-warp">
      <div className="menu-item-title">{props.name}</div>
      <div className="menu-item-content">{props.children}</div>
    </div>
  );
};