import { API_ADMIN_HOST, API_EXPORT_HOST, API_HOST, API_VENDOR_HOST } from '../utils/constants';

enum APIService {
  authentication,
  categories,
  products,
  __LENGTH,
}

enum APIAdminService {
  brands = APIService.__LENGTH,
  vendors,
  commons,
  users,
  products,
  shipping,
  __LENGTH,
}

enum APIVendorService {
  profile = APIAdminService.__LENGTH,
  __LENGTH,
}

enum APIExportService {
  export = APIVendorService.__LENGTH,
}

const getBaseUrl = (service: APIService | APIAdminService | APIVendorService | APIExportService) => {
  if (service === APIService.authentication) {
    return `${API_HOST}/authentication`;
  } else if (service === APIService.categories) {
    return `${API_HOST}/categories`;
  } else if (service === APIService.products) {
    return `${API_HOST}/products`;
  } else if (service === APIAdminService.brands) {
    return `${API_ADMIN_HOST}/brands`;
  } else if (service === APIAdminService.vendors) {
    return `${API_ADMIN_HOST}/vendors`;
  } else if (service === APIAdminService.commons) {
    return `${API_ADMIN_HOST}/commons`;
  } else if (service === APIAdminService.users) {
    return `${API_ADMIN_HOST}/users`;
  } else if (service === APIAdminService.products) {
    return `${API_ADMIN_HOST}/products`;
  } else if (service === APIAdminService.shipping) {
    return `${API_ADMIN_HOST}/shipping`;
  } else if (service === APIVendorService.profile) {
    return `${API_VENDOR_HOST}/profile`;
  } else if (service === APIExportService.export) {
    return `${API_EXPORT_HOST}/export`;
  }
};

export const API_PATHS = {
  logIn: `${getBaseUrl(APIService.authentication)}/login`,
  listCategory: `${getBaseUrl(APIService.categories)}/list`,
  role: `${getBaseUrl(APIAdminService.commons)}/role`,
  country: `${getBaseUrl(APIAdminService.commons)}/country`,
  listVendor: `${getBaseUrl(APIAdminService.vendors)}/list`,
  listBrand: `${getBaseUrl(APIAdminService.brands)}/list`,
  listShipping: `${getBaseUrl(APIAdminService.shipping)}/list`,
  listUser: `${getBaseUrl(APIAdminService.users)}/list`,
  detailUser: `${getBaseUrl(APIVendorService.profile)}/detail`,
  editUser: `${getBaseUrl(APIAdminService.users)}/edit`,
  createUser: `${getBaseUrl(APIAdminService.users)}/create`,
  listProduct: `${getBaseUrl(APIService.products)}/list`,
  createProduct: `${getBaseUrl(APIAdminService.products)}/create`,
  editProduct: `${getBaseUrl(APIAdminService.products)}/edit`,
  detailProduct: `${getBaseUrl(APIAdminService.products)}/detail`,
  exportProduct: `${getBaseUrl(APIExportService.export)}/products`,
};
