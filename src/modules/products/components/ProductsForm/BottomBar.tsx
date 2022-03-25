import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import { IProducts } from '../../../../models/products';
import { tableHeaderLabel } from '../../utils';

interface Props {
  product?: IProducts[];
  isSidebarOpen: any;
  buttonBottomBar: {
    text: string;
    title: string;
    delete: boolean;
    disable: boolean;
    subTitle: string;
  };
  handleSaveChange(): void;
  handleRemoveProduct(): void;
  isSelected: boolean;
  totalSelectedItem?: number;
}

const BottomBar = (props: Props) => {
  const {
    buttonBottomBar,
    isSidebarOpen,
    product,
    isSelected,
    totalSelectedItem,
    handleRemoveProduct,
    handleSaveChange,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenExport, setModalOpenExport] = useState(false);
  const [dataExportCSV, setDataExportCSV] = useState<any>([]);

  const headers = tableHeaderLabel.map((item) => {
    return { label: item.name, key: item.name.toLowerCase() };
  });

  const csvLink = {
    headers: headers,
    data: dataExportCSV,
    filename: `products-${moment(Date.now()).format('YYYY-MM-DD')}@${(Math.random() + 1).toString(36).substring(7)}${(
      Math.random() + 1
    )
      .toString(36)
      .substring(7)}${(Math.random() + 1).toString(36).substring(7)}${(Math.random() + 1).toString(36).substring(7)}${(
      Math.random() + 1
    )
      .toString(36)
      .substring(7)}.csv`,
  };

  useEffect(() => {
    if (product) {
      setDataExportCSV(
        product?.map((item) => {
          return {
            ...item,
            'in stock': item.amount,
            'arrival date': moment(+item.arrivalDate * 1000).format('DD/MM/YYYY'),
          };
        }),
      );
    }
  }, [product]);

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
          <Button
            variant="text"
            className="footer-btn"
            onClick={() => {
              setModalOpenExport(true);
            }}
          >
            {isSelected ? 'Export selected: CSV' : 'Export all: CSV'}
          </Button>
        </div>
      </div>

      {buttonBottomBar.delete ? (
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
                    handleRemoveProduct();
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
      ) : (
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
                    handleSaveChange();
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
      {dataExportCSV.length > 0 ? (
        <Modal
          open={modalOpenExport}
          onClose={() => setModalOpenExport(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="confirm-modal">
            <div
              className="behind-modal"
              onClick={() => {
                setModalOpenExport(false);
              }}
            ></div>
            <div className="confirm-modal-content">
              <div className="modal-content-text">
                <div>Confirm Export</div>
                {totalSelectedItem === 0 ? <div>Do you want to export all products ?</div> : ''}
                {totalSelectedItem && totalSelectedItem === 1 ? <div>Do you want to export this products ?</div> : ''}
                {totalSelectedItem && totalSelectedItem > 1 ? <div>Do you want to export these products ?</div> : ''}
              </div>
              <div className="modal-button">
                <CSVLink {...csvLink}>
                  <Button
                    className="btn-table-common btn-modal-yes"
                    onClick={() => {
                      setModalOpenExport(false);
                    }}
                  >
                    Yes
                  </Button>
                </CSVLink>
                <Button
                  className="btn-table-common btn-modal-no"
                  onClick={() => {
                    setModalOpenExport(false);
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default BottomBar;
