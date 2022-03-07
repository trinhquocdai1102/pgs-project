import React, { FC, ReactElement } from 'react';
import { Button } from '@mui/material';

interface Btn {
  value: string | ReactElement<any, any>;
  className: string;
}

interface Props {
  isOpenModal: boolean;
  modalBtn: Btn;
  yesBtn: Btn;
  noBtn: Btn;
  handleDelete(): void;
  setOpenModal: any;
}

const Modal: FC<Props> = ({ children, yesBtn, noBtn, isOpenModal, setOpenModal }) => {
  return (
    <div className={isOpenModal ? 'confirm-modal' : 'displayNone'}>
      <div className="behind-modal" onClick={() => setOpenModal(false)}></div>
      <div className="confirm-modal-content">
        {children}
        <div className="modal-button">
          <Button
            className={yesBtn.className}
            onClick={() => {
              // handleDelete();
              setOpenModal(false);
            }}
          >
            {yesBtn.value}
          </Button>
          <Button
            className={noBtn.className}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            {noBtn.value}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
