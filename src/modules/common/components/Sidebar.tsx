import React, { useState } from 'react';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
}

const Sidebar = (props: Props) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;
  const [isCollapse, setCollapse] = useState(true);
  const handleCollapse = () => {
    setCollapse(!isCollapse);
  };

  return (
    <div>
      {isSidebarOpen === true && (
        <ProSidebar className="sidebar">
          <div className={isSidebarOpen ? 'display-full' : 'displayNone'}>
            <Menu iconShape="square" style={{ backgroundColor: 'var(--sidebarColor)' }}>
              <SubMenu
                title="Category"
                icon={<LocalOfferOutlinedIcon />}
                onClick={() => handleCollapse()}
                className={isCollapse ? 'w100' : 'w90'}
              >
                <MenuItem>
                  <Link to="/products">Products</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu
                title="User"
                icon={<PeopleAltOutlinedIcon />}
                onClick={() => handleCollapse()}
                className={isCollapse ? 'w100' : 'w90'}
              >
                <MenuItem>
                  <Link to="/user-list">User list</Link>
                </MenuItem>
              </SubMenu>
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
              <SubMenu
                icon={<LocalOfferOutlinedIcon />}
                onClick={() => {
                  setIsSidebarOpen(true);
                  setCollapse(false);
                }}
              ></SubMenu>
              <SubMenu
                icon={<PeopleAltOutlinedIcon />}
                onClick={() => {
                  setIsSidebarOpen(true);
                  setCollapse(false);
                }}
              ></SubMenu>
            </Menu>
          </div>
        </ProSidebar>
      )}
    </div>
  );
};

export default Sidebar;
