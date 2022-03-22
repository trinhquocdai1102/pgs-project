import React, { useState } from 'react';
import ImagesForm from './ImagesForm';
import { Editor } from 'react-draft-wysiwyg';
import { field } from '../../pages/AddProductPage';
import Multiselect from 'multiselect-react-dropdown';
import { Control, Controller } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CreateProduct } from '../../../../models/products';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useStylesSwitch } from '../../../common/components/MakeStylesMUI';
import {
  Box,
  Typography,
  Switch,
  Autocomplete,
  TextField,
  ThemeProvider,
  FormControl,
  createTheme,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import { styleSingleSelect, styleMultiSelect } from '../../../common/components/CustomCSSMultiSelect';

export interface AddProductProps {
  errors?: any;
  data?: field;
  dataDetail?: CreateProduct;
  control: Control<CreateProduct, any>;
}

interface Props {
  rest: AddProductProps;
  handleRemoveImg?: (id: number) => void;
}

const AddProductForm = (props: Props) => {
  const classes = useStylesSwitch();
  const { data, control, errors, dataDetail } = props.rest;
  const { handleRemoveImg } = props;
  const [showHiddenText, setShowHiddenText] = useState(false);
  const required = { required: { value: true, message: 'This field is required' } };

  return (
    <>
      <div className="add-form">
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }}>
              Vendor<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <FormControl className="add-item" style={{ height: '42px' }}>
              <Controller
                control={control}
                rules={required}
                name="vendor_id"
                defaultValue={dataDetail ? dataDetail.vendor_id : undefined}
                render={({ field: { onChange, value, ...props } }) => (
                  <ThemeProvider
                    theme={createTheme({
                      components: {
                        MuiAutocomplete: {
                          styleOverrides: {
                            root: {
                              padding: '0',
                              input: {
                                width: '100% !important',
                                height: '40px !important',
                                padding: '0 8px !important',
                              },
                            },
                            listbox: {
                              backgroundColor: 'var(--sidebarColor) !important',
                              width: '100% !important',
                              paddingTop: 0,
                            },
                            option: {
                              color: '#fff !important',
                              padding: '12px !important',
                            },
                          },
                        },
                        MuiTextField: {
                          styleOverrides: {
                            root: { width: '100%' },
                          },
                        },
                      },
                    })}
                  >
                    <Autocomplete
                      {...props}
                      value={value || null}
                      isOptionEqualToValue={(option, value) => +option?.id == +value.id}
                      options={data?.vendor || []}
                      getOptionLabel={(item) => (item ? item.name : '')}
                      onChange={(event, item) => {
                        onChange(item ? item : '');
                      }}
                      className="filter-select-product remove-icon-dropdown"
                      renderInput={(params) => <TextField {...params} placeholder="Type Vendor to select" />}
                    />
                  </ThemeProvider>
                )}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors?.vendor_id ? errors?.vendor_id?.message : ''}
              </Typography>
            </FormControl>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Product Title <span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                rules={required}
                name="name"
                defaultValue={''}
                render={({ field }) => <input {...field} type="text" className="add-input" />}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors?.name ? errors?.name.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Brand<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <FormControl className="add-item" style={{ height: '42px' }}>
              <Controller
                control={control}
                rules={required}
                name="brand_id"
                defaultValue={dataDetail ? dataDetail.brand_id : undefined}
                render={({ field: { onChange, value, ...props } }) => (
                  <ThemeProvider
                    theme={createTheme({
                      components: {
                        MuiAutocomplete: {
                          styleOverrides: {
                            root: {
                              padding: '0',
                              input: {
                                width: '100% !important',
                                height: '40px !important',
                                padding: '0 8px !important',
                              },
                            },
                            listbox: {
                              backgroundColor: 'var(--sidebarColor) !important',
                              width: '100% !important',
                              paddingTop: 0,
                            },
                            option: {
                              color: '#fff !important',
                              padding: '12px !important',
                            },
                          },
                        },
                        MuiTextField: {
                          styleOverrides: {
                            root: { width: '100%' },
                          },
                        },
                      },
                    })}
                  >
                    <Autocomplete
                      {...props}
                      value={value || null}
                      isOptionEqualToValue={(option, value) => +option?.id == +value?.id}
                      options={data?.brand || []}
                      getOptionLabel={(item) => (item ? item.name : '')}
                      onChange={(event, item) => {
                        onChange(item ? item : '');
                      }}
                      className="filter-select-product remove-icon-dropdown"
                      renderInput={(params) => <TextField {...params} placeholder="Type Brand to select" />}
                    />
                  </ThemeProvider>
                )}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.brand_id?.message : ''}
              </Typography>
            </FormControl>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Condition<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item ">
              <Controller
                control={control}
                rules={required}
                name="condition_id"
                defaultValue={dataDetail?.condition_id || undefined}
                render={({ field: { onChange, ...props } }) => (
                  <Multiselect
                    {...props}
                    displayValue="name"
                    options={[
                      {
                        id: null,
                        name: 'Used',
                        value: '295',
                      },
                    ]}
                    className="filter-select-product filter-select-stock .remove-icon-delete"
                    onSelect={(selectedList, selectedItem) => {
                      onChange(selectedItem.value);
                      setShowHiddenText(true);
                    }}
                    selectedValues={dataDetail ? dataDetail?.condition_id : []}
                    placeholder=""
                    avoidHighlightFirstOption
                    style={styleSingleSelect}
                    hidePlaceholder
                    singleSelect
                  />
                )}
              />
              {showHiddenText && <small>Select Used Condition</small>}
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.condition_id?.message : ''}
              </Typography>
            </div>
          </Box>
          {showHiddenText && (
            <Box className="add-box">
              <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
                Used Conditions
              </Typography>
              <div className="add-item ">
                <Multiselect
                  displayValue="label"
                  options={[]}
                  className="filter-select-product filter-select-stock .remove-icon-delete"
                  placeholder=""
                  avoidHighlightFirstOption
                  style={styleSingleSelect}
                  hidePlaceholder
                  singleSelect
                />
              </div>
            </Box>
          )}
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              SKU
            </Typography>
            <div className="add-item">
              <Controller
                control={control}
                name="sku"
                defaultValue={Date.now().toString()}
                render={({ field: { value, ...props } }) => (
                  <input value={value} {...props} type="text" className="add-input" />
                )}
              />
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Image<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <ImagesForm
              name="imagesOrder"
              control={control}
              dataDetail={dataDetail}
              handleRemoveImg={handleRemoveImg}
            />
            <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
              {errors ? errors?.imagesOrder?.message : ''}
            </Typography>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Category<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item" style={{ maxWidth: '640px' }}>
              <Controller
                control={control}
                rules={required}
                name="categories"
                defaultValue={dataDetail ? dataDetail?.categories : []}
                render={({ field: { onChange } }) => (
                  <Multiselect
                    displayValue="name"
                    options={data?.category}
                    selectedValues={dataDetail ? dataDetail?.categories : []}
                    className="filter-select-product filter-select-stock"
                    onSelect={(selectedList) => {
                      onChange(selectedList.map((item: { id: any }) => parseInt(item.id)));
                    }}
                    placeholder="Type Categories name to select"
                    avoidHighlightFirstOption
                    style={styleMultiSelect}
                    hidePlaceholder
                  />
                )}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.categories?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Description<span style={{ color: '#dc3545', fontSize: '15px' }}> *</span>
            </Typography>
            <div className="add-item" style={{ maxWidth: '640px' }}>
              <Controller
                name="description"
                rules={required}
                control={control}
                defaultValue={''}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div style={{ width: '100%' }}>
                      <Editor
                        editorState={value}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onChange}
                        placeholder="Enter text here..."
                        editorStyle={{
                          background: 'transparent',
                          minHeight: '200px',
                        }}
                      />
                    </div>
                  );
                }}
              />
              <Typography style={{ color: 'red', fontSize: '12px', fontWeight: 'normal', margin: '4px 4px 0' }}>
                {errors ? errors?.description?.message : ''}
              </Typography>
            </div>
          </Box>
          <Box className="add-box">
            <Typography sx={{ fontSize: '16px', color: '#fff', textAlign: 'right', width: '16%' }} noWrap>
              Available for sale
            </Typography>
            <div
              className="add-item"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '12px' }}
            >
              <Controller
                name="enabled"
                control={control}
                defaultValue={dataDetail ? dataDetail.enabled : 1}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <Switch
                        classes={{
                          root: classes.root,
                          switchBase: classes.switchBase,
                          thumb: classes.thumb,
                          track: classes.track,
                          checked: classes.checked,
                        }}
                        value={value == 1}
                        checked={value == 1}
                        onChange={(e, checked) => {
                          onChange(checked ? 1 : 0);
                        }}
                      />
                    </>
                  );
                }}
              />
              <HelpOutlinedIcon sx={{ fontSize: '18px', color: '#fff' }} />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;

