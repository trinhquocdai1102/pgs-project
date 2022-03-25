import React, { memo, useState } from 'react';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import ProductItems from './ProductItems';
import ProductLabel from './ProductLabel';
import SkeletonForm from './SkeletonForm';
import FilterProduct from './FilterProduct';
import { TableFooter } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useHistory } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Order } from '../../pages/ProductsPage';
import { ROUTES } from '../../../../configs/routes';
import TableContainer from '@mui/material/TableContainer';
import PaginationForm from '../../../common/components/PaginationForm';
import { IProducts, IProductsFilter } from '../../../../models/products';

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
  product?: IProducts[];
  handleSort(name: string): void;
  handleSelectSingle(id: string): void;
  handleSelectAll(check: boolean): void;
  handleChooseToDelete(id: string): void;
  handleFilter(data: IProductsFilter): void;
  handleChangItemPerPage(num: number): void;
  handleClickToUpdate(id: string, enable: boolean): void;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
  handleChangeValue(data: { price: string; stock: string; id: string }, index: number): void;
}

const ProductsForm = (props: Props) => {
  const {
    sortField,
    loading,
    currentPage,
    itemPerPage,
    totalItem,
    product,
    handleSort,
    handleFilter,
    handleSelectAll,
    handleChangePage,
    handleChangeValue,
    handleSelectSingle,
    handleClickToUpdate,
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
        <FilterProduct handleFilter={handleFilter} />
        <Button
          onClick={() => {
            const path = ROUTES.addProduct;
            history.push(path);
          }}
          className="btn-table-common"
          style={{ marginBottom: '24px' }}
        >
          Add Product
        </Button>
        {loading && <SkeletonForm itemPerPage={itemPerPage} />}
        {loading === false && (
          <>
            <TableContainer component={Paper} className="table-data" sx={{ tableLayout: 'auto' }}>
              <Table aria-label="table">
                <TableHead style={{ height: '50px' }}>
                  <TableRow
                    sx={{
                      borderBottom: '1px solid black',
                    }}
                  >
                    <ProductLabel
                      product={product}
                      sort={sortField.sort}
                      rowCount={product?.length}
                      isOpacityAll={isOpacityAll}
                      order_by={sortField.order_by}
                      handleSort={handleSort}
                      setOpacityAll={setOpacityAll}
                      handleSelectAll={handleSelectAll}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product?.map((item, index) => {
                    const labelId = `table-checkbox-${index}`;
                    return (
                      <ProductItems
                        key={index}
                        index={index}
                        product={item}
                        labelId={labelId}
                        isOpacityAll={isOpacityAll}
                        handleChangeValue={handleChangeValue}
                        handleSelectSingle={handleSelectSingle}
                        handleClickToUpdate={handleClickToUpdate}
                        handleChooseToDelete={handleChooseToDelete}
                      />
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <PaginationForm
                      colspan={9}
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      totalItem={totalItem}
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

export default memo(ProductsForm);
