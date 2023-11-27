/**
 * navbar
 */
import './index.less';
import { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [current, setCurrent] = useState<string>('math');
  const navigate = useNavigate();

  const path: any = {
    index: '/',
    operation: '/operation'
  };
  const items = [
    { label: '官网', key: 'index' },
    { label: '数学题', key: 'operation' }
  ];
  const onMenuClick = (data: any) => {
    setCurrent(data.key);
    navigate(path[data.key]);
  }

  return (
    <div className="navbar-warp">
      <div className="navbar-content-warp">
        <div className="logo">
          <img src="/logo_1.png" alt="" />
        </div>
        <Menu
          style={{ flex: 'none' }}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          theme="dark"
          onClick={onMenuClick}
        />;
      </div>
    </div>
  );
}
