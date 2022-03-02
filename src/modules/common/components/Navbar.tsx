import React, { useState, FC } from 'react';
import { ACCESS_TOKEN_KEY, APIpath, avatarFemaleDefault, avatarMaleDefault } from '../../../utils/constants';
import Cookies from 'js-cookie';
import '../style.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import LogoutForm from '../../auth/components/LogoutForm';
import Sidebar from './Sidebar';

interface Props {}

const Navbar: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isLogin = Cookies.get(ACCESS_TOKEN_KEY);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const { user } = useSelector((state: AppState) => state.profile);

  const handleOpenMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const checkGender = () => {
    if (user?.gender === 'female') {
      return avatarFemaleDefault;
    } else {
      return avatarMaleDefault;
    }
  };
  const src = user?.avatar ? `${APIpath}/${user?.avatar}` : checkGender();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {isLogin && (
        <Box sx={{ flexGrow: 1 }} style={{ boxShadow: '0 0.5rem 1rem 0 #1a1f33', marginBottom: 'var(--navHeight)' }}>
          <AppBar position="fixed" style={{ background: '#323259' }}>
            <Toolbar style={{ alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                style={{ margin: '0 20px 0 0', padding: '0' }}
                onClick={handleOpenMenu}
              >
                <MenuIcon style={{ fontSize: '24px', color: '#b4b4db' }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="d-flex align-items-center navbar-content"
              >
                <IconButton style={{ textDecoration: 'none', fontSize: '28px', color: '#fff', fontWeight: '400' }}>
                  Gear Focus Admin
                </IconButton>
                <span style={{ position: 'relative' }} className="notify-hover">
                  <NotificationsNoneIcon style={{ fontSize: '20px' }} />
                  <span className="notify-navbar">
                    <IconButton>
                      <span>
                        <ArrowCircleDownOutlinedIcon />
                        Unapproved vendors
                      </span>
                      <span>2</span>
                    </IconButton>
                    <IconButton>
                      <span>
                        <WarningAmberOutlinedIcon />
                        Requests for payment
                      </span>
                      <span>2</span>
                    </IconButton>
                    <IconButton>
                      <span>
                        <EmailOutlinedIcon />
                        Messages
                      </span>
                      <span>2</span>
                    </IconButton>
                  </span>
                </span>
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="My profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="my avatar" src={src} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  className="navbar-avatar-item"
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        history.push('/userInfo');
                      }}
                    >
                      <IconButton
                        style={{ fontSize: '14px', display: 'flex', color: '#222b45', textDecoration: 'none' }}
                      >
                        My profile
                      </IconButton>
                      <span style={{ fontSize: '15px', color: '#999' }}>{user?.email}</span>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <LogoutForm />
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <div style={{ display: 'flex' }}>
            {isLogin && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
            {children}
          </div>
        </Box>
      )}
    </>
  );
};
export default Navbar;
