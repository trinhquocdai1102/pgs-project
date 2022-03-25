import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, TableCell } from '@mui/material';
import { Button, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProducts } from '../../../../models/products';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { ROUTES } from '../../../../configs/routes';

interface Props {
  labelId: any;
  index: number;
  product: IProducts;
  isOpacityAll: boolean;
  handleSelectSingle(id: string): void;
  handleChooseToDelete(id: string): void;
  handleClickToUpdate(id: string, enable: boolean): void;
  handleChangeValue(data: { price: string; stock: string; id: string }, index: number): void;
}

const ProductItems = (props: Props) => {
  const {
    index,
    product,
    labelId,
    isOpacityAll,
    handleChangeValue,
    handleSelectSingle,
    handleClickToUpdate,
    handleChooseToDelete,
  } = props;
  const [changeBg, setChangeBg] = useState(true);
  const [isOpacity, setOpacity] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [inputValue, setInputValue] = React.useState({
    price: product.price,
    stock: product.amount,
    id: product.id,
  });

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
                checked={product.checked}
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
                onClick={() => {
                  setOpenModal(true);
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
          <Link to={`${ROUTES.detailProduct}/${product.id}`}>{product?.name}</Link>
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
                value={inputValue.price}
                onFocus={() => setChangeBg(false)}
                onBlur={() => {
                  setChangeBg(true);
                  handleChangeValue(inputValue, index);
                }}
                onChange={(e) =>
                  setInputValue((prev) => {
                    return { ...prev, price: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </TableCell>
        <TableCell>
          <input
            type="number"
            className={changeBg ? 'change-to-input input-default' : 'change-to-input bg-fff'}
            value={inputValue.stock}
            onFocus={() => setChangeBg(false)}
            onBlur={() => {
              setChangeBg(true);
              handleChangeValue(inputValue, index);
            }}
            onChange={(e) =>
              setInputValue((prev) => {
                return { ...prev, stock: e.target.value };
              })
            }
          />
        </TableCell>
        <TableCell>
          <Link to={`${ROUTES.detailUser}/${product.id}`} style={{ width: '10%' }}>
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
                display: 'flex',
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                background: '#b18aff',
                justifyContent: 'center',
              }}
              onClick={() => {
                setOpacity(!isOpacity);
                handleChooseToDelete(product?.id);
              }}
            >
              <DeleteIcon style={{ fontSize: '24px', color: '#fff' }} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="confirm-modal">
          <div
            className="behind-modal"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <div className="confirm-modal-content">
            <div className="modal-content-text">
              <div>Confirm Update</div>
              <div>Do you want to update this product?</div>
            </div>
            <div className="modal-button">
              <Button
                className="btn-table-common btn-modal-yes"
                onClick={() => {
                  setOpenModal(false);
                  handleClickToUpdate(product.id, !(product.enabled == '1'));
                }}
              >
                Yes
              </Button>
              <Button
                className="btn-table-common btn-modal-no"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductItems;
