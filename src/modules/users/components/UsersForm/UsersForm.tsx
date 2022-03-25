import React, { useState } from 'react';
import UserItems from './UserItems';
import UserLabel from './UserLabel';
import FilterUser from './FilterUser';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import SkeletonForm from './SkeletonForm';
import { TableFooter } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useHistory } from 'react-router-dom';
import { Order } from '../../pages/UsersPage';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { ROUTES } from '../../../../configs/routes';
import TableContainer from '@mui/material/TableContainer';
import PaginationForm from '../../../common/components/PaginationForm';
import { IUserProfile, IUserProfileFilter } from '../../../../models/userProfile';

interface Props {
  sortField: {
    order_by: string;
    sort: Order;
  };
  loading: boolean;
  totalItem: number;
  currentPage: number;
  itemPerPage: number;
  errorMessage: string;
  users?: IUserProfile[];
  isSidebarOpen: boolean;
  handleSort(name: string): void;
  handleSelectAll(check: boolean): void;
  handleChooseToDelete(id: string): void;
  handleChangItemPerPage(num: number): void;
  handleFilter(data: IUserProfileFilter): void;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
}

const UsersForm = (props: Props) => {
  const {
    users,
    loading,
    sortField,
    totalItem,
    currentPage,
    itemPerPage,
    handleSort,
    handleFilter,
    isSidebarOpen,
    handleSelectAll,
    handleChangePage,
    handleChooseToDelete,
    handleChangItemPerPage,
  } = props;
  const history = useHistory();
  const [isOpacityAll, setOpacityAll] = useState(false);

  return (
    <>
      <div
        style={{
          marginTop: 'var(--navHeight)',
          color: '#fff !important',
        }}
      >
        <FilterUser handleFilter={handleFilter} />
        <Button
          onClick={() => {
            const path = ROUTES.addUser;
            history.push(path);
          }}
          className="btn-table-common"
          style={{ marginBottom: '24px' }}
        >
          Add User
        </Button>
        {loading && <SkeletonForm itemPerPage={itemPerPage} />}
        {loading === false && (
          <>
            <TableContainer component={Paper} className="table-data" sx={{ tableLayout: 'auto' }}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow
                    sx={{
                      borderBottom: '1px solid black',
                    }}
                  >
                    <UserLabel
                      users={users}
                      sort={sortField.sort}
                      rowCount={users?.length}
                      isOpacityAll={isOpacityAll}
                      order_by={sortField.order_by}
                      handleSort={handleSort}
                      setOpacityAll={setOpacityAll}
                      isSidebarOpen={isSidebarOpen}
                      handleSelectAll={handleSelectAll}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((item, index) => {
                    const labelId = `table-checkbox-${index}`;
                    return (
                      <UserItems
                        key={index}
                        users={item}
                        labelId={labelId}
                        isOpacityAll={isOpacityAll}
                        isSidebarOpen={isSidebarOpen}
                        handleChooseToDelete={handleChooseToDelete}
                      />
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <PaginationForm
                      colspan={10}
                      totalItem={totalItem}
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      handleChangePage={handleChangePage}
                      handleChangItemPerPage={handleChangItemPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
};

export default UsersForm;
