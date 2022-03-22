import React, { lazy, Suspense, useState } from 'react';
import { ROUTES } from './configs/routes';
import Navbar from './modules/common/components/Navbar';
import Loading from './modules/common/components/Loading';
import { Route, Switch, useLocation } from 'react-router-dom';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UsersPage = lazy(() => import('./modules/users/pages/UsersPage'));
const AddUserPage = lazy(() => import('./modules/users/pages/AddUserPage'));
const UserDetailPage = lazy(() => import('./modules/users/pages/UserDetailPage'));
const ProductsPage = lazy(() => import('./modules/products/pages/ProductsPage'));
const AddProductPage = lazy(() => import('./modules/products/pages/AddProductPage'));
const ProductDetailPage = lazy(() => import('./modules/products/pages/ProductDetailPage'));

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleOpenMenu={handleOpenMenu}>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />
          <ProtectedRoute
            path={ROUTES.products}
            render={(props) => <ProductsPage {...props} isSidebarOpen={isSidebarOpen} />}
          />
          <ProtectedRoute
            path={`${ROUTES.detailProduct}/:id`}
            render={(props) => <ProductDetailPage {...props} isSidebarOpen={isSidebarOpen} />}
          />
          <ProtectedRoute
            path={ROUTES.addProduct}
            render={(props) => <AddProductPage {...props} isSidebarOpen={isSidebarOpen} />}
          />
          <ProtectedRoute
            path={ROUTES.users}
            render={(props) => <UsersPage {...props} isSidebarOpen={isSidebarOpen} />}
          />
          <ProtectedRoute
            path={ROUTES.addUser}
            render={(props) => <AddUserPage {...props} isSidebarOpen={isSidebarOpen} />}
          />

          <ProtectedRoute
            path={`${ROUTES.detailUser}/:id`}
            render={(props) => <UserDetailPage {...props} isSidebarOpen={isSidebarOpen} />}
          />

          <ProtectedRoute path="/" render={(props) => <ProductsPage {...props} isSidebarOpen={isSidebarOpen} />} />
        </Switch>
      </Navbar>
    </Suspense>
  );
};
