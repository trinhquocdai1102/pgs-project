import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ICategory } from '../../../models/category';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IProductsFilter } from '../../../models/products';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

interface Props {
  category?: ICategory[];
  handleFilter(data: IProductsFilter): void;
}

const FilterProduct = (props: Props) => {
  const { category, handleFilter } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestVendor, setSuggestVendor] = React.useState<string[]>([]);
  const { control, handleSubmit } = useForm();

  const searchIn = [
    {
      value: 'name',
      title: 'Name',
    },
    {
      value: 'sku',
      title: 'SKU',
    },
    {
      value: 'fullDescription',
      title: 'Full Description',
    },
  ];

  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (data: any) => {
    handleFilter(data);
    return;
  };

  const fetchSuggestVendor = useCallback(async () => {
    if (suggestVendor.length <= 0) {
      const resp = await dispatch(fetchThunk(API_PATHS.vendorList, 'get'));
      if (resp.success) {
        setSuggestVendor(resp.data.map((item: any) => item.vendor));
      }
      return;
    }
    return;
  }, [dispatch, suggestVendor.length]);

  useEffect(() => {
    fetchSuggestVendor();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p style={{ margin: '0 0 16px', color: '#fff', fontSize: '32px' }}>Products</p>
      </div>
      <div
        style={{ backgroundColor: '#323259', paddingBottom: '4px', marginBottom: '40px', borderRadius: '4px' }}
        className="filter-form"
      >
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2%', marginBottom: '20px', position: 'relative' }}>
          <Controller
            render={({ field }) => (
              <li style={{ width: '50%' }} {...field}>
                <input type="text" className="filter-input" placeholder="Search keyword" />
              </li>
            )}
            name="search"
            control={control}
            defaultValue=""
          />

          <Controller
            render={({ field }) => (
              <li style={{ width: '25%' }} {...field}>
                <select className="filter-select-product filter-select-category">
                  <option>Any category</option>
                  {category?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        ----{item.name}
                      </option>
                    );
                  })}
                </select>
              </li>
            )}
            name="category"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <li style={{ width: '15%' }} {...field}>
                <select className="filter-select-product filter-select-stock">
                  <option value="">Any stock status</option>
                  <option value="inStock">In stock</option>
                  <option value="lowStock">Low stock</option>
                  <option value="sold">SOLD</option>
                </select>
              </li>
            )}
            name="stock-status"
            control={control}
            defaultValue=""
          />
          <li>
            <Button type="submit" className="btn-table-common">
              Search
            </Button>
          </li>
          <div className={!isOpen ? 'btn-collapse-filter' : 'btn-collapse-filter filter-open'} onClick={handleCollapse}>
            <KeyboardDoubleArrowDownIcon
              className={!isOpen ? '' : 'rotate180'}
              style={{ color: '#fff', fontSize: '20px !important' }}
            />
          </div>
        </ul>
        {isOpen && (
          <ul className="hidden-search-box">
            <Controller
              render={({ field }) => (
                <li className="hidden-search-item" {...field}>
                  <div>
                    <span style={{ display: 'block' }}>Search in:</span>
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    {searchIn.map((item, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="checkbox"
                            value={item.value}
                            checked={field.value?.includes(item.value) || false}
                            onChange={() => console.log('a')}
                          />
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </li>
              )}
              name="type-search"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({ field }) => (
                <li className="hidden-search-item" {...field} style={{ height: '42px' }}>
                  <span>Availability</span>
                  <select className="filter-select-product filter-select-availability">
                    <option value="">Any availability status</option>
                    <option value="enableOnly">Only enabled</option>
                    <option value="disableOnly">Only disabled</option>
                  </select>
                </li>
              )}
              name="availability"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({ field }) => (
                <li className="hidden-search-item" {...field} style={{ height: '42px' }}>
                  <span>Vendor</span>
                  <Stack sx={{ width: 222 }}>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      sx={{
                        border: '1px solid var(--bgColor) !important',
                        padding: '0 16px',
                        margin: '0',
                        backgroundColor: '#252547',
                        color: '#fff !important',
                        outline: 'none',
                        lineHeight: '42px',
                        borderRadius: '4px',
                      }}
                      className="filter-input"
                      options={suggestVendor}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                  </Stack>
                </li>
              )}
              name="vendor"
              control={control}
              defaultValue=""
            />
          </ul>
        )}
      </div>
    </form>
  );
};

export default FilterProduct;
