import React from 'react';
import { IProducts } from '../../../models/products';
import { TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { MakeStylesCheckBox } from '../../common/components/MakeStylesMUI';

interface Props {
  productItem?: IProducts[];
  orderBy: string;
  order: 'asc' | 'desc';
  rowCount: any;
  numSelected: number;
  numbDelete: number;
  isOpacityAll: boolean;
  setOpacityAll: any;
  handleSelectAll(event: React.ChangeEvent<HTMLInputElement>): void;
  handleRequestSort(name: string): void;
}

const ProductLabel = (props: Props) => {
  const { orderBy, order, numSelected, rowCount, handleRequestSort, handleSelectAll } = props;

  const tableHeaderLabel = [
    {
      name: 'SKU',
      canSort: true,
    },
    {
      name: 'Name',
      canSort: true,
    },
    {
      name: 'Category',
      canSort: false,
    },
    {
      name: 'Price',
      canSort: true,
    },
    {
      name: 'In stock',
      canSort: true,
    },
    {
      name: 'Vendor',
      canSort: true,
    },
    {
      name: 'Arrival Date',
      canSort: true,
    },
  ];
  return (
    <>
      <TableCell width="60px">
        <MakeStylesCheckBox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={(event) => {
            handleSelectAll(event);
          }}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      </TableCell>
      {tableHeaderLabel.map((item) => {
        if (!item.canSort)
          return (
            <TableCell key={item.name} align="left">
              <span>{item.name}</span>
            </TableCell>
          );
        return (
          <TableCell key={item.name} align="left" sortDirection={orderBy === item.name ? order : false}>
            <TableSortLabel
              active={orderBy === item.name}
              direction={orderBy === item.name ? order : 'asc'}
              onClick={() => handleRequestSort(item.name)}
            >
              <span>{item.name}</span>
              {orderBy === item.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        );
      })}
      <TableCell align="left"></TableCell>
    </>
  );
};

export default ProductLabel;
