/**
 * 官网
 */
import './index.less';
import Navbar from '../../components/navbar';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export default function Index() {
  return (
    <div className='index-warp'>
      <Navbar />
      <div className="menu page1">
        <div className="menu-content">
          <div className="page1-title">习题打印生成器</div>
          <div className="page1-sub-title">强大、易用的一键生成数学题、描红字帖及各种空白模板</div>
          <div className="page1-msg">让眼睛回归纸张，远离屏幕设备</div>
          <NavLink to="/operation">
            <Button className="page1-btn" type="primary">开始使用</Button>
          </NavLink>
        </div>
      </div>
      <div className="menu page2">
        <div className="menu-content">
          <div className="page2-title">但，不止于此</div>
          <div className="page2-msg">
            竖式加减法、<br/>
            认识钟表、<br/>
            笔画笔顺、<br/>
            控笔练习等新功能，<br/>
            正在开发中
          </div>
          <NavLink to="/chinese">
            <Button className="page2-btn" type="primary">开始使用</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
