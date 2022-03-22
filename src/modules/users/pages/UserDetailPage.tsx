import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { getErrorMessageResponse } from '../../../utils';
import { CreateUser } from '../../../models/userProfile';
import TaxInfoForm from '../components/AddUsersForm/TaxInfoForm';
import AccessInfoForm from '../components/AddUsersForm/AccessInfoForm';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import EmailPasswordForm from '../components/AddUsersForm/EmailPasswordForm';
import { setSnackbar } from '../../common/redux/snackbarReducer';
import AccountDetailForm from '../components/UserDetailForm/AccountDetailForm';
import Loading from '../../common/components/Loading';

interface Props {
  isSidebarOpen: boolean;
}

const UserDetailPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const history = useHistory();
  const { id } = useParams() as {
    id: string;
  };
  const [dataDetail, setDataDetail] = useState<CreateUser>();
  const [loading, setLoading] = useState(false);
  // const [selectedTab, setSelectedTab] = useState(0);
  // const [selectedSubTab, setSelectedSubTab] = useState(0);
  // const [isOpenAddFile, setOpenAddFile] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUser>({
    mode: 'onChange',
  });

  const fetchDetail = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(fetchThunk(API_PATHS.userDetail, 'post', { id: id }));
    if (resp && resp.success) {
      setDataDetail({
        ...resp.data.info,
      });
    }
    setLoading(false);

    console.log({ ...resp.data.info });
  }, [dispatch, id]);

  const onSubmit = async (data: CreateUser) => {
    const body = { params: [data] };
    const resp = await dispatch(fetchThunk(API_PATHS.updateUser, 'post', body));

    if (resp.success) {
      dispatch(setSnackbar({ open: true, message: 'Update user success', color: 'success' }));

      return;
    }

    getErrorMessageResponse(resp);

    dispatch(setSnackbar({ open: true, message: getErrorMessageResponse(resp), color: 'error' }));
    return;
  };

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

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
        <FormattedMessage id="editUser" />
      </title>
      <div
        style={{
          padding: '100px 36px 80px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <div className="add-header-title" style={{ marginBottom: '0' }}>
          <Button
            className="add-header-redirect"
            onClick={() => {
              history.push('/users');
            }}
          >
            <ArrowBackOutlinedIcon style={{ fontSize: '16px', color: '#000' }} />
          </Button>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff' }}>{dataDetail?.email}</div>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
          <AccountDetailForm dataDetail={dataDetail} />
          <div className="separated-space"></div>
          <EmailPasswordForm
            dataDetail={dataDetail}
            watch={watch}
            addUserProps={{ control: control, errors: errors }}
          />
          <div className="separated-space"></div>
          <AccessInfoForm dataDetail={dataDetail} addUserProps={{ control: control, errors: errors }} />
          <div className="separated-space"></div>
          <TaxInfoForm dataDetail={dataDetail} addUserProps={{ control: control, errors: errors }} />
          <div
            style={{ height: '78px', alignItems: 'center' }}
            className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
          >
            <div className="footer-bar-content" style={{ margin: '10px 0 0' }}>
              <Button variant="text" className="footer-btn footer-btn-add" disabled={!isValid} type="submit">
                Update user
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserDetailPage;
