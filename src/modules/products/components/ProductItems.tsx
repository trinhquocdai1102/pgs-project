import React, { useState } from 'react';
import moment from 'moment';
import { IProducts } from '../../../models/products';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

interface Props {
  productItem?: IProducts[];
  handleSelectAll(e: { target: { name: string; checked: boolean } }): void;
}

const ProductItems = (props: Props) => {
  const { productItem, handleSelectAll } = props;
  const [changeBg, setChangeBg] = useState(true);

  return (
    <>
      {productItem?.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', borderRight: '1.5px dashed #bbb' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '1px solid #fff',
                    paddingRight: '10px',
                    height: '20px',
                  }}
                >
                  <input type="checkbox" name={item.name} checked={item.checked || false} onChange={handleSelectAll} />
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    height: '28px',
                  }}
                >
                  <button
                    style={{
                      background: 'transparent',
                      outline: 'none',
                      border: 'none',
                    }}
                  >
                    <PowerSettingsNewOutlinedIcon
                      style={{
                        fontSize: '20px',
                        color: '#72b25b',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />
                  </button>
                </div>
              </div>
            </td>
            <td>{item.sku}</td>
            <td>
              <Link to="">{item.name}</Link>
            </td>
            <td>{item.category}</td>
            <td>
              <div
                style={{
                  display: 'flex',
                }}
              >
                {changeBg === false && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#ccc',
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      color: '#000',
                      marginRight: '-4px',
                    }}
                  >
                    $
                  </div>
                )}
                <input
                  style={{ maxWidth: '100px' }}
                  type="number"
                  className={changeBg ? 'change-to-input' : 'change-to-input bg-fff'}
                  defaultValue={item.amount}
                  onFocus={() => setChangeBg(false)}
                  onBlur={() => setChangeBg(true)}
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className={changeBg ? 'change-to-input' : 'change-to-input bg-fff'}
                defaultValue={item.amount}
                onFocus={() => setChangeBg(false)}
                onBlur={() => setChangeBg(true)}
              />
            </td>
            <td>
              <Link to="">{item.vendor}</Link>
            </td>
            <td>{moment(new Date(+item.arrivalDate * 1000)).format('MMM DD,YYYY')}</td>
            <td>
              <button
                className="btn"
                style={{
                  background: '#b18aff',
                  display: 'flex',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  borderLeft: '1px dashed #bbb',
                  borderRadius: '4px',
                }}
              >
                <DeleteIcon style={{ fontSize: '24px', color: '#fff' }} />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ProductItems;
