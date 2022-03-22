import React from 'react';
import { Box, Typography } from '@mui/material';
import { required } from '../../../../utils/utils';
import Multiselect from 'multiselect-react-dropdown';
import { Controller } from 'react-hook-form';
import { styleSingleSelect } from '../../../common/components/CustomCSSMultiSelect';
import { AddUserProps } from './EmailPasswordForm';
import { CreateUser } from '../../../../models/userProfile';
import { accessLevel, filterStatus, membership } from '../../utils';

interface Props {
  addUserProps: AddUserProps;
  dataDetail?: CreateUser;
}

const AccessInfoForm = (props: Props) => {
  const { control, errors } = props.addUserProps;
  const { dataDetail } = props;
  const statusData = filterStatus.filter((item) => item.value === dataDetail?.status);

  return (
    <>
      <h6 style={{ fontSize: '18px', color: '#fff', fontWeight: 'normal', margin: '16px 0' }}>Access information</h6>
      <div className="add-form">
        <div style={{ marginTop: '20px', textAlign: 'left', paddingBottom: '12px' }}>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Access level {!dataDetail && <span style={{ color: '#fff', fontSize: '15px' }}> *</span>}
            </Typography>
            <div className="add-item">
              {dataDetail ? (
                <Controller
                  control={control}
                  name="access_level"
                  defaultValue="10"
                  render={({ field: { value } }) => {
                    const newDataDetail = accessLevel.findIndex((item) => item.value == value);
                    return <span>{accessLevel[newDataDetail].name}</span>;
                  }}
                />
              ) : (
                <Controller
                  control={control}
                  rules={required('Access level')}
                  name="access_level"
                  defaultValue="10"
                  render={({ field: { onChange, ...props } }) => (
                    <Multiselect
                      displayValue="name"
                      options={accessLevel}
                      {...props}
                      className="filter-select-product filter-select-stock remove-icon-delete"
                      onSelect={(selectedList, selectedItem) => {
                        onChange(selectedItem.value);
                      }}
                      selectedValues={[
                        {
                          value: '10',
                          name: 'Vendor',
                        },
                      ]}
                      avoidHighlightFirstOption
                      style={styleSingleSelect}
                      singleSelect
                    />
                  )}
                />
              )}
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.access_level?.message : ''}
              </Typography>
            </div>
          </Box>
          {dataDetail && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
                Account status <span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
              </Typography>
              <div className="add-item">
                <Controller
                  control={control}
                  name="status"
                  defaultValue=""
                  render={({ field: { onChange, ...props } }) => (
                    <Multiselect
                      {...props}
                      displayValue="name"
                      options={filterStatus}
                      className="filter-select-product filter-select-stock remove-icon-delete"
                      onSelect={(selectedList, selectedItem) => {
                        onChange(selectedItem.value);
                      }}
                      placeholder={statusData[0]?.name}
                      avoidHighlightFirstOption
                      style={styleSingleSelect}
                      singleSelect
                    />
                  )}
                />
              </div>
            </Box>
          )}
          {dataDetail && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
                Status comment (reason)
              </Typography>
              <div className="add-item">
                <Controller
                  control={control}
                  name="statusComment"
                  defaultValue=""
                  render={({ field }) => <textarea {...field} className="filter-input" />}
                />
              </div>
            </Box>
          )}
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
              Membership
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                name="membership_id"
                defaultValue={null}
                render={({ field: { onChange } }) => (
                  <Multiselect
                    displayValue="name"
                    options={membership}
                    selectedValues={[{ name: 'Ignore Membership', value: null }]}
                    className="filter-select-product filter-select-stock remove-icon-delete"
                    onSelect={(selectedList, selectedItem) => {
                      onChange(selectedItem.value);
                    }}
                    avoidHighlightFirstOption
                    style={styleSingleSelect}
                    singleSelect
                  />
                )}
              />
            </div>
          </Box>
          {dataDetail && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
                Pending membership
              </Typography>
              <div className="add-item">{dataDetail?.pending_membership_id || 'none'}</div>
            </Box>
          )}
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }}>
              Require to change password on next log in
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                name="forceChangePassword"
                defaultValue={0}
                render={({ field: { onChange, value, ...props } }) => (
                  <input
                    {...props}
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange(1);
                      } else onChange(0);
                    }}
                    value={value}
                  />
                )}
              />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AccessInfoForm;
