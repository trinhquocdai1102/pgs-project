import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import Navbar from './modules/common/components/Navbar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('./modules/products/pages/ProductsPage'));

// interface Props {
//     props: Props;
// }
// const [visible, setVisible] = useState(false);

// const toggleVisible = () => {
//   const scrolled = document.documentElement.scrollTop;
//   if (scrolled > 300) {
//     setVisible(true);
//   } else if (scrolled <= 300) {
//     setVisible(false);
//   }
// };

// const scrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// };
// window.addEventListener('scroll', toggleVisible);

export const Routes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            width: '100vw',
            minHeight: '100vh',
            margin: 'auto',
            alignItems: ' center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            background: 'transparent',
          }}
        >
          <CircularProgress
            disableShrink
            style={{
              width: '80px',
              height: '80px',
            }}
          />
        </div>
      }
    >
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />
          <Route path={ROUTES.products} render={(props) => <ProductsPage {...props} isSidebarOpen={isSidebarOpen} />} />

          <ProtectedRoute path="/" component={ProductsPage} />
        </Switch>
      </Navbar>
    </Suspense>
  );
};
