/**
 * 运算题
 */

import './index.less';
import { useGetContentDataState } from '../../../atoms/contentData';
import { useGetPagerConfigState } from '../../../atoms/pagerConfig';
import Item from './Item';

interface Props {
  moduleData?: any;
};

export default function Operation(props: Props) {
  const pagerConfig = useGetPagerConfigState();
  const { id, type, dataType, list, config } = props.moduleData;


  return (
    <div className="operation-view-warp">
      {
        list.map((item: Array<number>, index: number) => {
          return (
            <div
              key={index}
              className="operation-view-item"
              style={{
                width: `${100 / (config?.column || 1)}%`,
                fontSize: config.fontSize ? `${config.fontSize}px` : 'inherit',
                lineHeight: config.lineHeight ? `${config.lineHeight}px` : 'inherit',
              }}
            >
              <Item data={item} config={config} />
            </div>
          );
        })
      }
    </div>
  );
};
