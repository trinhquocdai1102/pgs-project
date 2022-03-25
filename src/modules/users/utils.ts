export const accessLevel = [
  {
    value: '100',
    name: 'Admin ',
  },
  {
    value: '10',
    name: 'Vendor',
  },
];

export const membership = [
  { name: 'Ignore Membership', value: '' },
  { name: 'General', value: '4' },
];

export const memberships = [
  {
    name: 'membership',
    item: 'general',
    value: 'M_4',
  },
  {
    name: 'pending membership',
    item: 'general ',
    value: 'P_4',
  },
];

export const date_type = [
  { label: 'Register', value: 'R' },
  { label: 'Last logged in', value: 'L' },
];

export const tableHeaderLabel = [
  {
    name: 'Login/Email',
    canSort: true,
  },
  {
    name: 'Name',
    canSort: true,
  },
  {
    name: 'Access level',
    canSort: true,
  },
  {
    name: 'Products',
    canSort: false,
  },
  {
    name: 'Orders',
    canSort: false,
  },
  {
    name: 'Wishlist',
    canSort: false,
  },
  {
    name: 'Created',
    canSort: true,
  },
  {
    name: 'Last Login',
    canSort: true,
  },
];

export const filterStatus = [
  {
    value: 'null',
    name: 'Any status',
  },
  {
    value: 'E',
    name: 'Enable',
  },
  {
    value: 'D',
    name: 'Disable',
  },
  {
    value: 'U',
    name: 'Unapproved vendor',
  },
];

export const filterStatusDetail = [
  {
    value: 'E',
    name: 'Enable',
  },
  {
    value: 'D',
    name: 'Disable',
  },
  {
    value: 'U',
    name: 'Unapproved vendor',
  },
];
