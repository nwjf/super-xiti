/**
 * 格子组件
 * 具体为什么不用svg代替div渲染，原因为大数量渲染可动态调整元素div性能优于svg
 */
import './index.less';
import { ReactDOM, useMemo } from 'react';

// { label: '四方格', value: 'squareGrid' },  
// { label: '田字格', value: 'rectangleGrid' },  
// { label: '米字格', value: 'miGrid' },  
// { label: '回宫格', value: 'palaceGrid' },  
// { label: '长回宫格', value: 'longPalaceGrid' },  
// { label: '九宫格', value: 'ninePalaceGrid' },  

interface Props {
  type?: string; // 格子类型
  size?: string; // 格子大小
  color?: string; // 格子颜色
  children?: ReactDOM; // 插槽
};
// 四方格
export default function Grid(props: Props) {
  const {
    type = 'ninePalaceGrid',
    size = '',
    color = '#ccc',
    children
  } = props;

  const style = useMemo(() => {
    return {
      borderColor: color,
    };
  }, [color]);

  const tian = <>
    <div className="hline" style={style}/>
    <div className="vline" style={style}/>
  </>;
  const mi = <>
    {tian}
    <div className="bline1" style={style}/>
    <div className="bline2" style={style}/>
  </>;
  const hui = <>
    {tian}
    <div className="palace" style={style}></div>
  </>;
  const lhui = <>
    {tian}
    <div className="lpalace palace" style={style}></div>
  </>;
  const jiu = <>
    <div className="hline1"></div>
    <div className="hline2"></div>
    <div className="vline1"></div>
    <div className="vline2"></div>
  </>;

  return (
    <div className="grid-warp" style={{width: '50px', height: '50px', ...style}}>
      { type === 'rectangleGrid' ? tian : null }
      { type === 'miGrid' ? mi : null }
      { type === 'palaceGrid' ? hui : null }
      { type === 'longPalaceGrid' ? lhui : null }
      { type === 'ninePalaceGrid' ? jiu : null }
    </div>
  );
}