import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  numSelected: number;
  numbDelete: number;
  activeSaveButton: boolean;
  setOpenModal: any;
  isSidebarOpen: boolean;
}

const BottomBar = (props: Props) => {
  const { numSelected, numbDelete, activeSaveButton, setOpenModal, isSidebarOpen } = props;
  return (
    <>
      <div
        style={{ height: '78px' }}
        className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
      >
        <div className="footer-bar-content">
          {numbDelete > 0 ? (
            <Button
              variant="text"
              className="footer-btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Remove selected
            </Button>
          ) : (
            <Button
              variant="text"
              className="footer-btn"
              disabled={activeSaveButton ? false : true}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Save changes
            </Button>
          )}
          {numSelected > 0 ? (
            <Button
              variant="text"
              className="footer-btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Export selected: CSV
            </Button>
          ) : (
            <Button
              variant="text"
              className="footer-btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Export all: CSV
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomBar;
