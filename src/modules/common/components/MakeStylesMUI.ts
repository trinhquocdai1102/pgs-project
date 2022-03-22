import { makeStyles } from '@material-ui/core/styles';

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
