import React from 'react';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import { CreateUser } from '../../../../models/userProfile';
import { Link } from 'react-router-dom';

interface Props {
  dataDetail?: CreateUser;
}

const AccountDetailForm = (props: Props) => {
  const { dataDetail } = props;
  return (
    <div className="add-form">
      <div style={{ marginTop: '20px', textAlign: 'left', paddingBottom: '12px' }}>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Orders placed as a buyer
          </Typography>
          <div className="add-item">
            <Link to="">{dataDetail?.order_as_buyer}</Link> {''} (${dataDetail?.order_as_buyer.toFixed(2)})
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Vendor Income
          </Typography>
          <div className="add-item">${dataDetail?.income}</div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Vendor Expense
          </Typography>
          <div className="add-item">${dataDetail?.expense}</div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            <Link to="">View transaction details</Link>
          </Typography>
          <div className="add-item"></div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Earning balance
          </Typography>
          <div className="add-item">${dataDetail?.earning}</div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Products listed as vendor
          </Typography>
          <div className="add-item">
            <Link to="">{dataDetail?.products_total}</Link>
          </div>
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Joined
          </Typography>
          {dataDetail && (
            <div className="add-item">
              {moment(new Date(+dataDetail?.joined * 1000)).format('MMM DD, YYYY, h:mm:ss A')}
            </div>
          )}
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Last login
          </Typography>
          {dataDetail && (
            <div className="add-item">
              {moment(new Date(+dataDetail?.last_login * 1000)).format('MMM DD, YYYY, h:mm:ss A')}
            </div>
          )}
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Language
          </Typography>
          {dataDetail && <div className="add-item">{dataDetail?.language}</div>}
        </Box>
        <Box className="add-box">
          <Typography sx={{ fontSize: '15px', color: '#fff', textAlign: 'right', width: '24%' }} noWrap>
            Referer
          </Typography>
          {dataDetail && <div className="add-item">{dataDetail?.referer}</div>}
        </Box>
      </div>
    </div>
  );
};

export default AccountDetailForm;
