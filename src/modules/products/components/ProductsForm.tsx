import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ProductItems from './ProductItems';
import ProductLabel from './ProductLabel';
import FilterProduct from './FilterProduct';
import { IProducts, IProductsFilter } from '../../../models/products';
import { ICategory } from '../../../models/category';
import PaginationForm from '../../common/components/PaginationForm';
import SkeletonForm from './SkeletonForm';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import TableToolbar from '../../common/components/TableToolbar';
import BottomBar from '../../common/components/BottomBar';
import ModalDelete from '../../common/components/ModalDelete';

interface Props {
  errorMessage: string;
  templateProduct?: IProducts[];
  productCategory?: ICategory[];
  currentPage: number;
  itemPerPage: number;
  totalItem: number;
  loading: boolean;
  isSidebarOpen: boolean;
  handleFilter(data: IProductsFilter): void;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
  handleChangItemPerPage(num: number): void;
}

type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

const ProductsForm = (props: Props) => {
  const {
    productCategory,
    currentPage,
    itemPerPage,
    totalItem,
    templateProduct,
    loading,
    isSidebarOpen,
    handleChangePage,
    handleChangItemPerPage,
    handleFilter,
  } = props;
  const [isOpacityAll, setOpacityAll] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [deleteItem, setDeleteItem] = useState<readonly string[]>([]);
  const [orderBy, setOrderBy] = useState('');
  const [activeSaveButton, setActiveSaveButton] = useState(false);
  const [order, setOrder] = useState<Order>('asc');
  const [isOpenModal, setOpenModal] = useState(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = templateProduct?.map((item) => item.id);
      setSelected(newSelected ? newSelected : []);
      const newDeleteItem = templateProduct?.map((item) => item.id);
      setDeleteItem(newDeleteItem ? newDeleteItem : []);
      return;
    }
    setSelected([]);
  };

  const handleSelectSingle = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleChooseToDelete = (id: string) => {
    const deleteItemIndex = deleteItem.indexOf(id);
    let newDeleteItem: readonly string[] = [];

    if (deleteItemIndex === -1) {
      newDeleteItem = newDeleteItem.concat(deleteItem, id);
    } else if (deleteItemIndex === 0) {
      newDeleteItem = newDeleteItem.concat(deleteItem.slice(1));
    } else if (deleteItemIndex === deleteItem.length - 1) {
      newDeleteItem = newDeleteItem.concat(deleteItem.slice(0, -1));
    } else if (deleteItemIndex > 0) {
      newDeleteItem = newDeleteItem.concat(deleteItem.slice(0, deleteItemIndex), deleteItem.slice(deleteItemIndex + 1));
    }

    setDeleteItem(newDeleteItem);
  };

  const isDelete = (id: string) => deleteItem.indexOf(id) !== -1;

  // const handleSortByField = (name: string) => {
  //   const isAsc = fieldSort === name && orderSort === 'asc';
  //   setOrderSort(isAsc ? 'desc' : 'asc');
  //   setFieldSort(name);
  // };

  const handleRequestSort = (name: string) => {
    const isAsc = orderBy === name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(name);
  };

  return (
    <>
      <div
        style={{
          marginTop: 'var(--navHeight)',
          color: '#fff !important',
        }}
      >
        <title>
          <FormattedMessage id="product" />
        </title>
        <FilterProduct category={productCategory} handleFilter={handleFilter} />
        <Button className="btn-table-common" style={{ marginBottom: '24px' }}>
          Add Product
        </Button>
        {loading && <SkeletonForm itemPerPage={itemPerPage} />}
        {loading === false && (
          <>
            <div className="table-toolbar">
              <TableToolbar numSelected={selected.length} />
            </div>
            <TableContainer component={Paper} className="table-data" sx={{ tableLayout: 'auto' }}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow
                    sx={{
                      borderBottom: '1px solid black',
                    }}
                  >
                    <ProductLabel
                      productItem={templateProduct}
                      handleSelectAll={handleSelectAll}
                      order={order}
                      orderBy={orderBy}
                      handleRequestSort={handleRequestSort}
                      numSelected={selected.length}
                      isOpacityAll={isOpacityAll}
                      setOpacityAll={setOpacityAll}
                      rowCount={templateProduct?.length}
                      numbDelete={deleteItem.length}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templateProduct?.map((item, index) => {
                    const isItemSelected = isSelected(item.id);
                    const isItemDelete = isDelete(item.id);
                    const labelId = `table-checkbox-${index}`;
                    return (
                      <ProductItems
                        key={index}
                        product={item}
                        labelId={labelId}
                        numbDelete={deleteItem.length}
                        numSelected={selected.length}
                        isItemDelete={isItemDelete}
                        isItemSelected={isItemSelected}
                        isOpacityAll={isOpacityAll}
                        handleSelectSingle={handleSelectSingle}
                        handleChooseToDelete={handleChooseToDelete}
                        setActiveSaveButton={setActiveSaveButton}
                      />
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <PaginationForm
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      totalItem={totalItem}
                      handleChangePage={handleChangePage}
                      handleChangItemPerPage={handleChangItemPerPage}
                      colspan={9}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <BottomBar
              numSelected={selected.length}
              numbDelete={deleteItem.length}
              activeSaveButton={activeSaveButton}
              setOpenModal={setOpenModal}
              isSidebarOpen={isSidebarOpen}
            />
            <ModalDelete isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductsForm;
