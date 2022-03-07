import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { getErrorMessageResponse } from '../../../utils';
import ProductsForm from '../components/ProductsForm';
import { IProducts, IProductsFilter } from '../../../models/products';

interface Props {
  isSidebarOpen: boolean;
}

const ProductsPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [templateProduct, setTemplateProduct] = useState<IProducts[]>();
  const [filterValue, setFilterValue] = useState<IProductsFilter>({
    searchKey: '',
    category: '0',
    stockStatus: 'all',
    searchIn: [],
    availability: 'all',
    vendor: '',
  });
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    itemPerPage: 25,
  });
  const [totalItem, setTotalItem] = useState(0);

  const handleFilter = useCallback((data: IProductsFilter) => {
    setFilterValue(data);
  }, []);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.productList, 'post', { ...filterValue, page: pageInfo.page, count: pageInfo.itemPerPage }),
    );
    setLoading(false);

    if (resp.data) {
      setTemplateProduct(
        resp.data.map((item: IProducts) => {
          return { ...item, checked: false, delete: false };
        }),
      );
      setTotalItem(resp.recordsFiltered);
      return;
    }
    setErrorMessage(getErrorMessageResponse(resp));
    setTemplateProduct([]);

    return;
  }, [dispatch, pageInfo.itemPerPage, pageInfo.page, filterValue]);

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      setPageInfo({ ...pageInfo, page: num });
    },
    [pageInfo],
  );

  const handleChangItemPerPage = useCallback(
    (num: number) => {
      setPageInfo({ ...pageInfo, itemPerPage: num });
    },
    [pageInfo],
  );

  useEffect(() => {
    async function fetchProductCategory() {
      const resp = await fetch(API_PATHS.categoryList);
      const respJSON = await resp.json();
      const { data } = respJSON;
      setProductCategory(data);
    }
    fetchProductCategory();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (!templateProduct) {
      setTemplateProduct(templateProduct);
    }
  }, [templateProduct]);

  return (
    <>
      <div
        style={{
          padding: '36px 36px 120px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <ProductsForm
          errorMessage={errorMessage}
          productCategory={productCategory}
          currentPage={pageInfo.page}
          itemPerPage={pageInfo.itemPerPage}
          totalItem={totalItem}
          handleChangePage={handleChangePage}
          handleChangItemPerPage={handleChangItemPerPage}
          templateProduct={templateProduct}
          handleFilter={handleFilter}
          loading={loading}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </>
  );
};

export default ProductsPage;
