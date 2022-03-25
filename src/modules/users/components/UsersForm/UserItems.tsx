import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TableCell } from '@mui/material';
import { Button, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROUTES } from '../../../../configs/routes';
import { IUserProfile } from '../../../../models/userProfile';
import { MakeStylesCheckBox } from '../../../common/components/MakeStylesCheckBox';
import moment from 'moment';

interface Props {
  labelId: any;
  users: IUserProfile;
  isOpacityAll: boolean;
  isSidebarOpen: boolean;
  handleChooseToDelete(id: string): void;
}

const UserItems = (props: Props) => {
  const { users, labelId, isOpacityAll, handleChooseToDelete, isSidebarOpen } = props;
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
                paddingRight: '10px',
                height: '20px',
              }}
            >
              <MakeStylesCheckBox
                onChange={() => {
                  setOpacity(!isOpacity);
                  handleChooseToDelete(users.profile_id);
                }}
                color="primary"
                checked={users.delete}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </span>
          </div>
        </TableCell>
        <TableCell>
          <Link to={`${ROUTES.detailUser}/${users.profile_id}`}>{users?.vendor}</Link>
          <br />
          {users?.storeName}
        </TableCell>
        <TableCell>
          <Link to={`${ROUTES.detailUser}/${users.profile_id}`}>
            {users?.firstName}
            {users?.lastName}
          </Link>
        </TableCell>
        <TableCell>{users?.access_level}</TableCell>
        <TableCell>{users?.product}</TableCell>
        <TableCell>{users?.order.order_as_buyer}</TableCell>
        <TableCell>{users?.wishlist}</TableCell>
        <TableCell>{moment(new Date(+users?.created * 1000)).format('MMM DD,YYYY')}</TableCell>
        <TableCell>{moment(new Date(+users?.last_login * 1000)).format('MMM DD,YYYY')}</TableCell>
        {!isSidebarOpen && (
          <TableCell style={{ maxWidth: '68px' }}>
            <div
              style={{
                borderLeft: '1px dashed #bbb',
                paddingLeft: '0',
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Button
                value={users?.profile_id}
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
                  handleChooseToDelete(users?.profile_id);
                }}
              >
                <DeleteIcon style={{ fontSize: '24px', color: '#fff' }} />
              </Button>
            </div>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default UserItems;
