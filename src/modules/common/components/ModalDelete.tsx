import React from 'react';
import Modal from './Modal';

interface Props {
  isOpenModal: boolean;
  setOpenModal: any;
}

const ModalDelete = (props: Props) => {
  const { isOpenModal, setOpenModal } = props;
  const btnValue = {
    modalBtn: {
      value: '',
      className: 'modal-delete-item',
    },
    yesBtn: {
      value: 'Yes',
      className: 'btn-table-common btn-modal-yes',
    },
    noBtn: {
      value: 'No',
      className: 'btn-table-common btn-modal-no',
    },
  };
  const handleDelete = () => {};
  return (
    <Modal
      modalBtn={btnValue.modalBtn}
      yesBtn={btnValue.yesBtn}
      noBtn={btnValue.noBtn}
      handleDelete={handleDelete}
      isOpenModal={isOpenModal}
      setOpenModal={setOpenModal}
    >
      <div className="modal-content-text">
        <div>Confirm Delete</div>
        <div>You sure want delete it?</div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
