export interface IUserProfile {
  profile_id: string;
  vendor: string;
  firstName: string | null;
  lastName: string | null;
  created: string;
  last_login: string;
  access_level: string;
  vendor_id: string;
  storeName: string | null;
  product: number;
  order: {
    order_as_buyer: number;
    order_as_buyer_total: string | number;
  };
  wishlist: string;
  delete?: boolean;
}

export interface IUserProfileFilter {
  page: number;
  count: number;
  search: string;
  memberships: string[];
  types: string[];
  status: string;
  country: string;
  state: string;
  address: string;
  phone: string;
  date_type: string;
  date_range: Date[];
  sort: string;
  order_by: string;
}

export interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  access_level: string;
  joined: string;
  first_login: string;
  last_login: string;
  status: string;
  membership_id: string | null;
  pending_membership_id: string | null;
  language: string;
  forceChangePassword: 0;
  referer: string;
  statusComment: string;
  roles: string;
  companyName: string;
  vendor_id: string;
  password: string;
  confirm_password: string;
  taxExempt: number;
  paymentRailsType: string;
  default_card_id: string;
  earning: number;
  expense: string;
  income: string;
  order_as_buyer: number;
  order_as_buyer_total: number;
  paymentRailsId: string | null;
  products_total: number;
}

export interface AccountRoles {
  Administrator: RolesInfo[];
  Customer: RolesInfo[];
}

export interface RolesInfo {
  id: string;
  name: string;
  enabled?: string;
}

export interface UserStatus {
  label: string;
  value: string | null;
}

export interface Country {
  code: string;
  currency_id: string;
  id: string;
  code3: string;
  enabled: string;
  active_currency: string | null;
  is_fraudulent: string;
  country: string;
}

export interface State {
  state_id: string;
  country_code: string;
  region_code: string | null;
  state: string;
  code: string;
}
