import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { setProductData } from '../redux/productReducer';
import { getErrorMessageResponse } from '../../../utils';
import ProductsForm from '../components/ProductsForm';

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listProduct = useSelector((state: AppState) => state.product.product);
  const [errorMessage, setErrorMessage] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [templateProduct, setTemplateProduct] = useState(useSelector((state: AppState) => state.product.product));

  const fetchProduct = useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.productList, 'get'));

    setLoading(false);
    if (json) {
      dispatch(setProductData(json.data));

      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
  }, [dispatch]);

  useEffect(() => {
    async function fetchProductCategory() {
      const dataCategory = 'https://api.gearfocus.div4.pgtest.co/api/categories/list';
      const resp = await fetch(dataCategory);
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
      setTemplateProduct(listProduct);
    }
  }, [listProduct, templateProduct]);

  return (
    <div style={{ padding: '36px 36px 12px', backgroundColor: '#1b1b38', width: '100vw' }}>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {loading === false && (
        <ProductsForm
          listProduct={listProduct}
          isLoading={loading}
          errorMessage={errorMessage}
          productCategory={productCategory}
        />
      )}
    </div>
  );
};

export default ProductsPage;
