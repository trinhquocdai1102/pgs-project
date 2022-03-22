import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import 'react-datepicker/dist/react-datepicker.css';
import Multiselect from 'multiselect-react-dropdown';
import { AppState } from '../../../../redux/reducer';
import { useForm, Controller } from 'react-hook-form';
import { fetchThunk } from '../../../common/redux/thunk';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { AccountRoles, Country, IUserProfileFilter, State } from '../../../../models/userProfile';
import { styleMultiSelect, styleSingleSelect } from '../../../common/components/CustomCSSMultiSelect';
import { getErrorMessageResponse } from '../../../../utils';
import { date_type, filterStatus, memberships } from '../../utils';

interface Props {
  handleFilter(data: IUserProfileFilter): void;
}

const FilterUser = (props: Props) => {
  const { handleFilter } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const [role, setRole] = useState<AccountRoles>();
  const [country, setCountry] = useState<Country[]>();
  const [state, setState] = useState<State[]>([]);
  const [selectCountry, setSelectCountry] = useState<string>();
  const [borderInput, setBorderInput] = useState(false);

  const fetchFilter = useCallback(async () => {
    const respRole = await dispatch(fetchThunk(API_PATHS.roleList, 'get'));
    const respCountry = await dispatch(fetchThunk(API_PATHS.countryList, 'get'));
    if (respRole.success && respCountry.success) {
      const administrator = respRole.data['administrator'].map((item: any) => {
        return { ...item, label: 'Administrator' };
      });
      const customer = respRole.data['customer'].map((item: any) => {
        return { ...item, label: 'Customer' };
      });
      setCountry(respCountry.data);
      setRole(administrator.concat(customer));

      return;
    }
    return;
  }, [dispatch]);

  const fetchState = useCallback(async () => {
    if (selectCountry && selectCountry !== '') {
      const resp = await dispatch(fetchThunk(API_PATHS.stateList, 'post', { code: selectCountry }));
      if (resp.success) {
        setState(resp.data);
        return;
      }
      getErrorMessageResponse(resp);
      return;
    }
    return;
  }, [dispatch, selectCountry]);

  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (data: any) => {
    const newData = {
      ...data,
      country: data?.country?.code || '',
      state: data?.state?.state || '',
      status: data?.status?.value || '',
      types: data?.types?.map((item: { id: any }) => item.id || []),
    };
    handleFilter(newData);

    return;
  };

  useEffect(() => {
    fetchFilter();
  }, [fetchFilter]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p style={{ margin: '0 0 16px', color: '#fff', fontSize: '32px' }}>Search for users</p>
      </div>
      <div
        style={{ backgroundColor: '#323259', paddingBottom: '4px', marginBottom: '40px', borderRadius: '4px' }}
        className="filter-form"
      >
        <div style={{ listStyle: 'none', display: 'flex', gap: '2%', marginBottom: '20px', position: 'relative' }}>
          <Controller
            render={({ field }) => (
              <FormControl style={{ width: '25%' }} {...field}>
                <input type="text" className="filter-input" placeholder="Search keyword" />
              </FormControl>
            )}
            name="search"
            control={control}
            defaultValue=""
          />

          <Controller
            render={({ field }) => (
              <FormControl sx={{ width: '25%', color: '#fff' }} {...field}>
                <Multiselect
                  options={memberships}
                  displayValue="item"
                  groupBy="name"
                  placeholder="All membership"
                  className="filter-select-product remove-icon-delete"
                  onSelect={(item) => console.log(item)}
                  avoidHighlightFirstOption
                  style={styleMultiSelect}
                  hidePlaceholder
                  showCheckbox
                />
              </FormControl>
            )}
            name="memberships"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field: { onChange } }) => (
              <FormControl style={{ width: '25%' }}>
                <Multiselect
                  options={role}
                  displayValue="name"
                  groupBy="label"
                  placeholder="All user types"
                  className="filter-select-product remove-icon-delete"
                  onSelect={(selectedList) => {
                    onChange(selectedList);
                  }}
                  style={styleMultiSelect}
                  avoidHighlightFirstOption
                  hidePlaceholder
                  showCheckbox
                />
              </FormControl>
            )}
            name="types"
            control={control}
            defaultValue={[]}
          />
          <Controller
            render={({ field: { onChange } }) => (
              <FormControl style={{ width: '15%' }}>
                <Multiselect
                  displayValue="name"
                  options={filterStatus}
                  className="filter-select-product filter-select-stock remove-icon-delete"
                  onSelect={(selectedList, selectedItem) => {
                    onChange(selectedItem);
                  }}
                  placeholder="Any status"
                  style={styleSingleSelect}
                  avoidHighlightFirstOption
                  singleSelect
                />
              </FormControl>
            )}
            name="status"
            control={control}
            defaultValue=""
          />
          <FormControl>
            <Button type="submit" className="btn-table-common">
              Search
            </Button>
          </FormControl>
          <div
            className={!isOpen ? 'btn-collapse-filter' : 'btn-collapse-filter  btn-open-filter-user filter-open'}
            onClick={handleCollapse}
          >
            <KeyboardDoubleArrowDownIcon
              className={!isOpen ? 'open-hidden-search-box' : 'rotate180'}
              style={{ color: '#fff', fontSize: '20px !important' }}
            />
            <div className={!isOpen ? 'dot-open-search-box' : 'displayNone'}>.</div>
          </div>
        </div>
        {isOpen && (
          <div className="hidden-search-box">
            <List className="hidden-search-item hidden-search-filter-user">
              <ListItem className="hidden-search-filter-item">
                <Typography sx={{ fontSize: '13px', color: '#fff', width: '16%' }} noWrap>
                  Country
                </Typography>
                <Controller
                  render={({ field: { onChange, ...props } }) => (
                    <FormControl style={{ width: '72%' }} {...props}>
                      <Multiselect
                        options={country}
                        displayValue="country"
                        placeholder="Select country"
                        className="filter-select-product remove-icon-delete"
                        onSelect={(selectedList, selectedItem) => {
                          onChange(selectedItem);
                          if (selectedItem !== '') {
                            setSelectCountry(selectedItem.code);
                          } else {
                            setState([]);
                          }
                        }}
                        style={styleSingleSelect}
                        avoidHighlightFirstOption
                        singleSelect
                      />
                    </FormControl>
                  )}
                  name="country"
                  control={control}
                  defaultValue=""
                />
              </ListItem>
              <ListItem className=" hidden-search-filter-item">
                <Typography sx={{ fontSize: '13px', color: '#fff', width: '16%' }} noWrap>
                  State
                </Typography>
                <Controller
                  render={({ field: { onChange, ...props } }) => (
                    <FormControl style={{ width: '72%' }} {...props}>
                      <Multiselect
                        options={state}
                        displayValue="state"
                        placeholder=""
                        className="filter-select-product remove-icon-delete"
                        onSelect={(selectedList, selectedItem) => {
                          onChange(selectedItem);
                          setSelectCountry(selectedItem.state);
                        }}
                        style={styleSingleSelect}
                        avoidHighlightFirstOption
                        singleSelect
                      />
                    </FormControl>
                  )}
                  name="state"
                  control={control}
                  defaultValue=""
                />
              </ListItem>
              <ListItem className=" hidden-search-filter-item">
                <Typography sx={{ fontSize: '13px', color: '#fff', width: '16%' }} noWrap>
                  Address
                </Typography>
                <Controller
                  render={({ field: { ...props } }) => (
                    <FormControl style={{ width: '72%' }} {...props}>
                      <input type="text" placeholder="" className="filter-input" />
                    </FormControl>
                  )}
                  name="state"
                  control={control}
                  defaultValue=""
                />
              </ListItem>
              <ListItem className=" hidden-search-filter-item">
                <Typography sx={{ fontSize: '13px', color: '#fff', width: '16%' }} noWrap>
                  Phone
                </Typography>
                <Controller
                  render={({ field: { ...props } }) => (
                    <FormControl style={{ width: '72%' }} {...props}>
                      <input type="text" placeholder="" className="filter-input" />
                    </FormControl>
                  )}
                  name="state"
                  control={control}
                  defaultValue=""
                />
              </ListItem>
            </List>
            <Box
              style={{ display: 'flex', alignItems: 'start', gap: '6%', width: '60%' }}
              className="hidden-search-filter-user"
            >
              <span style={{ fontSize: '15px', padding: '8px 0 0' }}>User activity</span>
              <List style={{ width: '80%' }}>
                <ListItem style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: 0 }}>
                  <Controller
                    control={control}
                    name="date_type"
                    defaultValue="R"
                    render={({ field: { value, ...props } }) => (
                      <RadioGroup row value={value} {...props} sx={{ color: '#fff' }}>
                        {date_type.map((item) => {
                          return (
                            <FormControlLabel
                              key={item.value}
                              value={item.value}
                              control={<Radio size="small" sx={{ color: '#fff' }} />}
                              label={item.label}
                            />
                          );
                        })}
                      </RadioGroup>
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="date_range"
                    defaultValue={[]}
                    render={({ field: { value, ...props } }) => (
                      <DatePicker
                        selected={value[0]}
                        startDate={value[0]}
                        endDate={value[1]}
                        {...props}
                        selectsRange
                        placeholderText="Enter date range"
                        customInput={
                          <input
                            className={borderInput ? 'filter-input' : 'filter-input border-highlight'}
                            style={{ width: '60%' }}
                            onFocus={() => setBorderInput(true)}
                            onBlur={() => setBorderInput(false)}
                          />
                        }
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Box>
          </div>
        )}
      </div>
    </form>
  );
};

export default FilterUser;
