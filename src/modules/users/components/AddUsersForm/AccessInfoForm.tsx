import React, { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { required } from '../../../../utils/utils';
import { AddUserProps } from './EmailPasswordForm';
import Multiselect from 'multiselect-react-dropdown';
import { RolesInfo, CreateUser } from '../../../../models/userProfile';
import { accessLevel, filterStatusDetail, membership } from '../../utils';
import { styleSingleSelect, styleMultiSelectBgTransparent } from '../../../common/components/CustomCSSMultiSelect';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';

interface Props {
  rest: AddUserProps;
  dataDetail?: CreateUser;
}

const AccessInfoForm = (props: Props) => {
  const { control, errors } = props.rest;
  const { dataDetail } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [requirePassword, setRequirePassword] = useState(false);
  const [roleUser, setRoleUser] = useState<RolesInfo[]>();
  const [showRole, setShowRole] = useState(false);

  const statusData = filterStatusDetail.filter((item) => item.value === dataDetail?.status);

  const fetchRoleUser = useCallback(async () => {
    const respRole = await dispatch(fetchThunk(API_PATHS.roleList, 'get'));
    if (respRole.success) {
      setRoleUser(respRole.data['administrator']);

      return;
    }
    return;
  }, [dispatch]);

  const newDataRole = dataDetail?.roles
    .map((item) =>
      roleUser?.filter((value) => {
        if (+value.id === +item) {
          return { ...value, name: value.name };
        }
      }),
    )
    .flat();

  useEffect(() => {
    if (dataDetail?.forceChangePassword?.toString() === '1') {
      setRequirePassword(true);
    } else setRequirePassword(false);
  }, [dataDetail]);

  useEffect(() => {
    fetchRoleUser();
  }, [fetchRoleUser]);

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
                        if (+selectedItem.value === 100) {
                          setShowRole(true);
                        } else {
                          setShowRole(false);
                        }
                      }}
                      selectedValues={[accessLevel[1]]}
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
          {showRole && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
                Roles
              </Typography>
              <div className="add-item">
                <Controller
                  control={control}
                  name="roles"
                  render={({ field: { onChange } }) => (
                    <Multiselect
                      displayValue="name"
                      options={roleUser}
                      selectedValues={roleUser ? [roleUser[0]] : []}
                      className="filter-select-product filter-select-stock remove-icon-delete"
                      onSelect={(selectedList) => {
                        onChange(selectedList.map((item: any) => item.id));
                      }}
                      onRemove={(selectedList) => {
                        onChange(selectedList.map((item: any) => item.id));
                      }}
                      placeholder=""
                      showCheckbox
                      hidePlaceholder
                      avoidHighlightFirstOption
                      style={styleMultiSelectBgTransparent}
                    />
                  )}
                />
              </div>
            </Box>
          )}
          {dataDetail && +dataDetail.access_level === 100 && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
                Roles
              </Typography>
              <div className="add-item">
                {newDataRole ? (
                  <Controller
                    control={control}
                    name="roles"
                    render={({ field: { onChange } }) => (
                      <Multiselect
                        displayValue="name"
                        options={roleUser}
                        selectedValues={newDataRole?.includes(undefined) ? [] : newDataRole}
                        className="filter-select-product filter-select-stock remove-icon-delete"
                        onSelect={(selectedList) => {
                          onChange(selectedList.map((item: any) => +item.id));
                        }}
                        onRemove={(selectedList) => {
                          onChange(selectedList.map((item: any) => +item.id));
                        }}
                        placeholder=""
                        showCheckbox
                        hidePlaceholder
                        avoidHighlightFirstOption
                        style={styleMultiSelectBgTransparent}
                      />
                    )}
                  />
                ) : null}
              </div>
            </Box>
          )}
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
                      options={filterStatusDetail}
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
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="filter-input"
                      style={{ width: '100%', minWidth: '400px', minHeight: '80px', maxWidth: '600px' }}
                    />
                  )}
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
                defaultValue={dataDetail ? dataDetail.forceChangePassword : 0}
                render={({ field: { onChange, ...props } }) => (
                  <MakeStylesCheckBox
                    {...props}
                    value={requirePassword}
                    checked={requirePassword}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange(1);
                        setRequirePassword(true);
                      } else {
                        onChange(0);
                        setRequirePassword(false);
                      }
                    }}
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
