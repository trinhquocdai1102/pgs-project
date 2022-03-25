import React from 'react';
import { Box, Typography } from '@mui/material';
import { required } from '../../../../utils/utils';
import Multiselect from 'multiselect-react-dropdown';
import { Control, Controller } from 'react-hook-form';
import { CreateUser } from '../../../../models/userProfile';
import { styleSingleSelect } from '../../../common/components/CustomCSSMultiSelect';

export interface AddUserProps {
  errors: any;
  control: Control<CreateUser, any>;
}

interface Props {
  rest: AddUserProps;
  dataDetail?: CreateUser;
  watch: any;
}

const EmailPasswordForm = (props: Props) => {
  const { control, errors } = props.rest;
  const { dataDetail, watch } = props;
  return (
    <>
      <h6 style={{ fontSize: '18px', color: '#fff', fontWeight: 'normal', margin: '16px 0' }}>Email & password</h6>
      <div className="add-form">
        <div style={{ marginTop: '20px', textAlign: 'left', paddingBottom: '12px' }}>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              First Name <span style={{ color: '#fff', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                rules={required('First Name')}
                name="firstName"
                defaultValue={''}
                render={({ field }) => <input {...field} type="text" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.firstName?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Last Name <span style={{ color: '#fff', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                rules={required('Last Name')}
                name="lastName"
                defaultValue={''}
                render={({ field }) => <input {...field} type="text" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.lastName?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Email <span style={{ color: '#fff', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                rules={required('Email')}
                name="email"
                defaultValue={''}
                render={({ field }) => <input {...field} type="email" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.email?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Password {!dataDetail && <span style={{ color: '#fff', fontSize: '15px' }}> *</span>}
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                defaultValue=""
                rules={
                  dataDetail
                    ? {
                        minLength: { value: 6, message: 'Password must have at least 6 characters' },
                      }
                    : {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 6, message: 'Password must have at least 6 characters' },
                      }
                }
                name="password"
                render={({ field }) => <input {...field} type="password" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.password?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Confirm password {!dataDetail && <span style={{ color: '#fff', fontSize: '15px' }}> *</span>}
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                defaultValue=""
                rules={
                  dataDetail
                    ? {
                        validate: { value: (value) => value === watch('password') || 'The passwords do not match' },
                      }
                    : {
                        required: { value: true, message: 'This field is required' },
                        validate: { value: (value) => value === watch('password') || 'The passwords do not match' },
                      }
                }
                name="confirm_password"
                render={({ field }) => <input {...field} type="password" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.confirm_password?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Type
            </Typography>
            <div className="add-item">
              {!dataDetail && (
                <Controller
                  control={control}
                  name="paymentRailsType"
                  defaultValue="individual"
                  render={({ field: { onChange } }) => (
                    <Multiselect
                      displayValue="value"
                      options={[
                        {
                          value: 'individual',
                        },
                        {
                          value: 'business',
                        },
                      ]}
                      className="filter-select-product filter-select-stock remove-icon-delete"
                      onSelect={(selectedList, selectedItem) => {
                        onChange(selectedItem.value);
                      }}
                      avoidHighlightFirstOption
                      placeholder="Any status"
                      style={styleSingleSelect}
                      singleSelect
                    />
                  )}
                />
              )}
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              PaymentRails ID
            </Typography>
            <div className="add-item"></div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EmailPasswordForm;
