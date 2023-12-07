/**
 * 格子组件
 * 具体为什么不用svg代替div渲染，原因为大数量渲染可动态调整元素div性能优于svg
 */
import './index.less';
import { ReactDOM, ReactNode, useMemo, memo } from 'react';
import { LATTICE_SIZE_LIST } from '../../constants';

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
  children?: ReactNode; // 插槽
};
// 四方格
export default memo(function Grid(props: Props) {
  const {
    type = 'rectangleGrid',
    size = '',
    color = '#ccc',
    children
  } = props;

  const gridSize = useMemo(() => {
    const temp = LATTICE_SIZE_LIST.find(item => item.value === size);
    return temp?.size || 40;
  }, [size]);

  const style = useMemo(() => {
    return {
      borderColor: color,
    };
  }, [color]);

  const tian = <>
    <div className="line hline" style={style}/>
    <div className="line vline" style={style}/>
  </>;
  const mi = <>
    {tian}
    <div className="line bline1" style={style}/>
    <div className="line bline2" style={style}/>
  </>;
  const hui = <>
    {tian}
    <div className="line palace" style={style}></div>
  </>;
  const lhui = <>
    {tian}
    <div className="line lpalace palace" style={style}></div>
  </>;
  const jiu = <>
    <div className="line hline1" style={style}></div>
    <div className="line hline2" style={style}></div>
    <div className="line vline1" style={style}></div>
    <div className="line vline2" style={style}></div>
  </>;

  return (
    <div className="grid-warp" style={{width: `${gridSize}px`, height: `${gridSize}px`, fontSize: `${gridSize - 14}px`, ...style}}>
      { type === 'rectangleGrid' ? tian : null }
      { type === 'miGrid' ? mi : null }
      { type === 'palaceGrid' ? hui : null }
      { type === 'longPalaceGrid' ? lhui : null }
      { type === 'ninePalaceGrid' ? jiu : null }
      { children }
    </div>
  );
});
