import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Button } from '@mui/material';
import { EditorState } from 'draft-js';
import { useParams } from 'react-router';
import { Action } from 'typesafe-actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import Loading from '../../common/components/Loading';
import { fetchThunk } from '../../common/redux/thunk';
import { useFieldArray, useForm } from 'react-hook-form';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import { Shipping, CreateProduct, Images } from '../../../models/products';
import ShippingForm from '../components/AddProductForm/ShippingForm';
import MarketingForm from '../components/AddProductForm/MarketingForm';
import AddProductForm from '../components/AddProductForm/AddProductForm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PriceInventoryForm from '../components/AddProductForm/PriceInventoryForm';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { getErrorMessageResponse } from '../../../utils';
import { setSnackbar } from '../../common/redux/snackbarReducer';

interface Props {
  isSidebarOpen: any;
}

const ProductDetailPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const { id } = useParams() as {
    id: string;
  };
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataDetail, setDataDetail] = useState<CreateProduct>();
  const dataField = useSelector((state: AppState) => state.navbar.data);

  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);
  const [isOpenAddFile, setOpenAddFile] = useState(false);
  const [removeItemIndex, setRemoveItemIndex] = useState<number[]>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleChangeSubTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedSubTab(newValue);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateProduct>({
    mode: 'onChange',
    defaultValues: dataDetail,
  });
  const { fields, append, remove } = useFieldArray({ name: 'shipping', control });

  const fetchDetail = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(fetchThunk(API_PATHS.productDetail, 'post', { id: id }));

    setLoading(false);

    if (resp && resp.success && dataField) {
      const contentState = EditorState.createEmpty();
      const description = EditorState.push(
        contentState,
        convertFromHTML(resp.data.description) as any,
        'change-block-data',
      );

      const time = dayjs(resp.data.arrival_date * 1000).format('YYYY-MM-DD');

      setDataDetail({
        ...resp.data,
        description: description,
        arrival_date: time,
        shipping: resp.data.shipping,
      });

      return;
    }
    getErrorMessageResponse(resp);

    return;
  }, [dispatch, id, dataField]);

  const handleAddShippingLocation = useCallback(
    (obj: Shipping) => {
      append(obj);
      return;
    },
    [append],
  );

  const handleRemoveShippingLocation = useCallback(
    (index: number) => {
      remove(index);
      return;
    },
    [remove],
  );

  const combineImageOrder = (imagesApi?: Images[], removeIndex?: number[], imagesUpload?: File[]) => {
    if (imagesApi && removeIndex) {
      const newImgApi = imagesApi.filter((item) => {
        return !removeIndex.includes(+item.id);
      });

      let newData = newImgApi.map((item) => item.file);
      if (imagesUpload && imagesUpload.length > 0) {
        newData = newData.concat(imagesUpload.map((item: any) => item[0].name));
      }
      return newData;
    } else {
      return [];
    }
  };

  const handleRemoveImg = useCallback((id: number) => {
    setRemoveItemIndex((prev) => [...prev, id]);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateProduct) => {
      const newData = {
        ...data,
        description: convertToHTML(data.description.getCurrentContent()),
        imagesOrder: combineImageOrder(dataDetail?.images, removeItemIndex, data.imagesUpload),
        remove_images: removeItemIndex,
      };

      const body = { productDetail: [newData] };
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };

      const json = await axios.post(API_PATHS.createProduct, body, config);
      if (json) {
        dispatch(setSnackbar({ open: true, message: 'Update successfully', color: 'success' }));
        return;
      }

      getErrorMessageResponse(json);
      dispatch(setSnackbar({ open: true, message: getErrorMessageResponse(json), color: 'error' }));
      return;
    },
    [dataDetail?.images, dispatch, removeItemIndex],
  );

  useEffect(() => {
    if (dataField) {
      fetchDetail();
    }
  }, [fetchDetail, dataField]);

  useEffect(() => {
    if (dataDetail) {
      reset(dataDetail);
    }
  }, [dataDetail, reset]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <title>
        <FormattedMessage id="updateProduct" />
      </title>
      <div
        style={{
          padding: '100px 36px 120px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <div className="add-header-title" style={{ marginBottom: 0 }}>
          <Button
            className="add-header-redirect"
            onClick={() => {
              history.push('/products');
            }}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '16px', color: '#000' }} />
          </Button>
          <div style={{ fontSize: '26px', color: '#fff' }}>{dataDetail?.name}</div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="detail-tab-btn">
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { backgroundColor: 'var(--buttonColor)', height: '3px' } }}
          >
            <Tab label="Info" />
            <Tab label="Attachments" />
          </Tabs>
        </Box>
        {selectedTab === 0 && (
          <div style={{ padding: '16px', width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
              <AddProductForm
                rest={{ data: dataField, control: control, errors: errors, dataDetail: dataDetail }}
                handleRemoveImg={handleRemoveImg}
              />
              <div className="separated-space"></div>
              <PriceInventoryForm data={dataField} control={control} errors={errors} dataDetail={dataDetail} />
              <div className="separated-space"></div>
              <ShippingForm
                rest={{ data: dataField, control: control, errors: errors, dataDetail: dataDetail }}
                fields={fields}
                handleAddShippingLocation={handleAddShippingLocation}
                handleRemoveShippingLocation={handleRemoveShippingLocation}
              />
              <div className="separated-space"></div>
              <MarketingForm data={dataField} control={control} errors={errors} />
              <div
                style={{ height: '78px', alignItems: 'center' }}
                className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
              >
                <div className="footer-bar-content" style={{ margin: '10px 0 0' }}>
                  <Button variant="text" className="footer-btn footer-btn-add" disabled={!isValid} type="submit">
                    Update Product
                  </Button>
                  <Link
                    to={`${ROUTES.detailProduct}/${dataDetail?.id}`}
                    target="_blank"
                    style={{ marginLeft: '20px', color: '#007bff' }}
                  >
                    http://localhost:3000{ROUTES.detailProduct}/{dataDetail?.id}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
        <Box style={{ padding: '32px 0 ' }}>
          {selectedTab === 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="detail-sub-tab-btn">
              <Tabs
                value={selectedSubTab}
                onChange={handleChangeSubTab}
                aria-label="basic tabs example"
                TabIndicatorProps={{
                  style: {
                    borderBottom: '1px solid hsla(0,0%,100%,.2)',
                    borderLeft: '1px solid hsla(0,0%,100%,.2)',
                    background: '#1b1b38 none',
                    position: 'absolute',
                    width: '18px',
                    height: '18px',
                    bottom: '-9px',
                    margin: '0 40px',
                    transform: 'rotate(135deg)',
                  },
                }}
              >
                <Tab label="Attachments" />
                <Tab
                  label="History of downloads"
                  style={{ textDecoration: 'underline' }}
                  className="detail-sub-tab-second-button"
                />
              </Tabs>
            </Box>
          )}
          {selectedTab === 1 && selectedSubTab === 0 && (
            <form>
              <div style={{ marginTop: '24px', position: 'relative' }}>
                <Button
                  className="btn-table-common"
                  style={{ minHeight: '36.5px', minWidth: '96px' }}
                  onClick={() => setOpenAddFile(!isOpenAddFile)}
                >
                  Add file
                </Button>
                {isOpenAddFile && (
                  <Button
                    variant="contained"
                    component="label"
                    style={{ position: 'absolute', left: '8px', bottom: '-40px', background: '#fff', color: '#154bab' }}
                    className="add-file-sub-btn"
                    onClick={() => {
                      setOpenAddFile(false);
                    }}
                  >
                    <DesktopWindowsOutlinedIcon />
                    From local computer
                    <input type="file" hidden />
                  </Button>
                )}
              </div>
              <div
                style={{ height: '78px', alignItems: 'center', position: 'static', width: '100%', marginTop: '40px' }}
                className="footer-bar-fixed"
              >
                <div className="footer-bar-content" style={{ margin: '10px 0 0' }}>
                  <Button variant="text" className="footer-btn footer-btn-add" disabled={!isValid} type="submit">
                    Save Change
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Box>
      </div>
    </>
  );
};

export default ProductDetailPage;
