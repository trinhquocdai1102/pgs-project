import React, { useState } from 'react';
import moment from 'moment';
import { IProducts } from '../../../models/products';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Button, TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { MakeStylesCheckBox } from '../../common/components/MakeStylesMUI';

interface Props {
  product: IProducts;
  isOpacityAll: boolean;
  isItemSelected: any;
  labelId: any;
  isItemDelete: any;
  numSelected: number;
  numbDelete: number;
  handleSelectSingle(id: string): void;
  handleChooseToDelete(id: string): void;
  setActiveSaveButton: any;
}

const ProductItems = (props: Props) => {
  const {
    product,
    handleSelectSingle,
    isOpacityAll,
    isItemSelected,
    labelId,
    handleChooseToDelete,
    setActiveSaveButton,
  } = props;
  const [changeBg, setChangeBg] = useState(true);
  const [isOpacity, setOpacity] = useState(false);

  return (
    <>
      <TableRow
        className={isOpacity || isOpacityAll ? 'opacity' : ''}
        sx={{
          borderBottom: '1px solid black',
        }}
      >
        <TableCell>
          <div style={{ display: 'flex', alignItems: 'center', borderRight: '1.5px dashed #bbb' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRight: '1px solid #fff',
                paddingRight: '10px',
                height: '20px',
              }}
            >
              <MakeStylesCheckBox
                onChange={() => {
                  handleSelectSingle(product.id);
                }}
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                height: '28px',
              }}
            >
              <Button
                style={{
                  background: 'transparent',
                  outline: 'none',
                  border: 'none',
                  maxWidth: '16px',
                  height: '16px',
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
              </Button>
            </div>
          </div>
        </TableCell>
        <TableCell>{product?.sku}</TableCell>
        <TableCell>
          <Link to="">{product?.name}</Link>
        </TableCell>
        <TableCell>{product?.category}</TableCell>
        <TableCell>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {changeBg === false && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ccc',
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: '#000',
                  marginRight: '-4px',
                }}
              >
                $
              </div>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              className={changeBg ? 'div-change-to-input input-default' : 'div-change-to-input bg-fff'}
            >
              {changeBg === true && <span>$</span>}
              <input
                type="number"
                defaultValue={product?.price}
                onFocus={() => setChangeBg(false)}
                onBlur={() => setChangeBg(true)}
                onChange={() => {
                  setActiveSaveButton(true);
                }}
              />
            </div>
          </div>
        </TableCell>
        <TableCell>
          <input
            type="number"
            className={changeBg ? 'change-to-input input-default' : 'change-to-input bg-fff'}
            defaultValue={product?.amount}
            onFocus={() => setChangeBg(false)}
            onBlur={() => setChangeBg(true)}
            onChange={() => {
              setActiveSaveButton(true);
            }}
          />
        </TableCell>
        <TableCell>
          <Link to="" style={{ width: '10%' }}>
            {product?.vendor}
          </Link>
        </TableCell>
        <TableCell>{moment(new Date(+product?.arrivalDate * 1000)).format('MMM DD,YYYY')}</TableCell>
        <TableCell>
          <div style={{ borderLeft: '1px dashed #bbb', paddingLeft: '10px' }}>
            <Button
              value={product?.id}
              variant="text"
              style={{
                background: '#b18aff',
                display: 'flex',
                width: '36px',
                height: '36px',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
              onClick={() => {
                handleChooseToDelete(product?.id);
                setOpacity(!isOpacity);
              }}
            >
              <DeleteIcon style={{ fontSize: '24px', color: '#fff' }} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductItems;
