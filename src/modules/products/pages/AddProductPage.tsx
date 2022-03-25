import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { convertToHTML } from 'draft-convert';
import { API_PATHS } from '../../../configs/api';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import Loading from '../../common/components/Loading';
import { fetchThunk } from '../../common/redux/thunk';
import { useFieldArray, useForm } from 'react-hook-form';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import ShippingForm from '../components/AddProductForm/ShippingForm';
import MarketingForm from '../components/AddProductForm/MarketingForm';
import AddProductForm from '../components/AddProductForm/AddProductForm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PriceInventoryForm from '../components/AddProductForm/PriceInventoryForm';
import { Vendor, Category, Brand, Condition, Shipping, CreateProduct } from '../../../models/products';
import { setSnackbar } from '../../common/redux/snackbarReducer';
import { getErrorMessageResponse } from '../../../utils';

export interface field {
  vendor?: Vendor[];
  category?: Category[];
  brand?: Brand[];
  condition?: Condition[];
  shipping?: Shipping[];
}

interface Props {
  isSidebarOpen: any;
}

const AddProductPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateProduct>({
    mode: 'onChange',
    defaultValues: {
      shipping: [
        {
          id: '1',
          zone_name: 'Continental U.S.',
          price: '0.00',
        },
      ],
      shipping_to_zones: [
        {
          id: '1',
          zone_name: 'Continental U.S.',
          price: '0.00',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ name: 'shipping', control });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<field>();

  const onSubmit = async (data: CreateProduct) => {
    const body = {
      ...data,
      description: convertToHTML(data.description.getCurrentContent()),
      vendor_id: data.vendor_id.id,
      brand_id: data.brand_id.id,
      imagesOrder: data?.imagesUpload?.map((item: any) => item[0].name),
      shipping_to_zones: data.shipping.map((item: any) => ({ id: item.id, price: item.price })),
    };

    console.log(body);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    };

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(body));

    const json = await axios.post(API_PATHS.createProduct, formData, config);

    if (json) {
      if (body.imagesUpload.length > 0) {
        const temp = body.imagesUpload.map((item: any, index: number) => {
          const formData = new FormData();
          formData.append('productId', json.data.data);
          formData.append('order', JSON.stringify(index));
          formData.append('images[]', item[0]);
          return formData;
        });

        const result = await Promise.all(
          temp.map((item: any) => axios.post(API_PATHS.uploadProductImage, item, config)),
        );
        console.log(result);
      }

      setLoading(false);
      dispatch(replace(`${ROUTES.detailProduct}/${json.data.data}`));
      dispatch(setSnackbar({ open: true, message: 'Create product success', color: 'success' }));
      return;
    }

    getErrorMessageResponse(json);
    dispatch(setSnackbar({ open: true, message: getErrorMessageResponse(json), color: 'error' }));
    return;
  };

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    const dataList: { [key: string]: { url: string } } = {
      vendor: {
        url: API_PATHS.vendorList,
      },
      brand: {
        url: API_PATHS.brandList,
      },
      category: {
        url: API_PATHS.categoryList,
      },
      condition: {
        url: API_PATHS.conditionList,
      },
      shipping: {
        url: API_PATHS.shipping,
      },
    };

    const promise = await Promise.all(
      Object.keys(dataList)?.map((item) => {
        return dispatch(fetchThunk(dataList[item].url, 'get'));
      }),
    );
    setLoading(false);

    const data = promise.reduce((result, cur, index) => {
      result[Object.keys(dataList)[index]] = cur.data?.map((item: any) => ({
        ...item,
      }));
      return result;
    }, {} as any);

    setData(data);
  }, [dispatch]);

  const handleAddShippingLocation = useCallback(
    (obj: Shipping) => {
      append(obj);
      return;
    },
    [append],
  );

  const handleRemoveShippingLocation = useCallback(
    (id: number) => {
      remove(id);
      return;
    },
    [remove],
  );

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <title>
        <FormattedMessage id="addProduct" />
      </title>
      <div
        style={{
          padding: '100px 36px 120px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <div className="add-header-title">
          <Button
            className="add-header-redirect"
            onClick={() => {
              history.push('/products');
            }}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '16px', color: '#000' }} />
          </Button>
          <div style={{ fontSize: '32px', color: '#fff' }}>Add Product</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
          <AddProductForm rest={{ data: data, control: control, errors: errors }} />
          <div className="separated-space"></div>
          <PriceInventoryForm data={data} control={control} errors={errors} />
          <div className="separated-space"></div>
          <ShippingForm
            fields={fields}
            rest={{ data: data, control: control, errors: errors }}
            handleAddShippingLocation={handleAddShippingLocation}
            handleRemoveShippingLocation={handleRemoveShippingLocation}
          />
          <div className="separated-space"></div>
          <MarketingForm data={data} control={control} errors={errors} />
          <div
            style={{ height: '78px', alignItems: 'center' }}
            className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
          >
            <div className="footer-bar-content" style={{ margin: '10px 0 0' }}>
              <Button variant="text" className="footer-btn footer-btn-add" disabled={!isValid} type="submit">
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
