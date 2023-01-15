/**
 * 运算题
 */

import './index.less';
import { useGetContentDataState } from '../../../atoms/contentData';
import { useGetPagerConfigState } from '../../../atoms/pagerConfig';

interface Props {
  moduleData?: any;
};

const operationClassNameMap: Record<string, string> = {
  '+': 'sign-add',
  '-': 'sign-minus',
  'x': 'sign-multiplication',
  '*': 'sign-multiplication',
  '/': 'sign-division',
  '➗': 'sign-division',
  '=': 'sign-equal',
  'num': 'sign-num',
};
const getOperationCalssName = (k: string | number) => {
  let numReg = /^\d{1,}$/g;
  numReg.lastIndex = 0;
  if (numReg.test(String(k))) {
    return operationClassNameMap['num'];
  }
  else {
    return operationClassNameMap[k];
  }
}

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
              {
                item.map((opt, index) => {
                  return (
                    <div key={index} className={[getOperationCalssName(opt)].join( )}>{opt}</div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};