import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { getErrorMessageResponse } from '../../../utils';
import UsersForm from '../components/UsersForm/UsersForm';
import BottomBar from '../components/UsersForm/BottomBar';
import { IUserProfile, IUserProfileFilter } from '../../../models/userProfile';
import { setSnackbar } from '../../common/redux/snackbarReducer';

interface Props {
  isSidebarOpen: boolean;
}

export type Order = 'asc' | 'desc';

interface sort {
  order_by: string;
  sort: Order;
}

const UsersPage = (props: Props) => {
  const { isSidebarOpen } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUserProfile[]>();
  const [filter, setFilter] = useState<IUserProfileFilter>();
  const [errorMessage, setErrorMessage] = useState('');
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    count: 25,
  });
  const [totalItem, setTotalItem] = useState(0);
  const [deleteItem, setDeleteItem] = useState<object[]>([]);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [buttonBottomBar, setButtonBottomBar] = useState({
    disable: true,
    delete: false,
    text: 'Remove selected',
    title: '',
    subTitle: '',
  });
  const [sortField, setSortField] = useState<sort>({
    order_by: 'name',
    sort: 'asc',
  });

  const handleFilter = useCallback((data: IUserProfileFilter) => {
    const newData = {
      ...data,
      country: data.country ?? '',
      state: data.state ?? '',
      phone: data.phone ?? '',
      address: data.address ?? '',
    };
    setFilter(newData);
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const temp = filter?.date_range?.map((item) => dayjs(item).format('YYYY-MM-DD'));
    const newData = {
      ...filter,
      status: filter?.status ? [filter?.status] : [],
      date_range: temp ? temp : [],
    };

    const resp = await dispatch(
      fetchThunk(API_PATHS.userList, 'post', {
        ...pageInfo,
        ...newData,
        sortBy: sortField.order_by == 'Name' ? 'fistName' : 'vendor',
        order: sortField.sort.toUpperCase(),
      }),
    );

    setLoading(false);
    if (resp.success) {
      setTotalItem(+resp.recordsFiltered);
      setUsers(
        resp.data.map((item: IUserProfile) => {
          return { ...item, delete: false };
        }),
      );
      return;
    }

    setErrorMessage(getErrorMessageResponse(resp));
    return;
  }, [dispatch, pageInfo, filter, sortField]);

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

  const handleChooseToDelete = useCallback((id: string) => {
    setUsers((prev) => {
      return prev?.map((item) => {
        if (item.profile_id === id) {
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
    setUsers((prev) => {
      return prev?.map((item) => {
        return { ...item, delete: check };
      });
    });
  }, []);

  const handleRemoveUser = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(
      fetchThunk(API_PATHS.updateUser, 'post', {
        params: deleteItem,
      }),
    );

    setLoading(false);

    setUsers((prev) => prev?.filter((item) => item.delete === false));
    setTotalItem((prev) => prev - deleteItem.length);
    console.log(resp);
    dispatch(setSnackbar({ open: true, message: messageSnackbar, color: 'error' }));
    return;
  }, [dispatch, deleteItem, messageSnackbar]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!users) {
      setUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (!users) return;
    const temp: object[] = [];
    users?.forEach((item) => {
      if (item.delete) {
        temp.push({ id: item.profile_id, delete: 1 });
      }
    });
    if (temp && temp.length > 0) {
      setDeleteItem(temp);
    } else setDeleteItem([]);
  }, [users]);

  useEffect(() => {
    if (deleteItem.length === 1) {
      setMessageSnackbar(`${deleteItem.length} item has been deleted`);
      setButtonBottomBar({
        disable: false,
        delete: true,
        text: 'Remove selected',
        title: 'Confirm Delete',
        subTitle: 'Do you want to delete this user?',
      });
    } else if (deleteItem.length > 1) {
      setMessageSnackbar(`${deleteItem.length} items has been deleted`);
      setButtonBottomBar({
        disable: false,
        delete: true,
        text: 'Remove selected',
        title: 'Confirm Delete',
        subTitle: 'Do you want to delete these users?',
      });
    } else {
      setMessageSnackbar(`${deleteItem.length} items has been deleted`);
      setButtonBottomBar({
        disable: true,
        delete: false,
        text: 'Remove selected',
        title: '',
        subTitle: '',
      });
    }
  }, [deleteItem]);

  return (
    <>
      <title>
        <FormattedMessage id="user" />
      </title>
      <div
        style={{
          padding: '36px 36px 120px',
          width: '100vw',
          backgroundColor: '#1b1b38',
          transition: '0.5s',
        }}
      >
        <UsersForm
          users={users}
          loading={loading}
          sortField={sortField}
          totalItem={totalItem}
          currentPage={pageInfo.page}
          errorMessage={errorMessage}
          itemPerPage={pageInfo.count}
          handleSort={handleSort}
          handleFilter={handleFilter}
          isSidebarOpen={isSidebarOpen}
          handleSelectAll={handleSelectAll}
          handleChangePage={handleChangePage}
          handleChooseToDelete={handleChooseToDelete}
          handleChangItemPerPage={handleChangItemPerPage}
        />
      </div>
      <BottomBar isSidebarOpen={isSidebarOpen} buttonBottomBar={buttonBottomBar} handleRemoveUser={handleRemoveUser} />
    </>
  );
};

export default UsersPage;
