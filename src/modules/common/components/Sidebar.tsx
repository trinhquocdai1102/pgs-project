import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
}

const Sidebar = (props: Props) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;

  const sidebarItem = [
    {
      name: 'Category',
      icon: LocalOfferOutlinedIcon,
      collapse: false,
      subItem: {
        name: 'Products',
        link: '/products',
      },
    },
    {
      name: 'User',
      icon: PeopleAltOutlinedIcon,
      collapse: false,
      subItem: {
        name: 'User list',
        link: '/users',
      },
    },
  ];

  return (
    <div>
      {isSidebarOpen === true && (
        <ProSidebar className="sidebar" style={{ boxShadow: isSidebarOpen && 'none' }}>
          <div className={isSidebarOpen ? 'display-full' : 'displayNone'}>
            <Menu iconShape="square" style={{ backgroundColor: 'var(--sidebarColor)' }}>
              {sidebarItem?.map((item, index) => {
                const [isCollapse, setCollapse] = useState(true);
                return (
                  <SubMenu
                    key={index}
                    title={item.name}
                    icon={<item.icon />}
                    onClick={() => setCollapse(!isCollapse)}
                    className={isCollapse ? 'w100' : 'w90'}
                  >
                    <MenuItem>
                      <Link to={item.subItem.link}>{item.subItem.name}</Link>
                    </MenuItem>
                  </SubMenu>
                );
              })}
            </Menu>
          </div>
        </ProSidebar>
      )}
      {isSidebarOpen === false && (
        <ProSidebar
          className="sidebar w60px"
          onClick={() => {
            setIsSidebarOpen(true);
          }}
        >
          <div className={isSidebarOpen ? 'displayNone' : 'display-collapse'}>
            <Menu iconShape="square">
              {sidebarItem?.map((item, index) => {
                return (
                  <SubMenu
                    key={index}
                    icon={<item.icon />}
                    onClick={() => {
                      setIsSidebarOpen(true);
                    }}
                  >
                    <MenuItem>
                      <Link to={item.subItem.link}>{item.subItem.name}</Link>
                    </MenuItem>
                  </SubMenu>
                );
              })}
            </Menu>
          </div>
        </ProSidebar>
      )}
    </div>
  );
};

export default Sidebar;
