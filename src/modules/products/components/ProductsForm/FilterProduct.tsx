import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import Multiselect from 'multiselect-react-dropdown';
import { fetchThunk } from '../../../common/redux/thunk';
import { availability, searchIn, stockStatus } from '../../utils';
import { Category, Vendor, IProductsFilter } from '../../../../models/products';
import { styleSingleSelect } from '../../../common/components/CustomCSSMultiSelect';
import { autoCompleteTheme } from '../../../common/components/MakeStylesMUI';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useForm, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Autocomplete, Button, Checkbox, createTheme, FormControl, TextField, ThemeProvider } from '@mui/material';

interface Props {
  handleFilter(data: IProductsFilter): void;
}

const FilterProduct = (props: Props) => {
  const { handleFilter } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState<Vendor[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const { control, handleSubmit } = useForm();
  const newCategory = [
    { id: '0', parentId: '0', name: 'Any category', label: 'Any category', path: '', pos: '' },
  ].concat(category?.map((item) => ({ ...item, label: `------${item.name}` })));

  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (data: any) => {
    handleFilter(data);
    return;
  };

  const fetchCategory = useCallback(async () => {
    if (category.length <= 0) {
      const resp = await dispatch(fetchThunk(API_PATHS.categoryList, 'get'));
      if (resp.success) {
        setCategory(resp.data);
      }
      return;
    }
    return;
  }, [dispatch, category.length]);

  const fetchVendor = useCallback(async () => {
    if (vendor.length <= 0) {
      const resp = await dispatch(fetchThunk(API_PATHS.vendorList, 'get'));
      if (resp.success) {
        setVendor(resp.data);
      }
      return;
    }
    return;
  }, [dispatch, vendor.length]);

  const handleCheckSearchInValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    field: ControllerRenderProps<FieldValues>,
  ) => {
    const values = typeof field.value === 'string' ? field.value.split(',') : field.value;
    if (checked) {
      field.onChange([...values, e.target.value].filter((item) => item !== '').join());
    } else {
      field.onChange(values.filter((value: any) => value !== e.target.value));
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p style={{ margin: '0 0 16px', color: '#fff', fontSize: '32px' }}>Products</p>
      </div>
      <div
        style={{ backgroundColor: '#323259', paddingBottom: '4px', marginBottom: '40px', borderRadius: '4px' }}
        className="filter-form"
      >
        <div style={{ listStyle: 'none', display: 'flex', gap: '2%', marginBottom: '20px', position: 'relative' }}>
          <Controller
            render={({ field }) => (
              <FormControl style={{ width: '50%' }} {...field}>
                <input type="text" className="filter-input" placeholder="Search keyword" />
              </FormControl>
            )}
            name="search"
            control={control}
            defaultValue=""
          />

          <Controller
            defaultValue="0"
            render={({ field: { onChange, ...props } }) => (
              <FormControl style={{ width: '25%' }} {...props}>
                <Multiselect
                  options={newCategory}
                  displayValue="label"
                  placeholder="Any category"
                  className="filter-select-product"
                  onSelect={(selectedList, selectedItem) => {
                    onChange(selectedItem.id);
                  }}
                  style={styleSingleSelect}
                  singleSelect
                  avoidHighlightFirstOption
                />
              </FormControl>
            )}
            name="category"
            control={control}
          />
          <Controller
            defaultValue="all"
            render={({ field: { onChange, ...props } }) => (
              <FormControl style={{ width: '15%' }} {...props}>
                <Multiselect
                  options={stockStatus}
                  displayValue="name"
                  placeholder="Any stock status"
                  className="filter-select-product"
                  onSelect={(selectedList, selectedItem) => {
                    onChange(selectedItem.value);
                  }}
                  style={styleSingleSelect}
                  hidePlaceholder
                  avoidHighlightFirstOption
                  singleSelect
                />
              </FormControl>
            )}
            name="stock_status"
            control={control}
          />
          <li>
            <Button type="submit" className="btn-table-common">
              Search
            </Button>
          </li>
          <div className={!isOpen ? 'btn-collapse-filter' : 'btn-collapse-filter filter-open'} onClick={handleCollapse}>
            <KeyboardDoubleArrowDownIcon
              className={!isOpen ? 'open-hidden-search-box' : 'rotate180'}
              style={{ color: '#fff', fontSize: '20px !important' }}
            />
            <div className={!isOpen ? 'dot-open-search-box' : 'displayNone'}>.</div>
          </div>
        </div>
        {isOpen && (
          <ul className="hidden-search-box">
            <li className="hidden-search-item">
              <div>
                <span style={{ display: 'block' }}>Search in:</span>
              </div>
              <div style={{ fontSize: '13px' }}>
                <Controller
                  render={({ field }) => (
                    <>
                      {searchIn.map((item, index) => {
                        return (
                          <div key={index}>
                            <ThemeProvider
                              theme={createTheme({
                                components: {
                                  MuiCheckbox: {
                                    styleOverrides: {
                                      root: {
                                        padding: '0',
                                      },
                                      colorPrimary: {
                                        color: '#fff !important',
                                      },
                                    },
                                  },
                                },
                              })}
                            >
                              <Checkbox
                                value={item.value}
                                size="small"
                                checked={field.value?.includes(item.value) || false}
                                onChange={(e, checked) => handleCheckSearchInValue(e, checked, { ...field })}
                              />
                            </ThemeProvider>
                            {item.title}
                          </div>
                        );
                      })}
                    </>
                  )}
                  name="search_type"
                  control={control}
                  defaultValue=""
                />
              </div>
            </li>

            <Controller
              render={({ field: { onChange, ...props } }) => (
                <li className="hidden-search-item" {...props} style={{ alignItems: 'start' }}>
                  <div style={{ marginTop: '8px' }}>Availability</div>
                  <FormControl style={{ height: '42px' }} {...props}>
                    <Multiselect
                      options={availability}
                      displayValue="name"
                      placeholder="Any availability status"
                      className="filter-select-product"
                      onSelect={(selectedList, selectedItem) => {
                        onChange(selectedItem.value);
                      }}
                      style={styleSingleSelect}
                      hidePlaceholder
                      avoidHighlightFirstOption
                      singleSelect
                    />
                  </FormControl>
                </li>
              )}
              name="availability"
              control={control}
              defaultValue="all"
            />

            <Controller
              name="vendor"
              control={control}
              render={({ field: { onChange, value, ...props } }) => (
                <li className="hidden-search-item" {...props} style={{ alignItems: 'start' }}>
                  <span style={{ marginTop: '8px' }}>Vendor</span>
                  <FormControl style={{ height: '42px', minWidth: '260px' }}>
                    <ThemeProvider theme={autoCompleteTheme}>
                      <Autocomplete
                        fullWidth
                        options={vendor || []}
                        value={value}
                        onChange={(event, item) => {
                          onChange(item ? item.id : '');
                        }}
                        className="filter-select-product remove-icon-dropdown remove-svg"
                        getOptionLabel={(item) => (item.name ? item.name : '')}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </ThemeProvider>
                  </FormControl>
                </li>
              )}
            />
          </ul>
        )}
      </div>
    </form>
  );
};

export default FilterProduct;
