import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, FieldArrayWithId } from 'react-hook-form';
import { CreateProduct, Shipping } from '../../../../models/products';
import { AddProductProps } from './AddProductForm';
import Multiselect from 'multiselect-react-dropdown';
import { styleSingleSelect } from '../../../common/components/CustomCSSMultiSelect';

interface Props {
  rest: AddProductProps;
  fields: FieldArrayWithId<CreateProduct, 'shipping', 'id'>[];
  handleAddShippingLocation(obj: Shipping): void;
  handleRemoveShippingLocation(index: number): void;
}

const ShippingForm = (props: Props) => {
  const { control, data, errors } = props.rest;
  const { fields, handleAddShippingLocation, handleRemoveShippingLocation } = props;
  const [shippingLocation, setShippingLocation] = React.useState('');
  const required = { required: { value: true, message: 'This field is required' } };
  const dataShipping = data?.shipping?.map((item, index) => ({ ...item, index: index }));

  return (
    <div className="add-form">
      <h4 className="add-parts-title">Shipping</h4>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>
              {item.name ? item.name : item.zone_name}
              {index === 0 && <span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>}
            </Typography>
            <div className="add-item">
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  borderRadius: '4px',
                  height: '40px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: '#B4B4DB3D',
                    color: '#B4B4DB7A',
                    borderRadius: '4px',
                    width: '46px',
                    height: '40px',
                  }}
                >
                  <p style={{ margin: 'auto' }}>{'$'}</p>
                </div>
                <Controller
                  control={control}
                  name={`shipping[${index}].price` as any}
                  rules={required}
                  defaultValue={'0'}
                  render={({ field: { value, ...props } }) => (
                    <input
                      value={Number(value) || '0.00'}
                      {...props}
                      type="number"
                      className="add-input"
                      style={{ borderColor: '#a16eff', marginLeft: '-4px', borderRadius: '4px', height: '40px' }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`shipping[${index}].id` as any}
                  defaultValue={item.id}
                  render={({ field }) => <input {...field} type="string" style={{ display: 'none' }} />}
                />
                {index !== 0 && (
                  <p
                    style={{
                      position: 'absolute',
                      right: '100px',
                      width: '16%',
                      alignSelf: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onClick={() => {
                      handleRemoveShippingLocation(index);
                    }}
                  >
                    Remove
                  </p>
                )}
              </div>
            </div>

            {index === 0 && (
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.shipping?.message : ''}
              </Typography>
            )}
          </Box>
        );
      })}
      <Box className="add-box">
        <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}></Typography>
        <div className="add-item">
          <div style={{ display: 'flex', width: '100%' }}>
            <Multiselect
              options={dataShipping}
              displayValue="name"
              placeholder="Select new zone"
              className="filter-select-product remove-icon-delete "
              onSelect={(selectedList, selectedItem) => {
                setShippingLocation(selectedItem.index);
              }}
              style={styleSingleSelect}
              disablePreSelectedValues
              avoidHighlightFirstOption
              singleSelect
            />
            <Typography
              sx={{
                fontSize: '15px',
                color: '#fff',
                marginLeft: '16px',
                alignSelf: 'center',
                overflow: 'visible',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (dataShipping) {
                  if (+shippingLocation === 0) return;
                  handleAddShippingLocation(dataShipping[+shippingLocation]);
                }
              }}
              noWrap
            >
              Add Shipping Location
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ShippingForm;
