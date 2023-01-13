/**
 * page view
 */
import { ReactNode } from 'react';
import './index.less';

interface Props {
  children?: ReactNode;
};

export default function PageView(props: Props) {
  return (
    <div className="page-view-scroll">
      <div
        className="page-view-p"
        style={{width: '210mm', height: '297mm'}}
      >
        
      </div>
    </div>
  );
};