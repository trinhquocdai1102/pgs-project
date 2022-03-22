import React, { useMemo } from 'react';
import { FormControl, MenuItem, Pagination, Select, TableCell, Typography } from '@mui/material';

interface Props {
  colspan: number;
  totalItem: number;
  currentPage: number;
  itemPerPage: number;
  handleChangItemPerPage(num: number): void;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
}

const PaginationForm = (props: Props) => {
  const { colspan, currentPage, itemPerPage, totalItem, handleChangePage, handleChangItemPerPage } = props;
  const optionItemPerPage = [10, 25, 50, 75, 100];
  const lastPage = useMemo(() => {
    return Math.ceil(totalItem / itemPerPage);
  }, [totalItem, itemPerPage]);

  return (
    <TableCell colSpan={colspan}>
      <div className="pagination-container">
        <div>
          <Pagination
            count={lastPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
        <div style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ margin: 'auto' }}>{totalItem} items</Typography>
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              display: 'flex',
              alignItems: 'center',
              width: '60px',
              marginLeft: '-20px !important',
            }}
          >
            <Select
              labelId="pagination-select-helper-label"
              className="pagination-select"
              value={itemPerPage}
              label="itemPerPage"
              color="secondary"
              sx={{ height: '80%', width: '60px', color: '#fff', fontSize: '16px', overflow: 'visible' }}
              onChange={(e) => handleChangItemPerPage(+e.target.value)}
            >
              {optionItemPerPage.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div style={{ fontSize: '15px', marginLeft: '-12px' }}>per page</div>
        </div>
      </div>
    </TableCell>
  );
};

export default PaginationForm;
