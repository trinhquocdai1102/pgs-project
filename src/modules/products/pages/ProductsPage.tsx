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
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listProduct = useSelector((state: AppState) => state.product.product);
  const [errorMessage, setErrorMessage] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [templateProduct, setTemplateProduct] = useState(useSelector((state: AppState) => state.product.product));

  const fetchProduct = useCallback(async () => {
    setErrorMessage('');

    const json = await dispatch(fetchThunk(API_PATHS.productList, 'get'));
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
    <div
      style={{
        padding: '36px 36px 100px',
        width: '100vw',
        backgroundColor: '#1b1b38',
        height: '100%',
        transition: '0.5s',
      }}
    >
      <ProductsForm listProduct={listProduct} errorMessage={errorMessage} productCategory={productCategory} />
    </div>
  );
};

export default ProductsPage;
