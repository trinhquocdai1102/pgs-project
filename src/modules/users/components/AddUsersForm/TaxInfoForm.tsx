import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AddUserProps } from './EmailPasswordForm';
import { CreateUser } from '../../../../models/userProfile';

interface Props {
  addUserProps: AddUserProps;
  dataDetail?: CreateUser;
}

const TaxInfoForm = (props: Props) => {
  const { control } = props.addUserProps;
  return (
    <>
      <h6 style={{ fontSize: '18px', color: '#fff', fontWeight: 'normal', margin: '16px 0' }}>Access information</h6>
      <div className="add-form">
        <div style={{ marginTop: '20px', textAlign: 'left', paddingBottom: '12px' }}>
          <Box className="add-box">
            <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }}>
              Tax exempt
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                name="taxExempt"
                defaultValue={0}
                render={({ field: { onChange, value, ...props } }) => (
                  <input
                    type="checkbox"
                    {...props}
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

export default TaxInfoForm;