// <ThemeProvider
//   theme={createTheme({
//     components: {
//       MuiSelect: {
//         styleOverrides: {
//           select: {
//             width: '100%',
//             padding: '0 !important',
//             lineHeight: '40px !important',
//           },
//           nativeInput: {
//             width: '100% !important',
//             height: '40px !important',
//           },
//           icon: {
//             display: 'none !important',
//           },
//         },
//       },
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             padding: '0 !important',
//             backgroundColor: 'var(--sidebarColor)',
//             maxHeight: '500px !important',
//             color: '#fff',
//           },
//         },
//       },
//       MuiList: {
//         styleOverrides: {
//           root: {
//             padding: '0 !important',
//           },
//         },
//       },
//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             padding: '8px 12px !important',
//           },
//         },
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           root: {
//             padding: '0 !important',
//           },
//         },
//       },
//     },
//   })}
// >
//   <Select
//     {...props}
//     value={value}
//     input={<OutlinedInput />}
//     inputProps={{ 'aria-label': 'Without label' }}
//     className="filter-select-product"
//     style={{ padding: 0 }}
//   >
//     {data?.brand?.map((item) => (
//       <MenuItem key={item.id} value={item.id?.toString()}>
//         <span style={{ padding: '0 15px' }}>{item.name}</span>
//       </MenuItem>
//     ))}
//   </Select>
// </ThemeProvider>;
