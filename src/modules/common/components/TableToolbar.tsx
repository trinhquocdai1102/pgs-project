import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
  numSelected: number;
  numDelete: number;
}

const TableToolbar = (props: Props) => {
  const { numSelected } = props;

  return (
    <>
      {numSelected > 0 && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} items selected
          </Typography>
        </Toolbar>
      )}
    </>
  );
};

export default TableToolbar;
