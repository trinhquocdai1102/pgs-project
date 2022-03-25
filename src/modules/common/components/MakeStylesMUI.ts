import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@mui/material';

export const useStylesSwitch = makeStyles({
  root: {
    width: '52px',
    height: '22px',
    padding: '0px',
    borderRadius: '4px',
  },
  switchBase: {
    color: '#818181',
    padding: '1px',
    borderRadius: '4px',
    '&$checked': {
      '& + $track': {
        backgroundColor: '#1ab394',
      },
    },
  },
  thumb: {
    color: 'white',
    width: '24px',
    height: '20px',
    borderRadius: '4px',
  },
  track: {
    backgroundColor: '#818181',
    borderRadius: '0',
    opacity: '1 !important',
    '&:after, &:before': {
      color: 'white',
      fontSize: '12px',
      position: 'absolute',
      top: '2px',
    },
    '&:after': {
      content: "'Yes'",
      left: '4px',
    },
    '&:before': {
      content: "'No'",
      right: '6px',
    },
  },
  checked: {
    color: '#1ab394 !important',
    transform: 'translateX(26px) !important',
  },
});

export const useStylesSelectFilter = makeStyles({
  select: { padding: 0 },
});

export const useStylesListSubHeader = makeStyles({
  root: {
    backgroundColor: 'transparent',
    fontSize: '15px',
    textTransform: 'capitalize',
    color: '#B4B4DB',
    fontWeight: 'bold',
  },
});

export const useStylesOptionsFilter = makeStyles({
  root: { color: '#fff', textTransform: 'capitalize', marginLeft: '16px' },
});

export const useStylesOptionsCheckbox = makeStyles({
  root: { color: '#fff' },
  colorPrimary: { color: '#fff' },
});

export const useStylesFilterLabel = makeStyles({
  root: { color: '#fff', top: '-5px', fontWeight: 600, fontSize: '15px' },
});

export const autoCompleteTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: '0',
          input: {
            width: '100% !important',
            height: '40px !important',
            padding: '0 15px !important',
          },
        },
        clearIndicator: {
          display: 'none',
        },
        popupIndicator: {
          color: '#fff',
        },
        listbox: {
          backgroundColor: 'var(--sidebarColor) !important',
          width: '100% !important',
          paddingTop: 0,
        },
        option: {
          color: '#fff !important',
          padding: '12px !important',
          wordBreak: 'break-all',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { width: '100%' },
      },
    },
  },
});

export const styleSelectMUI = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          border: '1px solid var(--bgColor)',
          backgroundColor: 'var(--addInputPageColor)',
          lineHeight: '40px',
          padding: 0,
          color: '#fff !important',
        },
        outlined: {
          padding: '0 10px',
        },
        icon: {
          color: '#fff !important',
        },
        nativeInput: {
          minHeight: '40px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { margin: '8px 0 0 -2px', maxHeight: '400px !important' },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0 !important',
          minHeight: '40px',
          backgroundColor: 'var(--addInputPageColor)',
          color: '#fff',
          border: '1px solid var(--bgColor)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '10px 14px !important',
          '&.Mui-selected': {
            backgroundColor: 'var(--buttonColor)',
          },
        },
      },
    },
  },
});
