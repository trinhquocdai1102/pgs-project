import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AddUserProps } from './EmailPasswordForm';
import { CreateUser } from '../../../../models/userProfile';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';

interface Props {
  rest: AddUserProps;
  dataDetail?: CreateUser;
}

const TaxInfoForm = (props: Props) => {
  const { control } = props.rest;
  const { dataDetail } = props;
  const [checkTax, setCheckTax] = useState(false);

  useEffect(() => {
    if (dataDetail?.taxExempt?.toString() === '1') {
      setCheckTax(true);
    } else setCheckTax(false);
  }, [dataDetail]);
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
                defaultValue={dataDetail ? dataDetail.taxExempt : 0}
                render={({ field: { onChange, ...props } }) => (
                  <MakeStylesCheckBox
                    {...props}
                    value={checkTax}
                    checked={checkTax}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange(1);
                        setCheckTax(true);
                      } else {
                        onChange(0);
                        setCheckTax(false);
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

export default TaxInfoForm;
