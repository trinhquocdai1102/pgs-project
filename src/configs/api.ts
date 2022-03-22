import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  public,
  private,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  } else if ((service = APIService.private)) {
    return `${APIHost}/apiVendor`;
  }
  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  vendorList: `${getBaseUrl(APIService.auth)}/vendors/list`,
  categoryList: `${getBaseUrl(APIService.public)}/categories/list`,
  brandList: `${getBaseUrl(APIService.auth)}/brands/list`,
  conditionList: `${getBaseUrl(APIService.auth)}/conditions/list`,
  shipping: `${getBaseUrl(APIService.auth)}/shipping/list`,
  roleList: `${getBaseUrl(APIService.auth)}/commons/role`,
  countryList: `${getBaseUrl(APIService.auth)}/commons/country`,
  stateList: `${getBaseUrl(APIService.auth)}/commons/state`,
  productList: `${getBaseUrl(APIService.public)}/products/list`,
  createProduct: `${getBaseUrl(APIService.auth)}/products/create`,
  updateProduct: `${getBaseUrl(APIService.auth)}/products/edit`,
  productDetail: `${getBaseUrl(APIService.auth)}/products/detail`,
  uploadProductImage: `${getBaseUrl(APIService.public)}/products/upload-image`,
  userList: `${getBaseUrl(APIService.auth)}/users/list`,
  createUser: `${getBaseUrl(APIService.auth)}/users/create`,
  updateUser: `${getBaseUrl(APIService.auth)}/users/edit`,
  userDetail: `${getBaseUrl(APIService.private)}/profile/detail`,
};
