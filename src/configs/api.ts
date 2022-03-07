import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  }
  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  productList: `${getBaseUrl(APIService.public)}/products/list`,
  categoryList: `${getBaseUrl(APIService.public)}/categories/list`,
  vendorList: `${getBaseUrl(APIService.public)}/products/list`,
};
