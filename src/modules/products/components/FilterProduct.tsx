import React, { useState } from 'react';
import { ICategory } from '../../../models/category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  category?: ICategory[];
}

const FilterProduct = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { category } = props;

  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const inputValue = {
  //   searchKeyword: {
  //     value: 'Search keywords',
  //     classStyle: 'modal_btn_detail',
  //   },
  //   leftBtn: {
  //     value: 'Save',
  //     classStyle: 'btn btn-primary mx-3',
  //   },
  //   rightBtn: {
  //     value: 'Cancel',
  //     classStyle: 'btn btn-secondary mx-3',
  //   },
  // };
  return (
    <>
      <div>
        <h2 style={{ margin: '0 0 16px', color: '#fff' }}>Products</h2>
      </div>
      <div
        style={{ backgroundColor: '#323259', paddingBottom: '4px', marginBottom: '40px', borderRadius: '4px' }}
        className="filter-form"
      >
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2%', marginBottom: '20px', position: 'relative' }}>
          <li style={{ width: '50%' }}>
            <input className="filter-input" placeholder="Search keyword" />
          </li>
          <li style={{ width: '20%' }}>
            <select className="filter-select-product filter-select-category">
              <option>Any category</option>
              {category?.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    ----{item.name}
                  </option>
                );
              })}
            </select>
          </li>
          <li style={{ width: '20%' }}>
            <select className="filter-select-product filter-select-stock">
              <option value="">Any stock status</option>
              <option value="inStock">In stock</option>
              <option value="lowStock">Low stock</option>
              <option value="sold">SOLD</option>
            </select>
          </li>
          <li>
            <button className="btn btn-table-common">Search</button>
          </li>
          <div className={!isOpen ? 'btn-collapse-filter' : 'btn-collapse-filter filter-open'} onClick={handleCollapse}>
            <ExpandMoreIcon className={!isOpen ? '' : 'rotate180'} style={{ color: '#fff' }} />
          </div>
        </ul>
        {isOpen && (
          <ul className="hidden-search-box">
            <li className="hidden-search-item">
              <div>
                <span style={{ display: 'block' }}>Search in:</span>
              </div>
              <div>
                <div>
                  <input type="checkbox" /> Name
                </div>
                <div>
                  <input type="checkbox" /> SKU
                </div>
                <div>
                  <input type="checkbox" /> Full Description
                </div>
              </div>
            </li>
            <li className="hidden-search-item">
              <span>Availability</span>
              <select className="filter-select-product filter-select-availability">
                <option value="">Any availability status</option>
                <option value="enableOnly">Only enabled</option>
                <option value="disableOnly">Only disabled</option>
              </select>
            </li>
            <li className="hidden-search-item">
              <span>Vendor</span>
              <input type="text" className="filter-input" id="vendor" />
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterProduct;
