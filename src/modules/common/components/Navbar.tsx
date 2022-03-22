import React, { useState, FC, useEffect, useCallback } from 'react';
import '../style.css';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import SnackbarForm from './SnackbarForm';
import AppBar from '@mui/material/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { AppState } from '../../../redux/reducer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { replace } from 'connected-react-router';
import { API_PATHS } from '../../../configs/api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../redux/thunk';
import { setFieldData } from '../redux/navbarReducer';
import { setLogoutUser } from '../../auth/redux/authReducer';
import { ROUTES } from '../../../configs/routes';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
  handleOpenMenu(): void;
}

const Navbar: FC<Props> = ({ children, isSidebarOpen, setIsSidebarOpen, handleOpenMenu }) => {
  const history = useHistory();
  const isLogin = Cookies.get(ACCESS_TOKEN_KEY);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => state.profile);

  const fetchAllData = useCallback(async () => {
    const dataInfo: { [key: string]: { url: string } } = {
      vendor: {
        url: API_PATHS.vendorList,
      },
      category: {
        url: API_PATHS.categoryList,
      },
      brand: {
        url: API_PATHS.brandList,
      },
      condition: {
        url: API_PATHS.conditionList,
      },
      shipping: {
        url: API_PATHS.shipping,
      },
    };

    const promise = await Promise.all(
      Object.keys(dataInfo)?.map((item) => {
        return dispatch(fetchThunk(dataInfo[item].url, 'get'));
      }),
    );

    const data = promise.reduce((result, cur, index) => {
      result[Object.keys(dataInfo)[index]] = cur.data?.map((item: any) => ({
        ...item,
      }));
      return result;
    }, {} as any);

    dispatch(setFieldData(data));
  }, [dispatch]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    if (Cookies.get(ACCESS_TOKEN_KEY)) {
      dispatch(setLogoutUser());
      dispatch(replace(ROUTES.login));
    }
    return;
  };

  useEffect(() => {
    if (isLogin) {
      fetchAllData();
    }
  }, [fetchAllData, isLogin]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 'var(--navHeight)' }} className="top-navbar">
        {isLogin && (
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
                    <PersonOutlineOutlinedIcon style={{ color: '#b4b4db' }} />
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
                      <span style={{ fontSize: '15px', color: '#999' }}>{user?.login}</span>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      onClick={handleLogout}
                      style={{ fontSize: '14px', display: 'flex', color: '#222b45', textDecoration: 'none' }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        )}
        <div style={{ display: 'flex' }}>
          {isLogin && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
          {children}
        </div>
      </Box>
      <SnackbarForm />
    </>
  );
};
export default Navbar;
