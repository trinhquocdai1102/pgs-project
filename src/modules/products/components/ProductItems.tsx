import React from 'react';
import { IProducts } from '../../../models/products';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

interface Props {
  product?: IProducts[];
}

const ProductItems = (props: Props) => {
  const { product } = props;
  // const name = product?.map((item, index) => {
  //   return (
  //     <Link key={index} to="/a">
  //       {item.name}
  //     </Link>
  //   );
  // });

  const columns = [
    {
      field: 'update',
      headerName: '',
      width: 40,
      renderCell: () => (
        <button
          style={{
            background: 'transparent',
            outline: 'none',
            border: 'none',
          }}
        >
          <PowerSettingsNewOutlinedIcon
            style={{
              fontSize: '20px',
              color: '#72b25b',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </button>
      ),
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 140,
    },
    {
      field: 'name',
      headerName: 'Name',
      // renderCell: () => <Link to="/a">{product?.name}</Link>,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'In stock',
      width: 120,
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
    },
    {
      field: 'arrivalDate',
      headerName: 'Arrival Date',
      width: 140,
    },
    {
      field: 'delete',
      headerName: '',
      width: 80,
      renderCell: () => {
        return (
          <div
            style={{
              position: 'absolute',
              right: '20px',
              borderLeft: '1px dashed #bbb',
              padding: '0 0 0 20px',
            }}
          >
            <button
              className="btn"
              style={{
                background: '#b18aff',
                display: 'flex',
                width: '36px',
                height: '36px',
                justifyContent: 'center',
                borderLeft: '1px dashed #bbb',
                borderRadius: '4px',
              }}
            >
              <DeleteIcon style={{ fontSize: '24px', color: '#fff' }} />
            </button>
          </div>
        );
      },
      flex: 1,
    },
  ];

  return (
    <div className="table-data">
      <DataGrid
        style={{ position: 'relative', fontSize: '14px', color: '#fff', padding: '0 4px' }}
        rows={product ? product : []}
        columns={columns}
        checkboxSelection
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductItems;
