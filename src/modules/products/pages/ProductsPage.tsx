import React, { useCallback, useEffect, useState } from 'react';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { getErrorMessageResponse } from '../../../utils';
import ProductsForm from '../components/ProductsForm/ProductsForm';
import { IProducts, IProductsFilter, ProductItemWithUpdateButton } from '../../../models/products';
import BottomBar from '../components/ProductsForm/BottomBar';

interface Props {
  isSidebarOpen: boolean;
}

export type Order = 'asc' | 'desc';

interface sort {
  order_by: string;
  sort: Order;
}

const ProductsPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState<IProducts[]>();
  const [filterValue, setFilterValue] = useState<IProductsFilter>({
    search: '',
    category: '0',
    stock_status: 'all',
    availability: 'all',
    vendor: '',
    search_type: '',
  });
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    count: 25,
  });
  const [totalItem, setTotalItem] = useState(0);
  const [itemChange, setItemChange] = useState<ProductItemWithUpdateButton[]>([]);
  const [selectItem, setSelectItem] = useState<IProducts[]>();
  const [deleteItem, setDeleteItem] = useState<object[]>([]);
  const [buttonBottomBar, setButtonBottomBar] = useState({
    disable: true,
    delete: false,
    text: 'Save Change',
    title: 'Confirm Update',
    subTitle: 'Do you want to update this product?',
  });
  const [sortField, setSortField] = useState<sort>({
    order_by: 'name',
    sort: 'asc',
  });

  const handleFilter = useCallback((data: IProductsFilter) => {
    setFilterValue(data);
  }, []);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.productList, 'post', {
        ...filterValue,
        ...pageInfo,
        sort: sortField.order_by.toLowerCase(),
        order_by: sortField.sort.toUpperCase(),
      }),
    );
    setLoading(false);

    if (resp.data) {
      setProduct(
        resp.data.map((item: IProducts) => {
          return { ...item, checked: false, delete: false };
        }),
      );
      setTotalItem(resp.recordsFiltered);
      return;
    }
    setErrorMessage(getErrorMessageResponse(resp));
    setProduct([]);

    return;
  }, [dispatch, filterValue, pageInfo, sortField]);

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      setPageInfo({ ...pageInfo, page: num });
    },
    [pageInfo],
  );

  const handleChangItemPerPage = useCallback(
    (num: number) => {
      setPageInfo({ ...pageInfo, count: num });
    },
    [pageInfo],
  );

  const handleChangeValue = useCallback(
    (data: ProductItemWithUpdateButton, index: number) => {
      if (product) {
        const newData = [...product];
        const cloneItem = { ...newData[index], price: data.price, amount: data.amount };
        newData[index] = cloneItem;
        setItemChange((prev) => [...prev, data]);
        setProduct(newData);
        return;
      }
      return;
    },
    [product],
  );

  const handleChooseToDelete = useCallback((id: string) => {
    setProduct((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, delete: !item.delete };
        }
        return item;
      });
    });
  }, []);

  const handleSort = (name: string) => {
    const isAsc = sortField.order_by === name && sortField.sort === 'asc';
    setSortField({ sort: isAsc ? 'desc' : 'asc', order_by: name });
  };

  const handleSelectAll = useCallback((check: boolean) => {
    setProduct((prev) => {
      return prev?.map((item) => {
        return { ...item, checked: check };
      });
    });
  }, []);

  const handleSelectSingle = useCallback((id: string) => {
    setProduct((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  }, []);

  const handleSaveChange = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.updateProduct, 'post', {
        params: itemChange,
      }),
    );
    setLoading(false);
    console.log(resp);
    return;
  }, [dispatch, itemChange]);

  const handleRemoveProduct = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.updateProduct, 'post', {
        params: deleteItem,
      }),
    );
    setLoading(false);
    setProduct((prev) => prev?.filter((item) => item.delete === false));
    setTotalItem((prev) => prev - deleteItem.length);
    setErrorMessage(getErrorMessageResponse(resp));
    return;
  }, [dispatch, deleteItem]);

  const handleClickToUpdate = useCallback(
    async (id: string, enabled: boolean) => {
      setLoading(true);
      const isEnabled = enabled ? 1 : 0;
      const resp = await dispatch(
        fetchThunk(API_PATHS.updateProduct, 'post', {
          params: [{ id: id, enable: isEnabled }],
        }),
      );
      setLoading(false);
      if (resp.success) {
        setProduct((prev) => {
          if (prev) {
            const index = prev?.findIndex((item) => item.id == id);
            const newData = [...prev];
            newData[index] = { ...newData[index], enabled: isEnabled.toString() };
            return newData;
          }
        });
      }

      return;
    },
    [dispatch],
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (!product) {
      setProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const temp: object[] = [];
    product?.forEach((item) => {
      if (item.delete) {
        temp.push({ id: item.id, delete: 1 });
      }
    });
    if (temp && temp.length > 0) {
      setDeleteItem(temp);
    } else setDeleteItem([]);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const temp = product?.filter((item) => item.checked);

    if (temp && temp.length > 0) {
      setSelectItem(temp);
    } else setSelectItem([]);
  }, [product]);

  useEffect(() => {
    if (deleteItem.length === 1) {
      setButtonBottomBar({
        disable: false,
        delete: true,
        text: 'Remove selected',
        title: 'Confirm Delete',
        subTitle: 'Do you want to delete this product?',
      });
    } else if (deleteItem.length > 1) {
      setButtonBottomBar({
        disable: false,
        delete: true,
        text: 'Remove selected',
        title: 'Confirm Delete',
        subTitle: 'Do you want to delete these products?',
      });
    } else if (itemChange.length === 1) {
      setButtonBottomBar({
        disable: false,
        delete: false,
        text: 'Save Change',
        title: 'Confirm Update',
        subTitle: 'Do you want to update this product?',
      });
    } else if (itemChange.length > 1) {
      setButtonBottomBar({
        disable: false,
        delete: false,
        text: 'Save Change',
        title: 'Confirm Update',
        subTitle: 'Do you want to update these product?',
      });
    } else {
      setButtonBottomBar({
        disable: true,
        delete: false,
        text: 'Save Change',
        title: '',
        subTitle: '',
      });
    }
  }, [itemChange, deleteItem]);

  return (
    <>
      <title>
        <FormattedMessage id="product" />
      </title>
      <div
        style={{
          padding: '36px 36px 120px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <ProductsForm
          loading={loading}
          product={product}
          sortField={sortField}
          totalItem={totalItem}
          currentPage={pageInfo.page}
          errorMessage={errorMessage}
          itemPerPage={pageInfo.count}
          handleSort={handleSort}
          handleFilter={handleFilter}
          handleSelectAll={handleSelectAll}
          handleChangePage={handleChangePage}
          handleChangeValue={handleChangeValue}
          handleSelectSingle={handleSelectSingle}
          handleClickToUpdate={handleClickToUpdate}
          handleChooseToDelete={handleChooseToDelete}
          handleChangItemPerPage={handleChangItemPerPage}
        />
      </div>
      <BottomBar
        product={product}
        isSidebarOpen={isSidebarOpen}
        buttonBottomBar={buttonBottomBar}
        handleSaveChange={handleSaveChange}
        handleRemoveProduct={handleRemoveProduct}
        isSelected={!!(selectItem && selectItem.length > 0)}
        totalSelectedItem={selectItem?.length}
      />
    </>
  );
};

export default ProductsPage;
