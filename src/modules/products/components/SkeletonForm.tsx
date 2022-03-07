import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  itemPerPage: number;
}

const SkeletonForm = (props: Props) => {
  const { itemPerPage } = props;
  const list = Array.from({ length: itemPerPage });
  return (
    <div
      style={{
        padding: '26px 30px',
      }}
    >
      {list.map((item: any, index) => {
        return (
          <div
            key={index}
            style={{
              position: 'relative',
              display: 'flex',
              backdropFilter: 'blur(10px)',
              background: 'var(--sidebarColor)',
              gap: '1%',
              padding: '2px 8px',
            }}
          >
            <Skeleton variant="text" style={{ height: '62px', width: '8%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '10%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '18%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '12%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '9%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '19%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '8%' }} />
            <Skeleton variant="text" style={{ height: '62px', width: '4%', position: 'absolute', right: '20px' }} />
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonForm;
