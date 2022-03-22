import React from 'react';
import { visuallyHidden } from '@mui/utils';
import { IProducts } from '../../../../models/products';
import { TableCell, TableSortLabel, Box } from '@mui/material';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';
import { tableHeaderLabel } from '../../utils';

interface Props {
  rowCount: any;
  order_by: string;
  setOpacityAll: any;
  sort: 'asc' | 'desc';
  isOpacityAll: boolean;
  product?: IProducts[];
  handleSort(name: string): void;
  handleSelectAll(check: boolean): void;
}

const ProductLabel = (props: Props) => {
  const { order_by, sort, handleSelectAll, handleSort } = props;

  return (
    <>
      <TableCell width="60px">
        <MakeStylesCheckBox
          color="primary"
          onChange={(e, check) => handleSelectAll(check)}
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
          <TableCell key={item.name} align="left" sortDirection={order_by === item.name ? sort : false}>
            <TableSortLabel
              active={order_by === item.name}
              direction={order_by === item.name ? sort : 'asc'}
              onClick={() => handleSort(item.name)}
            >
              <span>{item.name}</span>
              {order_by === item.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {sort === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
