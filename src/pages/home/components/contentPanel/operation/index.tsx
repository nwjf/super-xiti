/**
 * 运算题
 */

import './index.less';
import { useGetContentDataState } from '../../../atoms/contentData';

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
  console.log(props.moduleData);
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