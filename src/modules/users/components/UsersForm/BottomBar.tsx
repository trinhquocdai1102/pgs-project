import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
  isSidebarOpen: any;
  buttonBottomBar: {
    text: string;
    title: string;
    delete: boolean;
    disable: boolean;
    subTitle: string;
  };
  handleRemoveUser(): void;
}

const BottomBar = (props: Props) => {
  const { buttonBottomBar, isSidebarOpen, handleRemoveUser } = props;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        style={{ height: '78px' }}
        className={isSidebarOpen ? 'footer-bar-fixed' : 'footer-bar-fixed footer-bar-fixed-full'}
      >
        <div className="footer-bar-content">
          <Button
            variant="text"
            className="footer-btn"
            disabled={buttonBottomBar.disable}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {buttonBottomBar.text}
          </Button>
        </div>
      </div>
      {buttonBottomBar.delete && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="confirm-modal">
            <div
              className="behind-modal"
              onClick={() => {
                setModalOpen(false);
              }}
            ></div>
            <div className="confirm-modal-content">
              <div className="modal-content-text">
                <div>{buttonBottomBar.title}</div>
                <div>{buttonBottomBar.subTitle}</div>
              </div>
              <div className="modal-button">
                <Button
                  className="btn-table-common btn-modal-yes"
                  onClick={() => {
                    setModalOpen(false);
                    handleRemoveUser();
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="btn-table-common btn-modal-no"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BottomBar;
