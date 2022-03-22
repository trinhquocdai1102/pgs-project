import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { field } from '../../pages/AddProductPage';
import 'react-datepicker/dist/react-datepicker.css';
import { memberships, sale_unit } from '../../utils';
import Multiselect from 'multiselect-react-dropdown';
import { Control, Controller } from 'react-hook-form';
import { CreateProduct } from '../../../../models/products';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';
import { Box, Typography, FormGroup, FormControlLabel } from '@mui/material';
import { styleSingleSelectSaleUnit } from '../../../common/components/CustomCSSMultiSelect';

interface Props {
  control: Control<CreateProduct, any>;
  data?: field;
  errors?: any;
  defaultValue?: CreateProduct;
  dataDetail?: CreateProduct;
}

const PriceInventoryForm = (props: Props) => {
  const { control, errors, defaultValue } = props;

  const [isSale, setSale] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const required = { required: { value: true, message: 'This field is required' } };

  return (
    <div className="add-form">
      <h4 className="add-parts-title">Price & Inventory</h4>
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <Box className="add-box">
          <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>
            Memberships
          </Typography>
          <div className="add-item">
            <Controller
              control={control}
              name="memberships"
              defaultValue={defaultValue?.memberships || []}
              render={({ field: { onChange } }) => (
                <Multiselect
                  className="add-memberships-option-custom add-input multiselect-option-custom"
                  showCheckbox
                  options={memberships}
                  displayValue="label"
                  hidePlaceholder
                  placeholder=""
                  avoidHighlightFirstOption
                  onSelect={(selectedList) => {
                    onChange(selectedList[0].value);
                  }}
                />
              )}
            />
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>Tax class</Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '204px' }}>
            <Typography>Default</Typography>
            <div>
              <Controller
                control={control}
                name="tax_exempt"
                defaultValue={defaultValue?.tax_exempt || 0}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormGroup>
                    <FormControlLabel
                      style={{ color: '#fff' }}
                      control={
                        <MakeStylesCheckBox
                          value={value}
                          checked={value === 1}
                          {...props}
                          onChange={(e, checked) => {
                            if (checked) onChange(1);
                            else onChange(0);
                          }}
                        />
                      }
                      label="Tax Exempt"
                    />
                  </FormGroup>
                )}
              />
            </div>
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>
            Price<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
          </Typography>
          <div style={{ display: 'flex', width: '72%' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  borderRadius: '4px',
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
                  name="price"
                  rules={required}
                  defaultValue={defaultValue?.price || ''}
                  render={({ field: { value, ...props } }) => (
                    <input
                      value={Number(value) || ''}
                      {...props}
                      type="number"
                      placeholder="0.00"
                      className="add-input"
                      style={{ borderColor: '#a16eff', marginLeft: '-4px', maxWidth: '180px', borderRadius: '4px' }}
                    />
                  )}
                />
              </div>
              <div style={{ display: 'flex', marginLeft: '12px', gap: '40px' }}>
                <FormGroup>
                  <Controller
                    control={control}
                    name="participate_sale"
                    rules={required}
                    defaultValue={0}
                    render={({ field: { onChange, ...props } }) => (
                      <FormControlLabel
                        {...props}
                        style={{ color: '#fff' }}
                        control={
                          <MakeStylesCheckBox
                            value={isSale}
                            onChange={(e, checked) => {
                              if (checked) onChange(1);
                              else onChange(0);
                              setSale(!isSale);
                            }}
                          />
                        }
                        label="Sale"
                      />
                    )}
                  />
                </FormGroup>
                <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                  {errors ? errors?.price?.message : ''}
                </Typography>
                {isSale && (
                  <div
                    style={{
                      display: 'flex',
                      borderRadius: '4px',
                    }}
                  >
                    <Controller
                      control={control}
                      name="sale_price_type"
                      defaultValue={''}
                      render={({ field: { onChange, ...props } }) => (
                        <Multiselect
                          {...props}
                          options={sale_unit}
                          displayValue="value"
                          className="remove-icon-delete add-input-hover add-icon-collapse"
                          hidePlaceholder
                          placeholder=""
                          avoidHighlightFirstOption
                          selectedValues={[sale_unit[1]]}
                          onSelect={(selectedList, selectedItem) => {
                            onChange(selectedItem.value);
                          }}
                          singleSelect
                          style={styleSingleSelectSaleUnit}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="sale_price"
                      defaultValue={defaultValue?.sale_price || ''}
                      render={({ field: { value, ...props } }) => (
                        <input
                          value={value}
                          {...props}
                          type="number"
                          className="add-input"
                          style={{ borderColor: '#a16eff', marginLeft: '1px', maxWidth: '240px', borderRadius: '4px' }}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>
            Arrival date
          </Typography>
          <div className="add-item">
            <div
              style={{
                display: 'flex',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#B4B4DB3D',
                  color: '#B4B4DB7A',
                  borderRadius: '4px',
                  width: '60px',
                  height: '40px',
                }}
              >
                <CalendarTodayOutlinedIcon fontSize="small" style={{ color: 'grey', margin: 'auto' }} />
              </div>
              <Controller
                control={control}
                name="arrival_date"
                defaultValue={defaultValue?.arrival_date || ''}
                render={({ field: { onChange, ...props } }) => (
                  <DatePicker
                    {...props}
                    selected={selectedDate}
                    onChange={(date: Date) => {
                      setSelectedDate(date);
                      onChange((date.getTime() / 1000).toString());
                    }}
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    scrollableMonthYearDropdown
                    className="add-input"
                  />
                )}
              />
            </div>
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
            Quantity in stock <span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
          </Typography>
          <div className="add-item">
            <Controller
              control={control}
              rules={required}
              name="quantity"
              defaultValue={''}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="add-input"
                  placeholder="0"
                  style={{ maxWidth: '220px', borderRadius: '4px' }}
                />
              )}
            />
            <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
              {errors ? errors?.quantity?.message : ''}
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PriceInventoryForm;
