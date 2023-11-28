/**
 * navbar
 */
import './index.less';
import { useState, useEffect } from 'react';
import { Menu, Drawer } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { pathList, Path } from './path';
import { AppstoreOutlined } from '@ant-design/icons'

export default function Navbar() {
  const [current, setCurrent] = useState<string>('');
  const [showNavDrawer, setShowNavDrawer] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split('/').filter(item => item);
    setCurrent(pathname[0] || current || '');
  }, [location, current]);

  const onMenuClick = (data: any) => {
    setCurrent(data.key);
    setShowNavDrawer(false);
    const nav = pathList.find(item => item.key === data.key);
    if (!nav) return;
    navigate(nav.path);
  }

  return (
    <>
      <div className="navbar-warp">
        <div className="navbar-content-warp">
          <div className="logo">
            <img src="/logo_1.png" alt="" />
          </div>
          <Menu
            className="navbar-menu menu-pc"
            style={{ flex: 'none' }}
            selectedKeys={[current]}
            mode="horizontal"
            items={pathList}
            theme="dark"
            onClick={onMenuClick}
          />
          <div className="navbar-option-btn">
            <AppstoreOutlined rev="" onClick={() => setShowNavDrawer(true)}/>
          </div>
        </div>
      </div>

      <Drawer
        className="navbar-drawer"
        title=""
        width={300}
        onClose={() => setShowNavDrawer(false)}
        open={showNavDrawer}
      >
        <Menu
          className="menu-mobile"
          style={{ flex: 'none' }}
          selectedKeys={[current]}
          mode="vertical"
          items={pathList}
          theme="dark"
          onClick={onMenuClick}
        />
      </Drawer>
    </>
  );
}
