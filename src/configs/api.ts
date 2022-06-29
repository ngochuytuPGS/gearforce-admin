import { APIAdminHost, APIHost, APIVendorHost } from '../utils/constants';

enum APIService {
  authentication,
  categories,
  products,
}

enum APIAdminService {
  brands,
  vendors,
  commons,
  users,
  products,
}

enum APIVendorService {
  profile,
}

const getBaseUrl = (service: APIService | APIAdminService | APIVendorService) => {
  if (service === APIService.authentication) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.categories) {
    return `${APIHost}/categories`;
  } else if (service === APIService.products) {
    return `${APIHost}/products`;
  } else if (service === APIAdminService.brands) {
    return `${APIAdminHost}/brands`;
  } else if (service === APIAdminService.vendors) {
    return `${APIAdminHost}/vendors`;
  } else if (service === APIAdminService.commons) {
    return `${APIAdminHost}/commons`;
  } else if (service === APIAdminService.users) {
    return `${APIAdminHost}/users`;
  } else if (service === APIAdminService.products) {
    return `${APIAdminHost}/products`;
  } else if (service === APIVendorService.profile) {
    return `${APIVendorHost}/profile`;
  }
};

export const API_PATHS = {
  logIn: `${getBaseUrl(APIService.authentication)}/login`,
};
