import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import Navbar from './modules/common/components/Navbar';
// import Sidebar from './modules/common/components/Sidebar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'));
const UserInfoPage = lazy(() => import('./modules/home/pages/UserInfoPage'));
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
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
          <span className="sr-only">Loading...</span>
        </div>
      }
    >
      <Navbar>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />
          <Route path={ROUTES.register} component={RegisterPage} />
          <ProtectedRoute path={ROUTES.home} component={HomePage} />
          <ProtectedRoute path={ROUTES.userInfo} component={UserInfoPage} />
          <ProtectedRoute path={ROUTES.product} component={ProductsPage} />
          <Route path={ROUTES.contact} component={ContactPage} />

          <ProtectedRoute path="/" component={ProductsPage} />
        </Switch>
      </Navbar>
    </Suspense>
  );
};
