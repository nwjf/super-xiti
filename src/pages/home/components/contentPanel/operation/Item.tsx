import './index.less';
import { useState, useEffect } from 'react';

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
const random = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start) + start)
}

interface Props {
  data: Array<any>;
  config: any;
};

export default function Item(props: Props) {
  const { data, config } = props;
  const [solveIndex, setSolveIndex] = useState<number>(0);

  useEffect(() => {
    let index = random(0, data.length - 1);
    if (typeof data[index] !== 'number') {
      index++;
    }
    setSolveIndex(index);
  }, [data]);

  return (
    <>
      {
        data.map((opt, index) => {
          return (
            <div
              key={index}
              className={[
                getOperationCalssName(opt),
                config.mode === 'solve' && index === solveIndex ? 'sign-solve' : ''
              ].join(' ')}
            >
              {
                config.mode === 'solve' && index === solveIndex ? '' : opt
              }
            </div>
          );
        })
      }
    </>
  );
};